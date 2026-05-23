---
title: Components
description: Embedding custom components via directives
tags: [advanced, components]
order: 2
---

# Components

docvia supports custom components via directive syntax.

## Usage

Use `:::name` to embed a registered component:

:::note
This is a note component rendered via the directive system.
:::

:::warning
This is a warning — handle with care!
:::

## Code Examples

```typescript
import { defineConfig } from '@docvia/cli';

export default defineConfig({
  sourceDir: 'docs',
  outDir: '.docvia',
  plugins: [],
});
```
