"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRightLeft,
  Check,
  Code2,
  Copy,
  FileCode,
  RefreshCcw,
  Trash2
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function HtmlParser() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode"); // encode = escape, decode = unescape
  const [copied, setCopied] = useState(false);

  // --- Logic ---
  const handleProcess = () => {
    if (!input) {
      setOutput("");
      return;
    }

    if (mode === "encode") {
      // Escape HTML entities
      const escaped = input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
      setOutput(escaped);
    } else {
      // Unescape HTML entities (Basic common set)
      const unescaped = input
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&amp;/g, "&");
      setOutput(unescaped);
    }
  };

  // Auto-process when input or mode changes
  useEffect(() => {
    handleProcess();
  }, [input, mode]);

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
  };

  return (
    <div className="min-h-screen w-full relative pb-20">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 pt-8 space-y-8">

        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Code2 className="w-8 h-8 text-primary" />
              HTML Entity Encoder
            </h1>
            <p className="text-muted-foreground">
              Escape characters for safe display in code blocks, or decode them back to raw HTML.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-card border border-border/50 p-1 rounded-lg flex items-center shadow-sm">
              <Button
                variant={mode === "encode" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setMode("encode")}
                className="text-xs h-8"
              >
                Encode
              </Button>
              <Button
                variant={mode === "decode" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setMode("decode")}
                className="text-xs h-8"
              >
                Decode
              </Button>
            </div>

            <Button
              variant="outline"
              onClick={handleClear}
              disabled={!input}
              className="text-muted-foreground hover:text-destructive hover:border-destructive/50 h-10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>

        {/* --- Editor Grid --- */}
        <div className="grid lg:grid-cols-2 gap-6 h-[70vh] min-h-[600px]">

          {/* Input Panel */}
          <div className="flex flex-col h-full rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-xl overflow-hidden focus-within:ring-2 ring-primary/20 transition-all">
            <div className="h-12 border-b border-border/50 bg-muted/30 px-4 flex items-center justify-between">
              <Label className="font-semibold text-muted-foreground flex items-center gap-2">
                <FileCode className="w-4 h-4" />
                {mode === "encode" ? "Raw HTML Input" : "Escaped String Input"}
              </Label>
              {/* Visual Dots */}
              <div className="flex gap-1.5 opacity-50">
                <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
              </div>
            </div>

            <div className="flex-1 relative group">
              <Textarea
                className="absolute inset-0 w-full h-full resize-none rounded-none border-0 bg-transparent p-4 font-mono text-sm leading-relaxed focus-visible:ring-0 custom-scrollbar"
                placeholder={mode === "encode" ? "Paste your <div> code here..." : "Paste your &lt;div&gt; code here..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                spellCheck={false}
              />
            </div>
          </div>

          {/* Output Panel */}
          <div className="flex flex-col h-full rounded-xl border border-border/50 bg-[#1e1e1e] shadow-2xl overflow-hidden relative">
            <div className="h-12 border-b border-white/10 bg-white/5 px-4 flex items-center justify-between">
              <Label className="font-semibold text-gray-400 flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4" />
                {mode === "encode" ? "Escaped Output" : "Raw HTML Output"}
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
                    <RefreshCcw className="w-8 h-8 opacity-50" />
                  </div>
                  <p className="text-sm font-mono">Result will appear here</p>
                </div>
              ) : (
                <Textarea
                  readOnly
                  className="absolute inset-0 w-full h-full resize-none rounded-none border-0 bg-transparent p-4 font-mono text-sm leading-relaxed text-blue-100 focus-visible:ring-0 custom-scrollbar selection:bg-blue-500/30"
                  value={output}
                />
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}