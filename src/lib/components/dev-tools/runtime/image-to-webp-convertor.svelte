<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import Download from "@lucide/svelte/icons/download";
	import ImageIcon from "@lucide/svelte/icons/image";
	import Loader2 from "@lucide/svelte/icons/loader-2";
	import RefreshCw from "@lucide/svelte/icons/refresh-cw";
	import Upload from "@lucide/svelte/icons/upload";
	import XCircle from "@lucide/svelte/icons/x-circle";
	import { toast } from "svelte-sonner";
	import ToolShell from "./tool-shell.svelte";

	type ProcessedImage = {
		id: number;
		originalPreview: string;
		convertedUrl: string;
		name: string;
		originalSize: number;
		processing: boolean;
		failed: boolean;
	};

	let images = $state<ProcessedImage[]>([]);
	let isDragover = $state(false);
	let isProcessing = $state(false);

	function formatFileSize(sizeInBytes: number): string {
		const kb = 1024;
		const mb = kb * 1024;
		if (sizeInBytes >= mb) return `${(sizeInBytes / mb).toFixed(2)} MB`;
		return `${(sizeInBytes / kb).toFixed(2)} KB`;
	}

	function loadImage(url: string): Promise<HTMLImageElement> {
		return new Promise((resolve, reject) => {
			const rawImage = new Image();
			rawImage.onload = () => resolve(rawImage);
			rawImage.onerror = reject;
			rawImage.src = url;
		});
	}

	function convertToWebp(image: HTMLImageElement): Promise<string> {
		return new Promise((resolve, reject) => {
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				reject(new Error("Failed to create canvas context"));
				return;
			}

			canvas.width = image.width;
			canvas.height = image.height;
			ctx.drawImage(image, 0, 0);

			canvas.toBlob(
				(blob) => {
					if (!blob) {
						reject(new Error("Failed to create WebP blob"));
						return;
					}
					resolve(URL.createObjectURL(blob));
				},
				"image/webp",
				0.8
			);
		});
	}

	async function processFile(file: File) {
		const originalUrl = URL.createObjectURL(file);
		const id = file.lastModified + Math.random();

		images = [
			...images,
			{
				id,
				originalPreview: originalUrl,
				convertedUrl: "",
				name: file.name.replace(/\.[^.]+$/, ""),
				originalSize: file.size,
				processing: true,
				failed: false
			}
		];

		try {
			const imgElement = await loadImage(originalUrl);
			const webpUrl = await convertToWebp(imgElement);
			images = images.map((image) =>
				image.id === id
					? { ...image, convertedUrl: webpUrl, processing: false }
					: image
			);
		} catch {
			images = images.map((image) =>
				image.id === id ? { ...image, processing: false, failed: true } : image
			);
			toast.error(`Could not convert ${file.name}`);
		}
	}

	async function handleFiles(fileList: FileList | null) {
		if (!fileList || fileList.length === 0) return;
		isProcessing = true;

		for (const file of Array.from(fileList)) {
			if (!file.type.startsWith("image/")) continue;
			await processFile(file);
		}

		isProcessing = false;
	}

	function clearAll() {
		for (const image of images) {
			URL.revokeObjectURL(image.originalPreview);
			if (image.convertedUrl) URL.revokeObjectURL(image.convertedUrl);
		}
		images = [];
	}

	function removeImage(id: number) {
		const current = images.find((image) => image.id === id);
		if (current) {
			URL.revokeObjectURL(current.originalPreview);
			if (current.convertedUrl) URL.revokeObjectURL(current.convertedUrl);
		}
		images = images.filter((image) => image.id !== id);
	}

	function onDrop(event: DragEvent) {
		event.preventDefault();
		isDragover = false;
		void handleFiles(event.dataTransfer?.files ?? null);
	}
</script>

<ToolShell
	title="Image to WebP Convertor"
	description="Convert PNG, JPG, and similar image formats into compressed WebP files locally in the browser."
	icon={ImageIcon}
	clearLabel="Clear all"
	tags={["image", "webp", "converter", "client-side"]}
	category="Image Tools"
	canClear={images.length > 0}
	onClear={clearAll}
