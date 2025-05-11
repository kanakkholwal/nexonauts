'use client';

import { Card } from '@/components/ui/card';
import { Upload } from 'lucide-react';
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

  const dragenter = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragover(true);
  };

  const dragleave = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragover(false);
  };

  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    // prevent from opening files in new tab
    e.preventDefault();
    setIsDragover(false);
    
    if (!fileInputRef.current || !e.dataTransfer?.files) return;
    
    // Create a new DataTransfer object
    const dataTransfer = new DataTransfer();
    
    // Add all files from the drop event
    for (const file of e.dataTransfer.files) {
      dataTransfer.items.add(file);
    }

    // Set the files property on the input element
    fileInputRef.current.files = dataTransfer.files;

    onChange();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card 
      className={`flex justify-center items-center h-20 transition-all duration-300 ${
        isDragover 
          ? 'bg-blue-900 text-white scale-105' 
          : 'bg-white hover:bg-blue-50'
      }`}
      onDragOver={e => e.preventDefault()}
      onDragEnter={dragenter}
      onDragLeave={dragleave}
      onDrop={drop}
    >
      <div className="flex items-center gap-2">
        <Upload size={20} />
        <span>
          Drag&apos;n drop or <button 
            type="button"
            className="font-bold hover:underline focus:outline-none" 
            onClick={handleClick}
          >
            select
          </button> PDF-files here
        </span>
        <input
          type="file"
          className="hidden"
          accept="application/pdf,.pdf"
          multiple
          onChange={onChange}
          ref={fileInputRef}
        />
      </div>
    </Card>
  );
}