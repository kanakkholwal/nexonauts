'use client';

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from '@/components/ui/progress';
import JSZip from 'jszip';
import { AlertCircle, FileText } from 'lucide-react';
import { PDFArray, PDFDict, PDFDocument, PDFName, PDFNumber } from 'pdf-lib';
import { useState } from 'react';
import { DownloadArea } from './DownloadArea';
import { DragnDrop } from './DragnDrop';

interface PDFResult {
  id: string;
  name: string;
  result?: string;
}

export default function PdfPageStripper() {
  const [pdfFiles, setPdfFiles] = useState<PDFResult[]>([]);
  const [zipping, setZipping] = useState<{ state: number; result?: string; size?: number }>({
    state: -1,
  });
  const [processDone, setProcessDone] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // --- CORE LOGIC (Fixed for .lookup) ---
  async function stripPdf(bytes: ArrayBuffer) {
    try {
      const pdfFile = await PDFDocument.load(bytes);

      // Use lookup() to resolve references
      const pageLabels = pdfFile.catalog.lookup(PDFName.of("PageLabels"));
      if (!pageLabels || !(pageLabels instanceof PDFDict)) return;

      const nums = pageLabels.lookup(PDFName.of("Nums"));
      if (!nums || !(nums instanceof PDFArray)) return;

      const pageNumbers = nums.asArray();
      const pagesToKeep = new Set<number>();

      for (let i = 1; i < pageNumbers.length; i++) {
        const element = pageNumbers[i];
        if (element instanceof PDFNumber) {
          pagesToKeep.add(element.asNumber() - 1);
        }
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
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }

  async function zipFiles(files: PDFResult[]) {
    const zip = new JSZip();

    for (let i = 0; i < files.length; i++) {
      const result = files[i].result;
      if (result === undefined) continue;
      const blob = await fetch(result).then((r) => r.blob());
      zip.file(files[i].name, blob);
    }

    const resZip = await zip.generateAsync<"blob">({
      type: "blob",
      compression: "DEFLATE",
    });

    return { url: window.URL.createObjectURL(resZip), size: resZip.size };
  }

  async function onFilesSelected(files: FileList) {
    setError(null);
    setProcessDone(0.1);
    setPdfFiles([]);
    setZipping({ state: -1 });

    if (files.length === 0) return;

    const newPdfFiles: PDFResult[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (!file) continue;

      newPdfFiles.push({
        id: `${i}`,
        name: `stripped-${file.name}`,
      });

      const fileBytes = await file.arrayBuffer();
      setProcessDone(((i + 0.3) / files.length) * 100);

      const strippedPdf = await stripPdf(fileBytes);
      setProcessDone(((i + 0.7) / files.length) * 100);

      if (strippedPdf) {
        // @ts-ignore
        const result = new Blob([await strippedPdf.save()], {
          type: "application/pdf",
        });
        newPdfFiles[i].result = window.URL.createObjectURL(result);
        setZipping({ state: 0 });
      } else {
        newPdfFiles[i].name += " (Skipped: No labels found)";
      }

      setPdfFiles([...newPdfFiles]);
      setProcessDone(((i + 1) / files.length) * 100);
    }

    setProcessDone(100);

    if (newPdfFiles.some(file => file.result)) {
      const res = await zipFiles(newPdfFiles);
      setZipping({
        result: res.url,
        size: res.size,
        state: 1,
      });
    } else {
      setError("None of the uploaded PDFs contained valid page labels to process.");
    }
  }

  const resetProcess = () => {
    setProcessDone(0);
    setError(null);
  };
  // --- CORE LOGIC END ---

  return (
    < >
      <div className="max-w-3xl mx-auto space-y-8">



        {/* Main Content Area */}
        <div className="bg-card text-card-foreground rounded-xl shadow-sm border border-border p-6 sm:p-8">

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {processDone === 100 && !error ? (
            <DownloadArea
              pdfFiles={pdfFiles}
              zip={zipping}
              onReset={resetProcess}
            />
          ) : (
            <div className="space-y-6">
              {processDone === 0 ? (
                <DragnDrop onFilesSelected={onFilesSelected} />
              ) : (
                <div className="space-y-6 py-12 px-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium text-muted-foreground">
                      <span>Processing files...</span>
                      <span>{Math.round(processDone)}%</span>
                    </div>
                    <Progress value={processDone} className="h-2 w-full" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center animate-pulse">
                    Analyzing page labels and stripping content...
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer/Helper */}
        <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2 opacity-70">
          <FileText size={14} />
          <span>Processed locally in your browser. No files uploaded.</span>
        </div>
      </div>
    </>
  );
}