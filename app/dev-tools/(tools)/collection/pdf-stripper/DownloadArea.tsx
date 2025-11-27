'use client';

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, Download, FileText, Package, RefreshCw } from "lucide-react";

interface PDFResult {
  id: string;
  name: string;
  result?: string;
}

interface DownloadAreaProps {
  pdfFiles: PDFResult[];
  zip: {
    state: number;
    result?: string;
    size?: number;
  };
  onReset: () => void;
}

export function DownloadArea({ pdfFiles, zip, onReset }: DownloadAreaProps) {
  const processedCount = pdfFiles.filter(f => f.result).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* Success Banner */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="h-12 w-12 bg-green-500/15 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
          <CheckCircle2 size={24} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">Processing Complete!</h3>
          <p className="text-muted-foreground">
            Successfully processed {processedCount} of {pdfFiles.length} files.
          </p>
        </div>
      </div>

      {/* Primary Action: Download ZIP */}
      <div className="flex flex-col gap-4">
        {zip.state === 1 && zip.result ? (
          <a
            href={zip.result}
            download="stripped-pdfs.zip"
            className="w-full"
          >
            <Button
              size="lg"
              className="w-full h-20 text-lg shadow-lg shadow-primary/20"
            >
              <Package className="mr-3 h-6 w-6" />
              <div className="flex flex-col items-start text-left gap-1">
                <span className="font-bold leading-none">Download All as ZIP</span>
                <span className="text-xs opacity-80 font-normal">
                  Total Size: {Math.round((zip.size || 0) / 1024 / 1024 * 100) / 100} MB
                </span>
              </div>
            </Button>
          </a>
        ) : (
          <Button disabled className="w-full h-20" variant="secondary">
            <span className="animate-pulse">Preparing ZIP archive...</span>
          </Button>
        )}

        <Button
          variant="ghost"
          onClick={onReset}
          className="text-muted-foreground hover:text-foreground"
        >
          <RefreshCw size={14} className="mr-2" />
          Process different files
        </Button>
      </div>

      {/* Individual File List */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-1">
          Individual Files
        </div>
        <ScrollArea className="h-72 w-full rounded-xl border border-border bg-muted/30">
          <div className="p-3 space-y-2">
            {pdfFiles.map((item) => (
              <div
                key={item.id}
                className="bg-card p-3 rounded-lg border border-border/50 shadow-sm flex items-center justify-between group hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className={`p-2.5 rounded-md ${item.result ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    <FileText size={18} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-foreground truncate block">
                      {item.name}
                    </span>
                    {!item.result && (
                      <span className="text-xs text-destructive">No pages stripped</span>
                    )}
                  </div>
                </div>

                {item.result && (
                  <a
                    href={item.result}
                    download={item.name}
                    title="Download single file"
                  >
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-primary">
                      <Download size={16} />
                    </Button>
                  </a>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}