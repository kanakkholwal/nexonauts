---
title: TypeScript Narrowing, by example
description: Four ways TypeScript narrows a union — typeof, in, instanceof, and discriminants.
tags: [typescript, types, narrowing]
order: 10
---

# TypeScript Narrowing, by example

A "narrow" is when TypeScript proves a value belongs to a more specific type than its declared type. Inside that narrowed scope, you get accurate autocomplete, no spurious `undefined` checks, and method calls compile without casts. Below are the four narrowing mechanics worth knowing, in order of how often you'll reach for them.

:::step{title="typeof — the workhorse"}

Use `typeof` when the union is built from JavaScript primitives. The compiler knows the seven runtime tag values (`string`, `number`, `boolean`, `bigint`, `symbol`, `undefined`, `object`, `function`) and narrows on any of them.

```typescript
function pad(value: string | number, width: number): string {
	if (typeof value === "number") {
		return value.toString().padStart(width, "0");
	}
	return value.padStart(width, " ");
}
```

:::

:::step{title="in — when shapes differ but constructors don't"}

When two union members are plain objects with disjoint keys, `in` is the cheapest narrow. No discriminant property needed, no `instanceof` ceremony.

```typescript
type FromCache = { cached: true; value: string };
type FromNetwork = { fetchedAt: Date; value: string };

function age(result: FromCache | FromNetwork): number {
	if ("cached" in result) {
		return 0;
	}
	return Date.now() - result.fetchedAt.getTime();
}
```

:::

:::step{title="instanceof — only for real classes"}

`instanceof` narrows on the prototype chain, so it only works for values constructed with `new`. Native errors, DOM nodes, and your own classes — yes. Plain object shapes returned from JSON or a fetch — no.

```typescript
function describe(err: Error | string): string {
	if (err instanceof RangeError) {
		return `out of range: ${err.message}`;
	}
	if (err instanceof Error) {
		return err.message;
	}
	return err;
}
```

:::

:::step{title="Discriminated unions — the one to design for"}

If you control the shape, give every variant a literal-typed `kind` (or `type`, or `status`) field. The compiler narrows on that field with `switch` and forces exhaustiveness via `never`.

```typescript
type Result =
	| { kind: "ok"; value: number }
	| { kind: "err"; message: string };

function render(r: Result): string {
	switch (r.kind) {
		case "ok":
			return `= ${r.value}`;
		case "err":
			return `! ${r.message}`;
		default: {
			const _exhaustive: never = r;
			return _exhaustive;
		}
	}
}
```

:::

## When each one fails you

`typeof` can't tell `object` from `null` — both report `"object"` at runtime. `instanceof` breaks across realms (iframes, worker boundaries, jest mocks). `in` returns `true` for inherited keys, so a `{ cached: undefined }` object still narrows to `FromCache`. Discriminated unions only narrow if the discriminant is a *literal* type — a `string` field won't work, only `"ok" | "err"`.

When narrowing doesn't compile, the fix is almost always to design the union differently, not to reach for `as`.
