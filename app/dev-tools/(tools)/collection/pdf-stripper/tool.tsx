'use client';

import { Progress } from '@/components/ui/progress';
import JSZip from 'jszip';
import { PDFDocument, PDFName, PDFNumber, type PDFArray, type PDFDict, type PDFObject } from 'pdf-lib';
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

  /**
   * It finds the index of the last page of each defined page label of the PDF document.
   * Only the found pages are returned.
   * 
   * More information about page labels:
   * https://www.adobe.com/content/dam/acom/en/devnet/pdf/pdfs/pdf_reference_archives/PDFReference.pdf#page=501&zoom=100,118,506
   */
  async function stripPdf(bytes: ArrayBuffer) {
    const pdfFile = await PDFDocument.load(bytes);
    const pageLabels = pdfFile.catalog.get(PDFName.of("PageLabels")) as PDFDict;
    
    if (!pageLabels) return;
    
    const pageNumbers = (pageLabels.get(PDFName.of("Nums")) as PDFArray).asArray() as PDFObject[];
    if (!pageNumbers) return;

    const pagesToKeep = new Set<number>();
    for (let i = 1; i < pageNumbers.length; i++) {
      const element = pageNumbers[i];
      if (element instanceof PDFNumber) {
        // Page number - 1 ==> index
        // each page number == first index of label range ... page number - 1 == last index of previous label range
        pagesToKeep.add(element.asNumber() - 1);
      }
    }

    let deletedAnyPage = false;
    const pageCount = pdfFile.getPageCount();
    // NOTE: pageCount - 2, because we always want to keep the last page (since it is not included in the set)
    for (let i = pageCount - 2; i >= 0; i--) {
      if (!pagesToKeep.has(i)) {
        pdfFile.removePage(i);
        deletedAnyPage = true;
      }
    }
    
    if (!deletedAnyPage) return;
    return pdfFile;
  }

  /**
   * Converts all striped PDF to one zip file.
   * @returns URL to blob(with zip file) or undefined if less than 2 pdf got striped
   */
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
        newPdfFiles[i].name += " - found nothing to strip";
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
    }
  }

  const resetProcess = () => {
    setProcessDone(0);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto mt-16">
      <h2 className="text-2xl font-bold mb-6">PDF Stripper</h2>

      <div className="w-full relative">
        {processDone === 100 ? (
          <div className="bg-white rounded-lg shadow-lg p-6 w-full">
            <DownloadArea 
              pdfFiles={pdfFiles} 
              zip={zipping} 
              onReset={resetProcess} 
            />
          </div>
        ) : (
          <div className="w-full">
            {processDone > 0 && (
              <div className="mb-4">
                <Progress value={processDone} className="h-2.5" />
              </div>
            )}
            {processDone === 0 && (
              <DragnDrop onFilesSelected={onFilesSelected} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}