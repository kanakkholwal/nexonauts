<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { cn } from "$lib/utils";
  import type { Component, Snippet } from "svelte";
  import { Badge } from "../../ui/badge";

  /**
   * ToolShell — chrome for an individual dev tool page.
   *
   * `icon` accepts any of:
   *   - a string emoji or short glyph: `icon="📄"` / `icon="<>"` / `icon="🧬"`
   *     (rendered with `{@html}` so HTML entities like `&lt;/&gt;` work too)
   *   - a Lucide / Svelte component reference: `icon={ImageIcon}`
   *   - or, for fully-custom SVG markup, pass `iconSnippet` instead:
   *     `{#snippet iconSnippet()}<svg …>…</svg>{/snippet}`
   *
   * Whichever form is used, the icon sits in a square ink-tinted plate to the
   * left of the editorial title.
   */
  type IconComponent = Component<{ class?: string; size?: number | string }>;

  let {
    title,
    description,
    icon,
    iconSnippet,
    clearLabel = "Clear",
    canClear = true,
    onClear,
    children,
    class: className = "",
    tags,
    category
  }: {
    title: string;
    description: string;
    icon?: string | IconComponent;
    iconSnippet?: Snippet;
    clearLabel?: string;
    canClear?: boolean;
    onClear?: () => void;
    children?: Snippet;
    class?: string;
    tags?: string[];
	category: string;
  } = $props();

  const isStringIcon = $derived(typeof icon === "string");
  const IconComponent = $derived(
    !isStringIcon && icon ? (icon as IconComponent) : null,
  );
</script>

<div
  class={cn(
    "relative isolate min-h-[720px] w-full overflow-hidden pb-12",
    className,
  )}
>
  <div class="relative z-10 space-y-8">
    <header
      class="flex flex-col gap-5 md:flex-row md:items-start md:justify-between"
    >
      <div class="flex items-start gap-4">
       

        <div class="space-y-3">
			<div class="flex items-center gap-3">
			<div class="bg-muted flex size-12 items-center justify-center rounded-xl">
				 {#if iconSnippet}
          <span
            class="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-hairline bg-canvas-soft text-ink [&_svg]:size-6"
          >
            {@render iconSnippet()}
          </span>
        {:else if isStringIcon}
          <span
            class="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-hairline bg-canvas-soft text-xl text-ink"
          >
            {@html icon}
          </span>
        {:else if IconComponent}
          <span
            class="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-hairline bg-canvas-soft text-ink"
          >
            <IconComponent class="size-6" />
          </span>
        {/if}
			</div>
			<Badge variant="secondary" class="rounded-full">{category}</Badge>
		</div>
          <h1
            class="font-display text-3xl font-bold tracking-tight"
          >
            {title}
          </h1>
		<p class="text-muted-foreground max-w-2xl text-base leading-relaxed">
            {description}
          </p>
          {#if tags && tags.length}
            <div class="flex flex-wrap gap-1.5 pt-1">
              {#each tags as tag (tag)}
                <span
                  class="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-[11px] font-medium"
                >
                  {tag}
                </span>
              {/each}
            </div>
          {/if}
        </div>
      </div>

      <Button
        variant="outline"
        size="md"
        onclick={onClear}
        disabled={!canClear}
        class="shrink-0 hover:border-destructive/40 hover:text-destructive"
      >
        {clearLabel}
      </Button>
    </header>

    {@render children?.()}
  </div>
</div>
