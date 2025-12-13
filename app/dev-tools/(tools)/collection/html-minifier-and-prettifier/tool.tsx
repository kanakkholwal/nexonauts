"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRightLeft,
  Check,
  Copy,
  FileCode2,
  Maximize2,
  Minimize2,
  Trash2,
  Wand2
} from "lucide-react";
import pretty from "pretty";
import { useState } from "react";
import { toast } from "sonner";

export default function HtmlMinifierPrettifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"minify" | "prettify" | null>(null);
  const [copied, setCopied] = useState(false);

  // Stats calculation
  const inputSize = new Blob([input]).size;
  const outputSize = new Blob([output]).size;
  const savings = inputSize > 0 ? ((inputSize - outputSize) / inputSize * 100).toFixed(2) : 0;

  const handleMinify = () => {
    if (!input.trim()) return;
    try {
      const minified = input
        .replace(/\n/g, "")
        .replace(/[\t ]+\</g, "<")
        .replace(/\>[\t ]+\</g, "><")
        .replace(/\>[\t ]+$/g, ">")
        .replace(`//g`, ""); // Basic regex minifier (consider a library for production robustness)

      setOutput(minified);
      setMode("minify");
      toast.success("HTML Minified successfully!");
    } catch (error) {
      toast.error("Invalid HTML format.");
    }
  };

  const handlePrettify = () => {
    if (!input.trim()) return;
    try {
      const beautified = pretty(input, { ocd: true });
      setOutput(beautified);
      setMode("prettify");
      toast.success("HTML Beautified successfully!");
    } catch (error) {
      toast.error("Invalid HTML format.");
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setMode(null);
  };

  // Helper for file size format
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="min-h-screen w-full relative pb-20">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[20%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 pt-8 space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <FileCode2 className="w-8 h-8 text-primary" />
              HTML Minifier & Beautifier
            </h1>
            <p className="text-muted-foreground">
              Optimize your HTML code by reducing its size or formatting it for readability.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={!input}
              className="text-muted-foreground hover:text-destructive hover:border-destructive/50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        {/* --- Editor Area --- */}
        <div className="grid lg:grid-cols-2 gap-6 h-[70vh] min-h-[600px]">

          {/* Input Panel */}
          <div className="flex flex-col h-full rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-xl overflow-hidden">
            <div className="h-12 border-b border-border/50 bg-muted/30 px-4 flex items-center justify-between">
              <Label className="font-semibold text-muted-foreground flex items-center gap-2">
                Input Code
                <Badge variant="outline" className="text-[10px] h-5 font-mono">
                  {formatBytes(inputSize)}
                </Badge>
              </Label>
              {/* Visual Decorative Dots */}
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
              </div>
            </div>

            <div className="flex-1 relative group">
              <Textarea
                className="absolute inset-0 w-full h-full resize-none rounded-none border-0 bg-transparent p-4 font-mono text-sm leading-relaxed focus-visible:ring-0 custom-scrollbar"
                placeholder=""
                value={input}
                onChange={(e) => setInput(e.target.value)}
                spellCheck={false}
              />
            </div>

            {/* Action Toolbar */}
            <div className="p-4 border-t border-border/50 bg-muted/10 flex gap-3">
              <Button
                onClick={handleMinify}
                className="flex-1 gap-2 shadow-lg shadow-primary/10"
                disabled={!input}
              >
                <Minimize2 className="w-4 h-4" />
                Minify
              </Button>
              <Button
                variant="secondary"
                onClick={handlePrettify}
                className="flex-1 gap-2"
                disabled={!input}
              >
                <Maximize2 className="w-4 h-4" />
                Beautify
              </Button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="flex flex-col h-full rounded-xl border border-border/50 bg-[#1e1e1e] shadow-2xl overflow-hidden relative">
            <div className="h-12 border-b border-white/10 bg-white/5 px-4 flex items-center justify-between">
              <Label className="font-semibold text-gray-400 flex items-center gap-2">
                Output Result
                {output && (
                  <Badge variant="secondary" className="text-[10px] h-5 font-mono bg-white/10 text-white hover:bg-white/20">
                    {formatBytes(outputSize)}
                  </Badge>
                )}
              </Label>

              {output && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCopy}
                  className="h-8 text-xs text-gray-400 hover:text-white hover:bg-white/10 gap-2"
                >
                  {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              )}
            </div>

            <div className="flex-1 relative">
              {!output ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 gap-4">
                  <div className="p-4 rounded-full bg-white/5">
                    <Wand2 className="w-8 h-8 opacity-50" />
                  </div>
                  <p className="text-sm">Result will appear here</p>
                </div>
              ) : (
                <Textarea
                  readOnly
                  className="absolute inset-0 w-full h-full resize-none rounded-none border-0 bg-transparent p-4 font-mono text-sm leading-relaxed text-gray-300 focus-visible:ring-0 custom-scrollbar   30"
                  value={output}
                />
              )}
            </div>

            {/* Stats Footer */}
            {output && mode === 'minify' && (
              <div className="h-10 border-t border-white/10 bg-white/5 px-4 flex items-center justify-end text-xs font-mono text-gray-400 gap-4">
                <span className="flex items-center gap-1.5">
                  Original: <span className="text-gray-300">{formatBytes(inputSize)}</span>
                </span>
                <ArrowRightLeft className="w-3 h-3 opacity-50" />
                <span className="flex items-center gap-1.5">
                  Minified: <span className="text-green-400">{formatBytes(outputSize)}</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/30">
                  -{Number(savings).toFixed(1)}% Saved
                </span>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}