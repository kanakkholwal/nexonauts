---
title: WaitGroups
description: Wait for a known number of goroutines to finish.
tags: [go, concurrency, sync]
order: 4
---

`sync.WaitGroup` answers the question "is everyone done?" when you have a fixed set of goroutines and just need to know when all of them have finished. It's a counter with three operations: `Add(n)` bumps it, `Done()` decrements it, `Wait()` blocks until it hits zero.

Reach for a WaitGroup when you spawn N goroutines and don't need their return values — you only need synchronization. If you need results, you want channels. If you want fail-fast on the first error, you want `golang.org/x/sync/errgroup`.

:::step{title="The shape"}

`Add` before you spawn. `Done` inside the goroutine, ideally via `defer`. `Wait` in the orchestrating goroutine.

```go
package main

import (
	"fmt"
	"sync"
)

func work(id int, wg *sync.WaitGroup) {
	defer wg.Done()
	fmt.Println("worker", id, "starting")
	fmt.Println("worker", id, "done")
}

func main() {
	var wg sync.WaitGroup

	for i := 1; i <= 3; i++ {
		wg.Add(1)
		go work(i, &wg)
	}

	wg.Wait()
	fmt.Println("all done")
}
```

:::

:::step{title="Add BEFORE spawn, not inside"}

The classic bug: calling `wg.Add(1)` from inside the goroutine. If the scheduler hasn't gotten to the goroutine before `wg.Wait()` runs, the counter never sees the increment and `Wait` returns prematurely.

```go
// Wrong: race between Add and Wait
go func() {
	wg.Add(1)
	defer wg.Done()
	// ...
}()

// Right: Add is on the calling goroutine, before the spawn
wg.Add(1)
go func() {
	defer wg.Done()
	// ...
}()
```

:::

:::step{title="Pass by pointer (or close over)"}

`sync.WaitGroup` contains state that must not be copied. Pass it by pointer, or close over it in a function literal. `go vet` flags accidental copies.

```go
// Wrong — copies the WaitGroup, both Add and Done act on the copy
func work(wg sync.WaitGroup) { /* ... */ }

// Right
func work(wg *sync.WaitGroup) { /* ... */ }
```

A closure works too and is often cleaner for small loops:

```go
for i := 1; i <= 3; i++ {
	wg.Add(1)
	go func(id int) {
		defer wg.Done()
		// ...
	}(i)
}
```

:::

:::step{title="When NOT to use it"}

A WaitGroup gives you "done" — nothing else. No way to collect return values, no way to bail out early on the first error.

If you want results, send them on a channel and close it from a goroutine that does the `wg.Wait()` for you. If you want cancellation-aware semantics, use `errgroup.Group` — same shape, but cancellable through a derived `context.Context` and fail-fast on the first non-nil error.

:::

:::step{title="Run it" kind="output"}

The internal order is non-deterministic, but `all done` is always last because `wg.Wait()` only returns after every `Done()` has fired.

```text
$ go run waitgroups.go
worker 3 starting
worker 3 done
worker 1 starting
worker 1 done
worker 2 starting
worker 2 done
all done
```

:::
