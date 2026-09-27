<script lang="ts">
import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
import { button } from "$lib/components/ui/button/variants";
import { cn } from "$lib/cn";

let { class: classProp, ...rest }: AlertDialogPrimitive.CancelProps = $props();
</script>

<AlertDialogPrimitive.Cancel
	{...rest}
	data-slot="alert-dialog-cancel"
	class={cn(button({ variant: "outline" }), classProp)}
/>
