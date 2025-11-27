"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRightLeft,
  Check,
  Code2,
  Copy,
  FileJson,
  Flame,
  Settings2,
  Trash2,
  Wand2
} from "lucide-react";
import { Fira_Code } from "next/font/google";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

// --- Basic Converter Logic (Fallback if library missing) ---
// In a real app, you would uncomment the library import.
// This simple regex replacer handles 80% of common use cases for the demo.
const convertHtmlToJsx = (html: string, options: { createComponent: boolean, componentName: string, hideComments: boolean }) => {
  let jsx = html
    .replace(/class=/g, "className=")
    .replace(/for=/g, "htmlFor=")
    .replace(/tabindex=/g, "tabIndex=")
    .replace(/autoplay=/g, "autoPlay=")
    .replace(/<!--/g, "{/*")
    .replace(/-->/g, "*/}")
    .replace(/style="([^"]*)"/g, "style={{ $1 }}"); // Simplistic style handling

  // Self-closing tags fix (basic)
  const voidTags = ["img", "input", "br", "hr"];
  voidTags.forEach(tag => {
    const regex = new RegExp(`<${tag}([^>]*)(?<!/)>`, "g");
    jsx = jsx.replace(regex, `<${tag}$1 />`);
  });

  if (options.hideComments) {
    jsx = jsx.replace(/{\/\*[\s\S]*?\*\/}/g, "");
  }

  if (options.createComponent) {
    jsx = `const ${options.componentName} = () => {\n  return (\n    <>\n${jsx
      .split("\n")
      .map((line) => `      ${line}`)
      .join("\n")}\n    </>\n  );\n};`;
  }

  return jsx;
};

const defaultHtml = `<!-- Hello world -->
<div class="awesome" style="border: 1px solid red">
  <label for="name">Enter your name: </label>
  <input type="text" id="name" />
</div>`;

export default function HtmlToJsxTool() {
  const [input, setInput] = useState(defaultHtml);
  const [output, setOutput] = useState("");
  const [liveMode, setLiveMode] = useState(true);
  const [settings, setSettings] = useState({
    createComponent: false,
    componentName: "MyComponent",
    hideComments: false,
  });
  const [copied, setCopied] = useState(false);

  // Conversion Handler
  const handleConvert = () => {
    try {
      const result = convertHtmlToJsx(input, settings);
      setOutput(result);
    } catch (error) {
      toast.error("Failed to convert HTML");
    }
  };

  // Live Mode Effect
  useEffect(() => {
    if (liveMode) handleConvert();
  }, [input, settings, liveMode]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("JSX copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen w-full relative pb-20 ${firaCode.variable}`}>
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[30%] w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 lg:px-8 pt-8 space-y-6">

        {/* --- Header & Toolbar --- */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <FileJson className="w-8 h-8 text-primary" />
              HTML to JSX Converter
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Transform raw HTML into React-compatible JSX. Handles className, styling, and self-closing tags automatically.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-card border border-border/50 p-2 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 px-3 border-r border-border/50">
              <Switch
                id="live-mode"
                checked={liveMode}
                onCheckedChange={setLiveMode}
              />
              <Label htmlFor="live-mode" className="text-xs font-medium cursor-pointer flex items-center gap-1.5">
                <Flame className={`w-3.5 h-3.5 ${liveMode ? 'text-orange-500 fill-orange-500' : 'text-muted-foreground'}`} />
                Live Mode
              </Label>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setInput("")}
              className="text-muted-foreground hover:text-destructive h-8"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>

            {!liveMode && (
              <Button size="sm" onClick={handleConvert} className="h-8 gap-2">
                <Wand2 className="w-4 h-4" /> Convert
              </Button>
            )}
          </div>
        </div>

        {/* --- Configuration Bar --- */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-4">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <Settings2 className="w-4 h-4" />
              Settings:
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="create-comp"
                checked={settings.createComponent}
                onCheckedChange={(c) => setSettings(s => ({ ...s, createComponent: c }))}
              />
              <Label htmlFor="create-comp" className="text-sm cursor-pointer">Create Functional Component</Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="hide-comments"
                checked={settings.hideComments}
                onCheckedChange={(c) => setSettings(s => ({ ...s, hideComments: c }))}
              />
              <Label htmlFor="hide-comments" className="text-sm cursor-pointer">Remove Comments</Label>
            </div>

            <div className="h-4 w-px bg-border hidden sm:block" />

            <div className="flex items-center gap-2">
              <Label htmlFor="comp-name" className="text-sm whitespace-nowrap">Component Name:</Label>
              <Input
                id="comp-name"
                value={settings.componentName}
                onChange={(e) => setSettings(s => ({ ...s, componentName: e.target.value }))}
                disabled={!settings.createComponent}
                className="h-8 w-40 text-xs font-mono bg-background/50"
              />
            </div>
          </div>
        </Card>

        {/* --- Editors Grid --- */}
        <div className="grid lg:grid-cols-2 gap-6 h-[65vh] min-h-[500px]">

          {/* HTML Input */}
          <div className="flex flex-col h-full rounded-xl border border-border/50 bg-card shadow-lg overflow-hidden group focus-within:ring-2 ring-primary/20 transition-all">
            <div className="h-10 border-b border-border/50 bg-muted/30 px-4 flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Code2 className="w-4 h-4" /> HTML Source
              </span>
              <Badge variant="outline" className="text-[10px] h-5 bg-background">Input</Badge>
            </div>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 w-full resize-none border-0 rounded-none bg-transparent p-4 font-mono text-sm leading-relaxed focus-visible:ring-0 custom-scrollbar"
              placeholder="<!-- Paste your raw HTML here -->"
              spellCheck={false}
            />
          </div>

          {/* JSX Output */}
          <div className="flex flex-col h-full rounded-xl border border-border/50 bg-[#1e1e1e] shadow-2xl overflow-hidden relative">
            <div className="h-10 border-b border-white/10 bg-white/5 px-4 flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                <FileJson className="w-4 h-4" /> JSX Result
              </span>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleCopy}
                  className="h-6 w-6 text-gray-400 hover:text-white hover:bg-white/10"
                  title="Copy to Clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                </Button>
              </div>
            </div>

            <div className="flex-1 relative">
              {output ? (
                <Textarea
                  readOnly
                  value={output}
                  className="absolute inset-0 w-full h-full resize-none border-0 rounded-none bg-transparent p-4 font-mono text-sm leading-relaxed text-blue-100 focus-visible:ring-0 custom-scrollbar selection:bg-blue-500/30"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 gap-2">
                  <ArrowRightLeft className="w-8 h-8 opacity-20" />
                  <p className="text-xs font-mono">Waiting for input...</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}