'use client';

import { Button } from '@/components/ui/button';
import { FileUp, Upload } from 'lucide-react';
import { useRef, useState } from 'react';

interface DragnDropProps {
  onFilesSelected: (files: FileList) => void;
}

export function DragnDrop({ onFilesSelected }: DragnDropProps) {
  const [isDragover, setIsDragover] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onChange = () => {
    const fileList = fileInputRef.current?.files;
    if (!fileList || fileList.length === 0) return;
    onFilesSelected(fileList);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>, isOver: boolean) => {
    e.preventDefault();
    setIsDragover(isOver);
  };

  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragover(false);
    if (!fileInputRef.current || !e.dataTransfer?.files) return;

    const dataTransfer = new DataTransfer();
    for (const file of e.dataTransfer.files) {
      if (file.type === 'application/pdf') {
        dataTransfer.items.add(file);
      }
    }

    if (dataTransfer.files.length > 0) {
      fileInputRef.current.files = dataTransfer.files;
      onChange();
    }
  };

  return (
    <div
      className={`
        relative group cursor-pointer
        flex flex-col items-center justify-center
        h-64 w-full rounded-xl
        border-2 border-dashed transition-all duration-300 ease-in-out
        ${isDragover
          ? 'border-primary bg-primary/10 ring-4 ring-primary/20'
          : 'border-muted-foreground/25 bg-muted/20 hover:bg-muted/40 hover:border-muted-foreground/50'
        }
      `}
      onDragOver={(e) => handleDrag(e, true)}
      onDragEnter={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDrop={drop}
      onClick={() => fileInputRef.current?.click()}
    >
      <div className="flex flex-col items-center gap-4 text-center p-6 relative z-10">
        <div className={`
          p-4 rounded-full transition-colors duration-300
          ${isDragover
            ? 'bg-background text-primary shadow-lg'
            : 'bg-background shadow-sm text-muted-foreground group-hover:text-foreground border border-border'
          }
        `}>
          {isDragover ? <FileUp size={32} /> : <Upload size={32} />}
        </div>

        <div className="space-y-1">
          <p className="text-lg font-semibold text-foreground">
            {isDragover ? 'Drop files here' : 'Click or drag PDF files here'}
          </p>
          <p className="text-sm text-muted-foreground">
            Supports multiple PDF files
          </p>
        </div>

        <Button variant="secondary" className="mt-4 pointer-events-none">
          Select Files
        </Button>
      </div>

      <input
        type="file"
        className="hidden"
        accept="application/pdf,.pdf"
        multiple
        onChange={onChange}
        ref={fileInputRef}
      />
    </div>
  );
}