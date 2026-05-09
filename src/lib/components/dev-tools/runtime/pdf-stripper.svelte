<script lang="ts">
	import { Alert, AlertDescription, AlertTitle } from "$lib/components/ui/alert";
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import { Progress } from "$lib/components/ui/progress";
	import { ScrollArea } from "$lib/components/ui/scroll-area";
	import AlertCircle from "@lucide/svelte/icons/alert-circle";
	import CheckCircle2 from "@lucide/svelte/icons/check-circle-2";
	import Download from "@lucide/svelte/icons/download";
	import FileText from "@lucide/svelte/icons/file-text";
	import Loader2 from "@lucide/svelte/icons/loader-2";
	import Package from "@lucide/svelte/icons/package";
	import RefreshCw from "@lucide/svelte/icons/refresh-cw";
	import Upload from "@lucide/svelte/icons/upload";
	import JSZip from "jszip";
	import { PDFArray, PDFDict, PDFDocument, PDFName, PDFNumber } from "pdf-lib";
	import ToolShell from "./tool-shell.svelte";

	type PDFResult = {
		id: string;
		name: string;
		result?: string;
	};

	let pdfFiles = $state<PDFResult[]>([]);
	let zipState = $state<{ state: number; result?: string; size?: number }>({ state: -1 });
	let processDone = $state(0);
	let error = $state<string | null>(null);
	let isDragover = $state(false);

	async function stripPdf(bytes: ArrayBuffer) {
		try {
			const pdfFile = await PDFDocument.load(bytes);
			const pageLabels = pdfFile.catalog.lookup(PDFName.of("PageLabels"));
			if (!pageLabels || !(pageLabels instanceof PDFDict)) return;

			const nums = pageLabels.lookup(PDFName.of("Nums"));
			if (!nums || !(nums instanceof PDFArray)) return;

			const pageNumbers = nums.asArray();
			const pagesToKeep = new Set<number>();

			for (let i = 1; i < pageNumbers.length; i++) {
				const element = pageNumbers[i];
				if (element instanceof PDFNumber) pagesToKeep.add(element.asNumber() - 1);
			}

			let deletedAnyPage = false;
			const pageCount = pdfFile.getPageCount();
			for (let i = pageCount - 2; i >= 0; i--) {
				if (!pagesToKeep.has(i)) {
					pdfFile.removePage(i);
					deletedAnyPage = true;
				}
			}

			if (!deletedAnyPage) return;
			return pdfFile;
		} catch {
			return undefined;
		}
	}

	async function zipFiles(files: PDFResult[]) {
		const zip = new JSZip();

		for (const file of files) {
			if (!file.result) continue;
			const blob = await fetch(file.result).then((response) => response.blob());
			zip.file(file.name, blob);
		}

		const result = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
		return {
			url: window.URL.createObjectURL(result),
			size: result.size
		};
	}

	async function onFilesSelected(files: FileList | null) {
		error = null;
		processDone = 0.1;
		pdfFiles = [];
		zipState = { state: -1 };
		if (!files || files.length === 0) return;

		const newPdfFiles: PDFResult[] = [];

		for (let i = 0; i < files.length; i++) {
			const file = files.item(i);
			if (!file) continue;

			newPdfFiles.push({
				id: `${i}-${file.lastModified}`,
				name: `stripped-${file.name}`
			});

			const fileBytes = await file.arrayBuffer();
			processDone = ((i + 0.3) / files.length) * 100;

			const strippedPdf = await stripPdf(fileBytes);
			processDone = ((i + 0.7) / files.length) * 100;

			if (strippedPdf) {
				const savedBytes = await strippedPdf.save();
				const result = new Blob([savedBytes as unknown as BlobPart], {
					type: "application/pdf"
				});
				newPdfFiles[i].result = window.URL.createObjectURL(result);
				zipState = { state: 0 };
			} else {
				newPdfFiles[i].name += " (Skipped: No labels found)";
			}

			pdfFiles = [...newPdfFiles];
			processDone = ((i + 1) / files.length) * 100;
		}

		processDone = 100;

		if (newPdfFiles.some((file) => file.result)) {
			const zipResult = await zipFiles(newPdfFiles);
			zipState = { state: 1, result: zipResult.url, size: zipResult.size };
		} else {
			error = "None of the uploaded PDFs contained valid page labels to process.";
		}
	}

	function resetProcess() {
		processDone = 0;
		error = null;
		pdfFiles = [];
		zipState = { state: -1 };
	}

	function onDrop(event: DragEvent) {
		event.preventDefault();
		isDragover = false;
		const dataTransfer = event.dataTransfer;
		if (!dataTransfer?.files?.length) return;
		void onFilesSelected(dataTransfer.files);
	}

	const processedCount = $derived(pdfFiles.filter((file) => file.result).length);
</script>

<ToolShell
	title="PDF Page Stripper"
	description="Strip labeled pages from PDFs entirely in the browser using pdf-lib, then download the results individually or as a ZIP."
	icon="📄"
	clearLabel="Reset"
	canClear={processDone > 0 || pdfFiles.length > 0}
	onClear={resetProcess}
