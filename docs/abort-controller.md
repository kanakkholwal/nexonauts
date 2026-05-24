---
title: AbortController, by example
description: Cancel fetches, timers, and long-running work with one signal — the way the platform actually wants you to.
tags: [javascript, browser, async]
order: 20
---

# AbortController, by example

`AbortController` is the browser's general-purpose cancellation primitive. It started in 2017 as a way to cancel `fetch`, but every long-lived web API now accepts an `AbortSignal` — event listeners, timers, streams, observers. Once you internalise that, a lot of "I need to clean up this thing" code collapses into one signal.

Below are the patterns worth knowing, ordered by how often they come up.

:::step{title="Cancel a fetch when the user navigates away"}

The basic shape: one controller, one signal, one fetch. Calling `controller.abort()` rejects the fetch with an `AbortError`.

```typescript
async function loadUser(id: string, signal: AbortSignal): Promise<User> {
	const res = await fetch(`/api/users/${id}`, { signal });
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json();
}

const controller = new AbortController();

// In a Svelte effect, React useEffect, or any teardown hook:
loadUser("u_42", controller.signal).catch((err) => {
	if (err.name === "AbortError") return; // expected on teardown
	throw err;
});

// When the component unmounts / route changes:
controller.abort();
```

:::

:::step{title="Cancel anything that takes a signal — not just fetch"}

Modern `addEventListener`, `setTimeout` (via AbortSignal.timeout), and most streaming APIs accept a `signal`. Pass the same signal to every one of them, and a single `abort()` tears them all down.

```typescript
function trackPointer(signal: AbortSignal) {
	window.addEventListener("pointermove", onMove, { signal });
	window.addEventListener("pointerup", onUp, { signal });
	document.addEventListener("visibilitychange", onHide, { signal });
}

const controller = new AbortController();
trackPointer(controller.signal);

// All three listeners detach in one call — no removeEventListener bookkeeping.
controller.abort();
```

:::

:::step{title="Set a deadline with AbortSignal.timeout"}

For "give up after N ms," reach for the static helper. It returns a signal that aborts itself on a timer — no controller, no `setTimeout` cleanup, no leaked timer.

```typescript
async function fetchWithDeadline<T>(url: string, ms: number): Promise<T> {
	const res = await fetch(url, { signal: AbortSignal.timeout(ms) });
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json();
}

// TimeoutError is thrown if the request takes longer than 5s.
const data = await fetchWithDeadline<Search>("/api/search?q=svelte", 5000);
```

The error's `name` is `"TimeoutError"`, not `"AbortError"`. If you handle both in one branch, check `err.name === "AbortError" || err.name === "TimeoutError"`.

:::

:::step{title="Combine signals with AbortSignal.any"}

When a request should die on _either_ user teardown _or_ a deadline, `AbortSignal.any([...])` returns one signal that aborts as soon as any of its inputs do.

```typescript
async function search(query: string, userSignal: AbortSignal): Promise<Hit[]> {
	const signal = AbortSignal.any([userSignal, AbortSignal.timeout(8000)]);
	const res = await fetch(`/api/search?q=${query}`, { signal });
	return res.json();
}
```

This composes well. The teardown signal comes from the component lifecycle; the timeout signal comes from this function; the resulting signal does both jobs without coupling them.

:::

:::step{title="Hand-roll cancellation in code you wrote"}

If you're writing the cancellable thing yourself — a stream parser, a recursive worker, an animation loop — listen on the signal and throw when it fires.

```typescript
async function chunkedUpload(file: File, signal: AbortSignal): Promise<void> {
	signal.throwIfAborted(); // bail before doing any work

	for (const chunk of slice(file)) {
		await fetch("/upload", { method: "POST", body: chunk, signal });
		signal.throwIfAborted(); // bail between chunks too
	}
}
```

`signal.throwIfAborted()` is a one-liner that throws `signal.reason` (an `AbortError` by default) when the signal is aborted. Cleaner than `if (signal.aborted) throw …`.

:::

## What to remember

- Pass a signal to every async API that accepts one. The list keeps growing.
- One controller can wire up many things — fetches, listeners, your own loops.
- `AbortSignal.timeout(ms)` and `AbortSignal.any([...])` cover most "deadline" and "or this happens" patterns without writing a controller yourself.
- `AbortError` is the convention. Catch it by `err.name`, not `instanceof` — different realms (workers, iframes) have different `Error` constructors.

When code involves "stop doing this when X," your first reflex should be: is there a signal I can pass through?