>
	<div class="space-y-8">
		<label
			class={`relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-300 ${
				isDragover
					? "border-primary bg-primary/5 ring-4 ring-primary/10"
					: "border-muted-foreground/25 bg-card hover:border-primary/50 hover:bg-muted/50"
			}`}
			ondragover={(event) => {
				event.preventDefault();
				isDragover = true;
			}}
			ondragleave={() => (isDragover = false)}
			ondrop={onDrop}
		>
			<input
				type="file"
				accept="image/*,.png,.jpg,.jpeg,.bmp,.gif"
				multiple
				class="hidden"
				onchange={(event) => void handleFiles(event.currentTarget.files)}
			/>

			<div class="space-y-4">
				<div class={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${isDragover ? "bg-background text-primary shadow-lg" : "bg-muted text-muted-foreground"}`}>
					<Upload class="h-8 w-8" />
				</div>
				<div class="space-y-1">
					<p class="text-lg font-semibold text-foreground">
						{isDragover ? "Drop images here" : "Click or drag images here"}
					</p>
					<p class="text-sm text-muted-foreground">Supports JPG, PNG, BMP, and GIF</p>
				</div>
			</div>
		</label>

		{#if images.length > 0}
			<div class="flex items-center justify-between border-b border-border pb-4">
				<h3 class="flex items-center gap-2 text-xl font-semibold">
					Converted Images
					<Badge variant="secondary" class="rounded-full px-2.5">{images.length}</Badge>
				</h3>
				{#if isProcessing}
					<div class="flex items-center gap-2 text-sm text-muted-foreground">
						<Loader2 class="h-4 w-4 animate-spin" />
						Processing...
					</div>
				{/if}
			</div>

			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each images as img (img.id)}
					<Card.Root class="group overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
						<div class="relative aspect-video overflow-hidden border-b border-border/50 bg-muted/50">
							<img
								src={img.originalPreview}
								alt={img.name}
								class={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${img.processing ? "blur-sm opacity-50" : ""}`}
							/>

							<button
								type="button"
								onclick={() => removeImage(img.id)}
								class="absolute top-2 right-2 rounded-full bg-black/50 p-1.5 text-white opacity-0 transition-opacity hover:bg-destructive group-hover:opacity-100"
								title="Remove image"
							>
								<XCircle class="h-4 w-4" />
							</button>

							{#if img.processing}
								<div class="absolute inset-0 z-10 flex items-center justify-center">
									<div class="flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-xs font-medium shadow-sm backdrop-blur-md">
										<Loader2 class="h-4 w-4 animate-spin text-primary" />
										Converting...
									</div>
								</div>
							{/if}
						</div>

						<Card.Content class="space-y-4 p-4">
							<div class="flex items-start justify-between gap-2">
								<div class="min-w-0 space-y-1">
									<h4 class="truncate text-sm font-medium" title={img.name}>{img.name}</h4>
									<p class="text-xs text-muted-foreground">
										Original: {formatFileSize(img.originalSize)}
									</p>
								</div>
								<Badge variant={img.processing ? "outline" : img.failed ? "destructive" : "default"}>
									{img.processing ? "..." : img.failed ? "Failed" : "WebP"}
								</Badge>
							</div>

							{#if img.failed}
								<Button class="w-full" variant="secondary" disabled>Error</Button>
							{:else if img.processing}
								<Button class="w-full" disabled>Processing</Button>
							{:else}
								<Button class="w-full gap-2" href={img.convertedUrl} download={`${img.name}.webp`}>
									<Download class="h-4 w-4" />
									Download
								</Button>
							{/if}
						</Card.Content>
					</Card.Root>
				{/each}
			</div>

			<div class="flex items-center justify-center gap-2 border-t border-border/50 pt-8 text-center text-xs text-muted-foreground opacity-70">
				<RefreshCw class="h-3 w-3" />
				All conversions happen locally in your browser. Nothing is uploaded.
			</div>
		{/if}
	</div>
</ToolShell>

