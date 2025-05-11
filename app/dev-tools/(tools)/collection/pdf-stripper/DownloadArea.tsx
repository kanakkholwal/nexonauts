'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  return (
    <div className="flex flex-col gap-4">
      {zip.state === 1 && zip.result && (
        <a
          href={zip.result}
          download="stripped-pdfs.zip"
          className="no-underline"
        >
          <Button 
            variant="outline" 
            className="w-full relative h-auto py-4 group border-blue-900 hover:bg-blue-900 hover:text-white transition-all"
          >
            <div className="flex flex-col items-center w-full">
              <div className="flex items-center gap-2">
                <Download size={18} />
                <span>Download as .zip</span>
              </div>
              <div className="text-sm text-muted-foreground group-hover:text-blue-100 mt-1">
                Size: {Math.round((zip.size || 0) / 10000) / 100} mb
              </div>
            </div>
          </Button>
        </a>
      )}
      
      {zip.state === 0 && (
        <Button 
          variant="outline" 
          disabled 
          className="w-full relative h-auto py-4"
        >
          <div className="flex flex-col items-center w-full">
            <div>Loading .zip</div>
            <div className="text-sm text-muted-foreground mt-1">Loading...</div>
          </div>
        </Button>
      )}

      <ScrollArea className="h-[calc(50vh-123px)] w-full rounded-md">
        <Card className="p-1">
          <ul className="divide-y">
            {pdfFiles.map((item) => (
              <li key={item.id} className="p-4 text-center text-sm">
                <div className="flex justify-between items-center">
                  <span className="truncate max-w-[70%]">{item.name}</span>
                  {item.result && (
                    <a
                      href={item.result}
                      download={item.name}
                      className="text-blue-700 hover:text-blue-900 hover:underline"
                    >
                      Download
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </ScrollArea>

      <Button 
        variant="outline" 
        onClick={onReset}
        className="w-40 mx-auto mt-4 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white transition-all"
      >
        <RefreshCw size={16} className="mr-2" />
        Strip more
      </Button>
    </div>
  );
}