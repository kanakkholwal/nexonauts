---
title: Goroutines
description: Lightweight concurrent functions managed by the Go runtime.
tags: [go, concurrency]
order: 1
---

A goroutine is a function scheduled to run by the Go runtime rather than the operating system directly. You start one by prefixing any function call with the `go` keyword. The runtime multiplexes many goroutines onto a small pool of OS threads, so spawning ten thousand of them is normal — they cost a few kilobytes of stack each, not a megabyte.

What goroutines do *not* give you for free: synchronization, ordering, or any guarantee that they finish before your program exits. That's deliberate. Go's concurrency model gives you the spawn primitive cheap and pushes coordination into channels and sync primitives, which you compose explicitly.

:::step{title="A regular call"}

This runs to completion before `main` continues. Nothing concurrent yet.

```go
package main

import "fmt"

func greet(who string) {
	fmt.Println("hello,", who)
}

func main() {
	greet("alice")
	greet("bob")
}
```

:::

:::step{title="Spawn it as a goroutine"}

Prefix the call with `go`. The function now runs in a new goroutine, and `main` continues immediately. Both calls are scheduled, but there's no guarantee they finish — `main` might return first and tear down the process.

```go
func main() {
	go greet("alice")
	go greet("bob")
	// main returns here. The runtime may or may not have
	// scheduled the goroutines yet.
}
```

:::

:::step{title="Wait with a WaitGroup"}

`sync.WaitGroup` is the smallest primitive for "wait for N goroutines to finish." Call `Add` before spawning, `Done` inside each goroutine, `Wait` to block until the counter hits zero.

```go
package main

import (
	"fmt"
	"sync"
)

func greet(who string, wg *sync.WaitGroup) {
	defer wg.Done()
	fmt.Println("hello,", who)
}

func main() {
	var wg sync.WaitGroup
	for _, name := range []string{"alice", "bob", "carol"} {
		wg.Add(1)
		go greet(name, &wg)
	}
	wg.Wait()
}
```

:::

:::step{title="Why not just use threads?"}

Goroutines share an address space, so passing data between them is just passing a value. The runtime's scheduler handles context switching cooperatively at safe points (channel ops, syscalls, function calls with stack growth). The result is that idiomatic Go code spawns goroutines liberally — one per incoming request, one per pipeline stage, one per timer — without the per-thread overhead you'd worry about in C or Java.

The catch is that goroutines see the same memory. Two goroutines writing to the same map without synchronization will corrupt it. The fix is almost never a lock; it's a channel.

:::

:::step{title="Run it" kind="output"}

The order of output is not guaranteed — it depends on how the runtime schedules the goroutines on this run.

```text
$ go run goroutines.go
hello, alice
hello, carol
hello, bob
```

:::
