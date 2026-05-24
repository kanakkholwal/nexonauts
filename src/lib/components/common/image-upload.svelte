<script lang="ts">
	import { env } from "$env/dynamic/public";
	import { Button } from "$lib/components/ui/button";
	import LoaderCircle from "@lucide/svelte/icons/loader-circle";
	import Upload from "@lucide/svelte/icons/upload";
	import { toast } from "svelte-sonner";

	type Props = {
		onUpload: (url: string) => void;
		label?: string;
		accept?: string;
	};

	const { onUpload, label = "Upload image", accept = "image/*" }: Props = $props();

	let uploading = $state(false);
	let inputEl: HTMLInputElement | undefined = $state();

	const cloudName = env.PUBLIC_CLOUDINARY_CLOUD_NAME;
	const uploadPreset = env.PUBLIC_CLOUDINARY_UPLOAD_PRESET;
	const folder = env.PUBLIC_CLOUDINARY_FOLDER;

	const isConfigured = Boolean(cloudName && uploadPreset);

	async function handleFile(file: File) {
		if (!isConfigured) {
			toast.error("Cloudinary is not configured. Paste an image URL instead.");
			return;
		}

		uploading = true;
		try {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("upload_preset", uploadPreset!);
			if (folder) formData.append("folder", folder);

			const response = await fetch(
				`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
				{ method: "POST", body: formData }
			);

			if (!response.ok) {
				throw new Error(`Upload failed (${response.status})`);
			}

			const data = (await response.json()) as { secure_url?: string };
			if (!data.secure_url) throw new Error("Upload did not return a URL");

			onUpload(data.secure_url);
			toast.success("Image uploaded");
		} catch (err) {
			console.error(err);
			toast.error(err instanceof Error ? err.message : "Upload failed");
		} finally {
			uploading = false;
			if (inputEl) inputEl.value = "";
		}
	}
</script>

<div class="flex items-center gap-2">
	<input
		bind:this={inputEl}
		type="file"
		{accept}
		class="hidden"
		onchange={(event) => {
			const file = event.currentTarget.files?.[0];
			if (file) void handleFile(file);
		}}
	/>
	<Button
		type="button"
		variant="secondary"
		size="sm"
		disabled={uploading || !isConfigured}
		onclick={() => inputEl?.click()}
		title={isConfigured ? "Pick an image to upload" : "Set PUBLIC_CLOUDINARY_* env vars to enable"}
	>
		{#if uploading}
			<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
			Uploading...
		{:else}
			<Upload class="mr-2 h-4 w-4" />
			{label}
		{/if}
	</Button>
	{#if !isConfigured}
		<span class="text-muted-foreground text-xs">
			(Cloudinary disabled — paste a URL above)
		</span>
	{/if}
</div>
