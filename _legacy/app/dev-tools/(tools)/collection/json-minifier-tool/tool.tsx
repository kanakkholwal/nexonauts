"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  ArrowRightLeft,
  Braces,
  Check,
  Copy,
  FileJson,
  Maximize2,
  Minimize2,
  Trash2,
  Wand2
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function JsonMinifierPrettifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"minify" | "prettify" | null>(null);
  const [copied, setCopied] = useState(false);

  // Stats
  const inputSize = new Blob([input]).size;
  const outputSize = new Blob([output]).size;
  const savings = inputSize > 0 ? ((inputSize - outputSize) / inputSize * 100).toFixed(2) : 0;

  const handleMinify = () => {
    if (!input.trim()) return;
    setError(null);
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setMode("minify");
      toast.success("JSON Minified successfully!");
    } catch (err: any) {
      setError(err.message);
      toast.error("Invalid JSON format");
    }
  };

  const handleBeautify = () => {
    if (!input.trim()) return;
    setError(null);
    try {
      const parsed = JSON.parse(input);
      const beautified = JSON.stringify(parsed, null, 2); // 2 spaces indent
      setOutput(beautified);
      setMode("prettify");
      toast.success("JSON Beautified successfully!");
    } catch (err: any) {
      setError(err.message);
      toast.error("Invalid JSON format");
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
    setError(null);
    setMode(null);
  };

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
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-yellow-500/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-green-500/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 pt-8 space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Braces className="w-8 h-8 text-primary" />
              JSON Minifier & Beautifier
            </h1>
            <p className="text-muted-foreground">
              Validate, format, and minify your JSON data with 100% accuracy.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={handleClear}
            disabled={!input}
            className="text-muted-foreground hover:text-destructive hover:border-destructive/50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Workspace
          </Button>
        </div>

        {/* --- Editor Area --- */}
        <div className="grid lg:grid-cols-2 gap-6 h-[70vh] min-h-[600px]">

          {/* Input Panel */}
          <div className="flex flex-col h-full rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-xl overflow-hidden">
            <div className="h-12 border-b border-border/50 bg-muted/30 px-4 flex items-center justify-between">
              <Label className="font-semibold text-muted-foreground flex items-center gap-2">
                <FileJson className="w-4 h-4" />
                Input JSON
                <Badge variant="outline" className="text-[10px] h-5 font-mono ml-2">
                  {formatBytes(inputSize)}
                </Badge>
              </Label>
              {/* Visual Decorative Dots */}
              <div className="flex gap-1.5 opacity-50">
                <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
              </div>
            </div>

            <div className="flex-1 relative group">
              <Textarea
                className="absolute inset-0 w-full h-full resize-none rounded-none border-0 bg-transparent p-4 font-mono text-sm leading-relaxed focus-visible:ring-0 custom-scrollbar"
                placeholder="{ 'Paste your JSON here': ... }"
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
                onClick={handleBeautify}
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
                {error ? 'Error' : mode === 'minify' ? 'Minified JSON' : mode === 'prettify' ? 'Beautified JSON' : 'Output'}
                {output && !error && (
                  <Badge variant="secondary" className="text-[10px] h-5 font-mono bg-white/10 text-white hover:bg-white/20 ml-2">
                    {formatBytes(outputSize)}
                  </Badge>
                )}
              </Label>

              {output && !error && (
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
              {error ? (
                <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-red-400 bg-red-950/10">
                  <AlertCircle className="w-12 h-12 mb-4 opacity-80" />
                  <h3 className="font-bold mb-2">Invalid JSON</h3>
                  <p className="text-center text-sm font-mono opacity-80 break-all max-w-md">
                    {error}
                  </p>
                </div>
              ) : !output ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 gap-4">
                  <div className="p-4 rounded-full bg-white/5">
                    <Wand2 className="w-8 h-8 opacity-50" />
                  </div>
                  <p className="text-sm">Processed JSON will appear here</p>
                </div>
              ) : (
                <Textarea
                  readOnly
                  className="absolute inset-0 w-full h-full resize-none rounded-none border-0 bg-transparent p-4 font-mono text-sm leading-relaxed text-blue-100 focus-visible:ring-0 custom-scrollbar selection:bg-blue-500/30"
                  value={output}
                />
              )}
            </div>

            {/* Stats Footer */}
            {output && !error && mode === 'minify' && (
              <div className="h-10 border-t border-white/10 bg-white/5 px-4 flex items-center justify-end text-xs font-mono text-gray-400 gap-4 animate-in slide-in-from-bottom-2">
                <span className="flex items-center gap-1.5">
                  Original: <span className="text-gray-300">{formatBytes(inputSize)}</span>
                </span>
                <ArrowRightLeft className="w-3 h-3 opacity-50" />
                <span className="flex items-center gap-1.5">
                  Result: <span className="text-green-400">{formatBytes(outputSize)}</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/30 font-bold">
                  -{Number(savings).toFixed(1)}%
                </span>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}