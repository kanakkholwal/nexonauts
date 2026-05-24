---
title: Select
description: Wait on multiple channel operations at once.
tags: [go, concurrency]
order: 3
---

`select` is the multiplexer. It looks like a `switch`, but each case is a channel operation, and the runtime picks one of the cases whose channel is ready. If several are ready at the same time, it picks pseudo-randomly. If none are ready, `select` blocks until one becomes ready — unless you provide a `default` case, in which case `select` returns immediately.

This is the primitive that makes Go's concurrency feel composable. Combine it with `time.After` and you get timeouts. Combine it with a "done" channel and you get cancellation. Combine it with `default` and you get non-blocking sends or receives.

:::step{title="The two-channel case"}

Two goroutines produce values on different schedules. `select` waits for whichever fires first.

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	ch1 := make(chan string)
	ch2 := make(chan string)

	go func() {
		time.Sleep(100 * time.Millisecond)
		ch1 <- "from ch1"
	}()
	go func() {
		time.Sleep(200 * time.Millisecond)
		ch2 <- "from ch2"
	}()

	for i := 0; i < 2; i++ {
		select {
		case msg := <-ch1:
			fmt.Println(msg)
		case msg := <-ch2:
			fmt.Println(msg)
		}
	}
}
```

:::

:::step{title="Timeout"}

`time.After(d)` returns a channel that delivers a value after `d`. Put it in a `select` and you have a hard timeout for any other channel op in the same select.

```go
select {
case res := <-doWork():
	fmt.Println("done:", res)
case <-time.After(1 * time.Second):
	fmt.Println("timed out")
}
```

If `doWork()` returns within a second, you get the result. If not, the second case fires and the goroutine moves on. The work goroutine itself may still be running — `select` only stops *waiting*; cancellation is separate (typically `context.Context`).

:::

:::step{title="Non-blocking with default"}

A `default` case turns `select` into a poll. Use it sparingly — it's almost always a sign you're trying to fake what a buffered channel or a worker goroutine should be doing.

```go
select {
case v := <-ch:
	fmt.Println("got", v)
default:
	fmt.Println("nothing ready")
}
```

:::

:::step{title="Done channels and cancellation"}

A common pattern: workers receive on `done` to know when to stop. `select` lets them watch `done` *and* do their actual work in the same loop.

```go
func worker(done <-chan struct{}, jobs <-chan int) {
	for {
		select {
		case j := <-jobs:
			process(j)
		case <-done:
			return
		}
	}
}
```

`chan struct{}` is the zero-cost signal channel — `struct{}` carries no data, so the channel is effectively just "is anyone closing this?"

:::

:::step{title="Run it" kind="output"}

```text
$ go run select.go
from ch1
from ch2
```

:::
