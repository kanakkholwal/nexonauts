<script lang="ts">
import type { Snippet } from "svelte";
import type { BoxFaces } from "./iso";
import "./iso.css";

type Props = { b: BoxFaces; accent?: boolean; children?: Snippet };

let { b, accent = false, children }: Props = $props();
</script>

<g class="solid">
	<polygon class={accent ? "accent-side" : "face-left"} points={b.left} />
	<polygon class={accent ? "accent-side" : "face-right"} points={b.right} />
	<polygon class={accent ? "accent-top" : "face-top"} points={b.top} />
	{@render children?.()}
</g>
