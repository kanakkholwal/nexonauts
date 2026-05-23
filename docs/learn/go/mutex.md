---
title: Mutex
description: Protect shared state when channels don't fit.
tags: [go, concurrency, sync]
order: 5
---

Go has a famous saying — "Don't communicate by sharing memory; share memory by communicating." Channels are the preferred coordination primitive. But sometimes you genuinely have shared state: a cache, a counter, a connection pool. Wrapping every operation in a channel would be theater. That's when you reach for `sync.Mutex`.

`Mutex.Lock()` blocks until you have the lock; `Unlock()` releases it. `sync.RWMutex` is the read/write variant — many readers can hold it concurrently, but a writer is exclusive. `RWMutex` is faster than `Mutex` only when reads vastly outnumber writes; otherwise the extra bookkeeping costs more than it saves.

:::step{title="Protect a counter"}

The canonical example. A thousand goroutines incrementing one counter — wrong without a lock, correct with one.

```go
package main

import (
	"fmt"
	"sync"
)

type counter struct {
	mu sync.Mutex
	n  int
}

func (c *counter) Inc() {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.n++
}

func (c *counter) Value() int {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.n
}

func main() {
	var wg sync.WaitGroup
	c := &counter{}

	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			c.Inc()
		}()
	}
	wg.Wait()
	fmt.Println("final:", c.Value())
}
```

:::

:::step{title="Defer Unlock"}

`defer c.mu.Unlock()` on the line right after `Lock` is idiomatic for two reasons: the locked region is obvious by inspection, and the unlock stays correct when the function gains an early return or a panic.

The cost is a function-scope critical section. If you need to release the lock earlier — say, before a slow downstream call — lift the locked block into its own helper or call `Unlock()` explicitly.

:::

:::step{title="RWMutex when reads dominate"}

```go
type cache struct {
	mu   sync.RWMutex
	data map[string]string
}

func (c *cache) Get(key string) (string, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()
	v, ok := c.data[key]
	return v, ok
}

func (c *cache) Set(key, value string) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.data[key] = value
}
```

`RLock` permits any number of concurrent readers; `Lock` is exclusive against everything. Benchmark before assuming `RWMutex` is faster — if `Set` runs anywhere close to as often as `Get`, plain `Mutex` wins.

:::

:::step{title="Lock the data, not the world"}

A common mistake is one big mutex protecting many unrelated fields. The result is contention everywhere — goroutines block on each other for no reason. Group mutexes with the data they protect, one per logical unit of state.

```go
// Worse: one lock guards everything
type service struct {
	mu      sync.Mutex
	users   map[int]User
	sessions map[string]Session
}

// Better: independent state, independent locks
type service struct {
	users    userStore    // has its own mu
	sessions sessionStore // has its own mu
}
```

:::

:::step{title="The race detector"}

If you forget to lock something, the Go race detector will find it. Always run tests with `-race` during development.

```bash
go test -race ./...
go run -race main.go
```

It instruments the binary to flag concurrent unsynchronized access at runtime. There's a real performance cost so don't ship it to production — but it catches bugs that are nearly impossible to find any other way.

:::

:::step{title="Run it" kind="output"}

```text
$ go run mutex.go
final: 1000
```

Without the mutex, the same program prints a number somewhere between 1 and 1000, non-deterministically, on every run. Run it under `go run -race` and the unsynchronized version aborts with a data race report instead.

:::
