"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Download,
  Image as ImageIcon,
  Loader2,
  RefreshCw,
  Trash2,
  Upload,
  XCircle
} from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

// --- Types ---
interface ProcessedImage {
  id: number;
  originalPreview: string; // The original blob for preview
  convertedUrl: string;    // The webp blob
  name: string;
  originalSize: number;
  processing: boolean;
  failed: boolean;
}

// --- Helpers ---
function formatFileSize(sizeInBytes: number): string {
  const KB = 1024;
  const MB = KB * 1024;
  if (sizeInBytes >= MB) {
    return `${(sizeInBytes / MB).toFixed(2)} MB`;
  }
  return `${(sizeInBytes / KB).toFixed(2)} KB`;
}

const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const rawImage = new window.Image();
    rawImage.onload = () => resolve(rawImage);
    rawImage.onerror = reject;
    rawImage.src = url;
  });
};

const convertToWebp = (image: HTMLImageElement): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Failed to get canvas context"));
      return;
    }

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) {
        resolve(URL.createObjectURL(blob));
      } else {
        reject(new Error("Failed to create blob"));
      }
    }, "image/webp", 0.8); // Quality 0.8 is standard for WebP
  });
};

export default function Image2Webp() {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- Logic ---
  const processFile = async (file: File) => {
    const originalUrl = URL.createObjectURL(file);
    const id = file.lastModified + Math.random();

    // Add placeholder to state
    setImages((prev) => [
      ...prev,
      {
        id,
        originalPreview: originalUrl,
        convertedUrl: "",
        name: file.name.split('.')[0], // remove extension
        originalSize: file.size,
        processing: true,
        failed: false,
      },
    ]);

    try {
      const imgElement = await loadImage(originalUrl);
      const webpUrl = await convertToWebp(imgElement);

      // Update state with success
      setImages((prev) =>
        prev.map((img) =>
          img.id === id
            ? { ...img, convertedUrl: webpUrl, processing: false }
            : img
        )
      );
    } catch (error) {
      console.error("Conversion failed", error);
      setImages((prev) =>
        prev.map((img) =>
          img.id === id ? { ...img, processing: false, failed: true } : img
        )
      );
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsProcessing(true);
    // Process sequentially to not freeze the UI on heavy loads
    for (const file of acceptedFiles) {
      await processFile(file);
    }
    setIsProcessing(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.bmp', '.gif']
    }
  });

  const clearAll = () => {
    // Revoke object URLs to avoid memory leaks
    images.forEach(img => {
      URL.revokeObjectURL(img.originalPreview);
      if (img.convertedUrl) URL.revokeObjectURL(img.convertedUrl);
    });
    setImages([]);
  };

  const removeImage = (id: number) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* --- Header --- */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-2xl mb-2">
            <ImageIcon className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Image to WebP Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert PNG, JPG, and other image formats to highly optimized WebP files instantly.
          </p>
        </div>

        {/* --- Dropzone --- */}
        <div
          {...getRootProps()}
          className={`
            relative group cursor-pointer
            flex flex-col items-center justify-center
            h-64 w-full rounded-2xl
            border-2 border-dashed transition-all duration-300 ease-in-out
            ${isDragActive
              ? 'border-primary bg-primary/5 ring-4 ring-primary/10 scale-[1.01]'
              : 'border-muted-foreground/25 bg-card hover:border-primary/50 hover:bg-muted/50'
            }
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4 text-center p-6">
            <div className={`
              p-4 rounded-full transition-colors duration-300
              ${isDragActive ? 'bg-background text-primary shadow-lg' : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'}
            `}>
              <Upload size={32} />
            </div>

            <div className="space-y-1">
              <p className="text-lg font-semibold text-foreground">
                {isDragActive ? 'Drop images here' : 'Click or drag images here'}
              </p>
              <p className="text-sm text-muted-foreground">
                Supports JPG, PNG, BMP, GIF
              </p>
            </div>
          </div>
        </div>

        {/* --- Actions Bar --- */}
        {images.length > 0 && (
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              Converted Images
              <Badge variant="secondary" className="rounded-full px-2.5">
                {images.length}
              </Badge>
            </h2>
            <Button variant="ghost" size="sm" onClick={clearAll} className="text-destructive hover:text-destructive hover:bg-destructive/10">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        )}

        {/* --- Gallery Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((img) => (
            <Card key={img.id} className="group overflow-hidden border-border/50 bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">

              {/* Image Preview Area */}
              <div className="relative aspect-video bg-muted/50 overflow-hidden border-b border-border/50">
                <Image
                  src={img.originalPreview}
                  alt={img.name}
                  fill
                  className={`object-cover transition-transform duration-500 group-hover:scale-105 ${img.processing ? 'opacity-50 blur-sm' : ''}`}
                />

                {/* Overlay Button for Quick Remove */}
                <button
                  onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
                  title="Remove image"
                >
                  <XCircle size={16} />
                </button>

                {/* Status Overlay */}
                {img.processing && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="bg-background/80 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-sm border border-border">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      <span className="text-xs font-medium">Converting...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-4 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 min-w-0">
                    <h3 className="font-medium text-sm truncate" title={img.name}>
                      {img.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Original: {formatFileSize(img.originalSize)}
                    </p>
                  </div>
                  <Badge variant={img.processing ? "outline" : img.failed ? "destructive" : "default"}>
                    {img.processing ? "..." : img.failed ? "Failed" : "WebP"}
                  </Badge>
                </div>

                <Button
                  className="w-full relative overflow-hidden"
                  disabled={img.processing || img.failed}
                  variant={img.failed ? "secondary" : "default"}
                  asChild={!img.processing && !img.failed}
                >
                  {img.processing ? (
                    <span>Processing</span>
                  ) : img.failed ? (
                    <span>Error</span>
                  ) : (
                    <a
                      href={img.convertedUrl}
                      download={`${img.name}.webp`}
                      className="flex items-center justify-center gap-2"
                    >
                      <Download size={16} />
                      Download
                    </a>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* --- Footer Note --- */}
        <div className="text-center pt-8 border-t border-border/50">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-2 opacity-70">
            <RefreshCw size={12} />
            All conversions happen locally in your browser. Your images are never uploaded to a server.
          </p>
        </div>

      </div>
    </div>
  );
}