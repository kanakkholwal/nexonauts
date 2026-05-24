---
title: Channels
description: Typed pipes for sending values between goroutines.
tags: [go, concurrency]
order: 2
---

A channel is a typed conduit for sending a value from one goroutine to another. The send blocks until a receiver is ready; the receive blocks until a sender is ready. That synchronous handshake — not the data itself — is the load-bearing idea. Channels turn "did the other goroutine get this value?" from a question into a fact.

Channels come in two flavors. Unbuffered channels rendezvous: sender and receiver meet at the channel and then proceed. Buffered channels accept up to N values without blocking, which is useful when you want the producer to keep moving even if the consumer briefly stalls.

:::step{title="Make and send"}

`make(chan T)` creates an unbuffered channel of `T`. The send operator `ch <- v` puts a value on the channel; the receive operator `<-ch` takes one off.

```go
package main

import "fmt"

func main() {
	ch := make(chan string)

	go func() {
		ch <- "ping"
	}()

	msg := <-ch
	fmt.Println(msg)
}
```

:::

:::step{title="Unbuffered means synchronous"}

The goroutine's send blocks until `main` runs the receive. If `main` never receives, the goroutine sits parked forever. This rendezvous is what makes "the value was delivered" something you can assume by construction.

If you want fire-and-forget semantics, you want a buffered channel — see the next step.

:::

:::step{title="Buffered channels"}

Pass a capacity to `make`. Sends only block when the buffer is full; receives only block when it's empty. Useful for smoothing bursty producers.

```go
ch := make(chan int, 3)

ch <- 1
ch <- 2
ch <- 3
// ch <- 4 would block here — buffer is full.

fmt.Println(<-ch, <-ch, <-ch) // 1 2 3
```

:::

:::step{title="Close and range"}

A sender can `close(ch)` to signal "no more values." Receivers can use `range` to read until the channel is closed and drained. Closing is a contract: only the sender closes, and only once. Receiving from a closed channel returns the zero value immediately.

```go
package main

import "fmt"

func produce(ch chan<- int) {
	for i := 1; i <= 3; i++ {
		ch <- i
	}
	close(ch)
}

func main() {
	ch := make(chan int)
	go produce(ch)

	for v := range ch {
		fmt.Println("got", v)
	}
}
```

:::

:::step{title="Directional types"}

`chan<- T` is a send-only channel; `<-chan T` is receive-only. Use these in function signatures to encode intent — the compiler then catches the mistake of receiving from something you only meant to send to.

```go
func produce(out chan<- int) { /* can only send */ }
func consume(in <-chan int)  { /* can only receive */ }
```

:::

:::step{title="Run it" kind="output"}

```text
$ go run channels.go
got 1
got 2
got 3
```

:::