>
	<div class="mx-auto max-w-4xl space-y-8">
		{#if error}
			<Alert variant="destructive">
				<AlertCircle />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>{error}</AlertDescription>
			</Alert>
		{/if}

		<div class="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
			{#if processDone === 100 && !error}
				<div class="space-y-8">
					<div class="flex flex-col items-center space-y-4 text-center">
						<div class="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/15 text-green-600 dark:text-green-400">
							<CheckCircle2 class="h-6 w-6" />
						</div>
						<div>
							<h3 class="text-xl font-semibold text-foreground">Processing Complete</h3>
							<p class="text-muted-foreground">
								Successfully processed {processedCount} of {pdfFiles.length} files.
							</p>
						</div>
					</div>

					<div class="flex flex-col gap-4">
						{#if zipState.state === 1 && zipState.result}
							<a href={zipState.result} download="stripped-pdfs.zip" class="w-full">
								<Button size="lg" class="h-20 w-full text-lg shadow-lg shadow-primary/20">
									<Package class="mr-3 h-6 w-6" />
									<div class="flex flex-col items-start gap-1 text-left">
										<span class="leading-none font-bold">Download All as ZIP</span>
										<span class="text-xs font-normal opacity-80">
											Total Size: {Math.round(((zipState.size ?? 0) / 1024 / 1024) * 100) / 100} MB
										</span>
									</div>
								</Button>
							</a>
						{:else}
							<Button disabled variant="secondary" class="h-20 w-full">
								<Loader2 class="mr-2 h-4 w-4 animate-spin" />
								Preparing ZIP archive...
							</Button>
						{/if}

						<Button variant="ghost" onclick={resetProcess} class="text-muted-foreground hover:text-foreground">
							<RefreshCw class="mr-2 h-4 w-4" />
							Process different files
						</Button>
					</div>

					<div class="space-y-3 border-t border-border pt-4">
						<div class="pl-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
							Individual Files
						</div>
						<ScrollArea class="h-72 w-full rounded-xl border border-border bg-muted/30">
							<div class="space-y-2 p-3">
								{#each pdfFiles as item (item.id)}
									<div class="group flex items-center justify-between rounded-lg border border-border/50 bg-card p-3 shadow-sm transition-colors hover:border-primary/50">
										<div class="flex items-center gap-3 overflow-hidden">
											<div class={`rounded-md p-2.5 ${item.result ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
												<FileText class="h-4 w-4" />
											</div>
											<div class="min-w-0">
												<span class="block truncate text-sm font-medium text-foreground">{item.name}</span>
												{#if !item.result}
													<span class="text-xs text-destructive">No pages stripped</span>
												{/if}
											</div>
										</div>

										{#if item.result}
											<Button size="icon-sm" variant="ghost" href={item.result} download={item.name} title="Download single file">
												<Download class="h-4 w-4" />
											</Button>
										{/if}
									</div>
								{/each}
							</div>
						</ScrollArea>
					</div>
				</div>
			{:else}
				<div class="space-y-6">
					{#if processDone === 0}
						<label
							class={`relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-all duration-300 ${
								isDragover
									? "border-primary bg-primary/10 ring-4 ring-primary/20"
									: "border-muted-foreground/25 bg-muted/20 hover:border-muted-foreground/50 hover:bg-muted/40"
							}`}
							ondragover={(event) => {
								event.preventDefault();
								isDragover = true;
							}}
							ondragenter={(event) => {
								event.preventDefault();
								isDragover = true;
							}}
							ondragleave={() => (isDragover = false)}
							ondrop={onDrop}
						>
							<input
								type="file"
								class="hidden"
								accept="application/pdf,.pdf"
								multiple
								onchange={(event) => void onFilesSelected(event.currentTarget.files)}
							/>

							<div class="relative z-10 flex flex-col items-center gap-4">
								<div class={`rounded-full p-4 transition-colors duration-300 ${
									isDragover
										? "bg-background text-primary shadow-lg"
										: "border border-border bg-background text-muted-foreground shadow-sm"
								}`}>
									<Upload class="h-8 w-8" />
								</div>
								<div class="space-y-1">
									<p class="text-lg font-semibold text-foreground">
										{isDragover ? "Drop files here" : "Click or drag PDF files here"}
									</p>
									<p class="text-sm text-muted-foreground">Supports multiple PDF files</p>
								</div>
								<Button variant="secondary" class="pointer-events-none mt-4">Select Files</Button>
							</div>
						</label>
					{:else}
						<div class="space-y-6 px-4 py-12">
							<div class="space-y-2">
								<div class="flex justify-between text-sm font-medium text-muted-foreground">
									<span>Processing files...</span>
									<span>{Math.round(processDone)}%</span>
								</div>
								<Progress value={processDone} class="h-2 w-full" />
							</div>
							<p class="animate-pulse text-center text-sm text-muted-foreground">
								Analyzing page labels and stripping content...
							</p>
						</div>
					{/if}
				</div>
			{/if}
		</div>

		<div class="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground opacity-70">
			<FileText class="h-3.5 w-3.5" />
			<span>Processed locally in your browser. No files uploaded.</span>
		</div>
	</div>
</ToolShell>
