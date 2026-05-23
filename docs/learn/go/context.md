---
title: Context
description: Cancellation, deadlines, and request-scoped values.
tags: [go, concurrency, context]
order: 6
---

`context.Context` is how Go propagates cancellation, deadlines, and a small amount of request-scoped data across API boundaries. Almost every standard-library function that does I/O takes a `ctx context.Context` as its first parameter. Your own functions should too.

A Context is immutable. You derive new ones by wrapping a parent — `WithCancel`, `WithTimeout`, `WithDeadline`, `WithValue`. When the parent is cancelled, every descendant is cancelled. That cascade is the whole feature.

:::step{title="The shape"}

`ctx` is always the first parameter. Pass it down. Don't store it in structs. Check `ctx.Done()` at every meaningful pause.

```go
package main

import (
	"context"
	"fmt"
	"time"
)

func work(ctx context.Context, id int) {
	select {
	case <-time.After(2 * time.Second):
		fmt.Println("worker", id, "finished")
	case <-ctx.Done():
		fmt.Println("worker", id, "cancelled:", ctx.Err())
	}
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()

	go work(ctx, 1)
	go work(ctx, 2)

	<-ctx.Done()
	time.Sleep(100 * time.Millisecond)
}
```

:::

:::step{title="WithTimeout vs WithDeadline"}

They're the same primitive — `WithTimeout(parent, d)` is just `WithDeadline(parent, time.Now().Add(d))`. Pick whichever matches how you reason about the limit.

```go
// "Cancel after 5 seconds"
ctx, cancel := context.WithTimeout(parent, 5*time.Second)

// "Cancel at end-of-request"
ctx, cancel := context.WithDeadline(parent, requestEnd)
```

:::

:::step{title="Always call cancel()"}

Every `WithCancel` / `WithTimeout` / `WithDeadline` returns a `cancel` function. `defer cancel()` immediately — even when the context will expire on its own.

Cancelling releases the internal goroutine and timer that the context holds. Without it, you leak a small amount of memory per call until garbage collection eventually reclaims it. `go vet`'s `lostcancel` check catches the obvious cases.

```go
ctx, cancel := context.WithTimeout(parent, time.Second)
defer cancel()
```

:::

:::step{title="ctx.Err() tells you why"}

When `<-ctx.Done()` fires, `ctx.Err()` returns one of two sentinels:

- `context.Canceled` — someone called `cancel()` explicitly
- `context.DeadlineExceeded` — the timeout or deadline elapsed

Use this to log appropriately or to decide whether to retry. A `DeadlineExceeded` from a network call is often retryable; a `Canceled` from a user-initiated abort almost never is.

```go
if err := doSomething(ctx); err != nil {
	if errors.Is(err, context.Canceled) {
		// caller bailed; stop quietly
		return nil
	}
	return err
}
```

:::

:::step{title="WithValue, with care"}

`context.WithValue(parent, key, val)` attaches a value to the context. Use it sparingly — only for request-scoped data that genuinely crosses API boundaries (request ID, auth token, trace span). Not for optional function parameters.

```go
type contextKey string
const traceIDKey contextKey = "traceID"

ctx = context.WithValue(ctx, traceIDKey, "abc-123")

// later, perhaps in another package:
id, _ := ctx.Value(traceIDKey).(string)
```

The key must be a typed value (a defined type, not a bare string) so different packages don't collide on the same key string.

:::

:::step{title="The cancellation discipline"}

A function that takes a `ctx` makes one promise: it will return reasonably promptly when `ctx` is cancelled. That means every blocking operation inside it must either be `ctx`-aware itself (`http.NewRequestWithContext`, `sql.QueryContext`, `select { case ... case <-ctx.Done() }`) or sit inside a loop that periodically checks `ctx.Done()`.

A goroutine that ignores its context isn't cancelable — and the program leaks one of them per orphaned call.

:::

:::step{title="Run it" kind="output"}

```text
$ go run context.go
worker 1 cancelled: context deadline exceeded
worker 2 cancelled: context deadline exceeded
```

:::
