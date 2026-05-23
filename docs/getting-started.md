---
title: Getting Started
description: Learn how to set up docvia
tags: [guide, tutorial]
order: 1
---

# Getting Started

## Installation

```bash
pnpm add -D @docvia/cli
```

## Project Structure

| Directory | Purpose |
|-----------|---------|
| `docs/` | Markdown source files |
| `.docvia/` | Compiled output (gitignored) |
| `docvia.config.ts` | Configuration |

## Writing Documentation

Create markdown files in the `docs/` directory:

```markdown
---
title: My Page
description: A description of my page
tags: [example]
---

# My Page

Content goes here.
```

## Building

```bash
docvia build
```

This compiles your documentation into `.docvia/`.
