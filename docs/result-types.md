---
title: Result types in TypeScript
description: A small, opinionated take on representing failure as data — and when not to.
tags: [typescript, types, errors]
order: 15
---

# Result types in TypeScript

There are two ways to represent "this might fail" in TypeScript: throw an exception, or return a value that encodes both outcomes. The community calls the second a `Result` type. It's worth knowing when each is the right reach.

The shape itself is just a discriminated union — nothing exotic, no library required.

:::step{title="The shape"}

A `Result<T, E>` is two variants tagged by a literal field. The compiler narrows on that field with `switch` or `if`, the way [TypeScript narrowing](/guides/ts-narrowing) describes.

```typescript
type Result<T, E = Error> =
	| { ok: true; value: T }
	| { ok: false; error: E };

const Ok = <T>(value: T): Result<T, never> => ({ ok: true, value });
const Err = <E>(error: E): Result<never, E> => ({ ok: false, error });
```

Note the `never` in the constructors — they say "this variant doesn't carry the other half." TypeScript will still happily assign `Ok<number>` to `Result<number, Error>`, because `never` is assignable to anything.

:::

:::step{title="A function that returns one"}

Wrap any operation that has a known failure mode. The caller now _must_ handle both outcomes — there's no silent crash, no try/catch they forgot to write.

```typescript
function parseJSON<T = unknown>(input: string): Result<T, SyntaxError> {
	try {
		return Ok(JSON.parse(input) as T);
	} catch (err) {
		return Err(err as SyntaxError);
	}
}

const parsed = parseJSON<{ name: string }>(rawInput);
if (!parsed.ok) {
	console.warn("bad json:", parsed.error.message);
	return;
}
console.log(parsed.value.name); // T is narrowed to { name: string }
```

The body of the `if (!parsed.ok)` branch sees `error`. The body after sees `value`. No casts, no `!`.

:::

:::step{title="Don't reach for it on every function"}

Wrapping every operation in a `Result` is overkill. Use it when failure is _expected_ and _branched on_ — JSON parsing, form validation, parsing a URL, hitting an external service that might be down. Use exceptions when failure is _exceptional_ — a missing key in a config you control, an invariant the rest of the program already depends on.

```typescript
// Good: failure is data — the caller will branch on it.
function parseEmail(input: string): Result<Email, ValidationError> { … }

// Bad: failure means the program is broken — let it crash.
function getCurrentUserId(): Result<string, Error> {
	if (!session.user) return Err(new Error("no user"));
	return Ok(session.user.id);
}
```

The second example is just an awkward `assert`. Throwing reads better and gives you a stack trace.

:::

:::step{title="Chain them with a helper"}

Once you have a few `Result`-returning functions, you'll want to compose them. A tiny `andThen` (sometimes called `flatMap`) keeps the happy path linear.

```typescript
function andThen<T, U, E>(
	result: Result<T, E>,
	fn: (value: T) => Result<U, E>
): Result<U, E> {
	return result.ok ? fn(result.value) : result;
}

const fullName = andThen(parseJSON<{ first: string; last: string }>(raw), (p) =>
	p.first && p.last ? Ok(`${p.first} ${p.last}`) : Err(new Error("missing name"))
);
```

You don't need a library for this. Three helpers (`map`, `mapErr`, `andThen`) cover almost every use, and they're four lines each.

:::

:::step{title="Async returns Promise<Result<…>>"}

The async version doesn't need a new type — `Result` is data, and a Promise of data is just a Promise.

```typescript
async function loadUser(id: string): Promise<Result<User, "not_found" | "network">> {
	try {
		const res = await fetch(`/api/users/${id}`);
		if (res.status === 404) return Err("not_found");
		if (!res.ok) return Err("network");
		return Ok(await res.json());
	} catch {
		return Err("network");
	}
}

const r = await loadUser("u_42");
if (!r.ok) return showError(r.error);
renderUser(r.value);
```

Notice the error type — it's a literal union, not `Error`. When you control the error type, you can enumerate the reasons callers will branch on, and TypeScript's exhaustiveness checking catches missed cases.

:::

## When `Result` is the wrong shape

- **Errors you can't enumerate.** If the error is "anything could happen here," that's just `unknown`, and `try/catch` is the better idiom.
- **Single-use callbacks.** A one-off `Result.ok ? … : …` reads more naturally as `try { … } catch { … }`. The wrapping is overhead.
- **Across library boundaries.** Throwing is the JavaScript standard. Don't force consumers of your library to import a `Result` type unless that's the whole pitch.

The point of `Result` isn't "exceptions are bad." It's that some failures are part of the function's signature, and the type system can help callers remember to handle them. The rest belongs in `throw`.
