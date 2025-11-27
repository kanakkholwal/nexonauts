"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Check,
  Copy,
  Globe,
  ImageIcon,
  LayoutTemplate,
  RefreshCcw,
  Search,
  Share2,
  Twitter
} from "lucide-react";
import { useCallback, useState } from "react";
import ShikiBlock from "src/components/shiki-block/shiki-block"; // Ensure path is correct

// --- Types & Defaults ---
const defaultData = {
  google: {
    title: "Meta Tag Generator Tool",
    description: "Meta tags are used by search engines to help index and to provide relevant content in their Google search results worldwide",
    image: "https://kkupgrader.github.io/tools/meta-tag-generator/meta-tag-generator.svg",
  },
  og: {
    title: "Meta Tag Generator Tool",
    description: "Meta tags are used by search engines to help index and to provide relevant content in their Google search results worldwide.",
    image: "https://kkupgrader.github.io/tools/meta-tag-generator/meta-tag-generator.svg",
    url: "https://kkupgrader.eu.org/",
    siteName: "K K UPGRADER",
    locale: "en_US",
  },
  twitter: {
    title: "Meta Tag Generator Tool",
    description: "Meta tags are used by search engines to help index and to provide relevant content in their Google search results worldwide.",
    image: "https://kkupgrader.github.io/tools/meta-tag-generator/meta-tag-generator.svg",
  },
};

export default function MetaTagGenerator() {
  const [activeTab, setActiveTab] = useState("google");
  const [copied, setCopied] = useState(false);

  // State
  const [google, setGoogle] = useState(defaultData.google);
  const [og, setOg] = useState(defaultData.og);
  const [twitter, setTwitter] = useState(defaultData.twitter);

  // Helper to update state
  const updateGoogle = (field: string, value: string) => setGoogle(p => ({ ...p, [field]: value }));
  const updateOg = (field: string, value: string) => setOg(p => ({ ...p, [field]: value }));
  const updateTwitter = (field: string, value: string) => setTwitter(p => ({ ...p, [field]: value }));

  // Generate Code
  const getCode = useCallback(() => {
    return `<meta charset="utf-8" />
<title>${google.title}</title>
<meta name="description" content="${google.description}" />
<meta name="image" content="${google.image}" />

<meta itemprop="name" content="${google.title}" />
<meta itemprop="description" content="${google.description}" />
<meta itemprop="image" content="${google.image}" />

<meta property="og:title" content="${og.title}" />
<meta property="og:description" content="${og.description}" />
<meta property="og:image" content="${og.image}" />
<meta property="og:url" content="${og.url}" />
<meta property="og:site_name" content="${og.siteName}" />
<meta property="og:locale" content="${og.locale}" />
<meta property="og:type" content="website" />

<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:title" content="${twitter.title}" />
<meta property="twitter:description" content="${twitter.description}" />
<meta property="twitter:image:src" content="${twitter.image}" />`;
  }, [google, og, twitter]);

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetAll = () => {
    setGoogle(defaultData.google);
    setOg(defaultData.og);
    setTwitter(defaultData.twitter);
  };

  return (
    <div className="min-h-screen w-full relative pb-20">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 pt-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Meta Tag Generator</h1>
            <p className="text-muted-foreground">
              Create SEO-friendly meta tags for Google, Facebook, and Twitter.
            </p>
          </div>
          <Button variant="outline" onClick={resetAll} size="sm" className="gap-2">
            <RefreshCcw className="w-4 h-4" /> Reset to Defaults
          </Button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* --- LEFT COLUMN: Inputs --- */}
          <div className="lg:col-span-7 space-y-6">
            <Tabs defaultValue="google" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="mb-6 overflow-x-auto pb-2 scrollbar-hide">
                <TabsList className="w-full justify-start h-auto bg-transparent p-0 gap-2">
                  <TabButton value="google" icon={Search} label="Google / SEO" active={activeTab} />
                  <TabButton value="og" icon={Share2} label="Social (OG)" active={activeTab} />
                  <TabButton value="twitter" icon={Twitter} label="Twitter" active={activeTab} />
                </TabsList>
              </div>

              <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
                <CardContent className="p-6">

                  {/* GOOGLE FORM */}
                  <TabsContent value="google" className="mt-0 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 border-b border-border/40 pb-2 mb-4">
                        <Globe className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold text-lg">Search Engine Optimization</h3>
                      </div>

                      <SeoInput
                        label="Page Title"
                        value={google.title}
                        onChange={(v) => updateGoogle('title', v)}
                        limit={60}
                        tip="Displays in browser tabs and search results."
                      />

                      <SeoTextarea
                        label="Meta Description"
                        value={google.description}
                        onChange={(v) => updateGoogle('description', v)}
                        limit={160}
                        tip="A brief summary of the page content."
                      />

                      <div className="space-y-2">
                        <Label>Site Image URL</Label>
                        <div className="relative">
                          <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            className="pl-9"
                            value={google.image}
                            onChange={(e) => updateGoogle('image', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* OG FORM */}
                  <TabsContent value="og" className="mt-0 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 border-b border-border/40 pb-2 mb-4">
                        <LayoutTemplate className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold text-lg">Open Graph (Facebook / LinkedIn)</h3>
                      </div>

                      <SeoInput
                        label="OG Title"
                        value={og.title}
                        onChange={(v) => updateOg('title', v)}
                        limit={60}
                      />

                      <SeoTextarea
                        label="OG Description"
                        value={og.description}
                        onChange={(v) => updateOg('description', v)}
                        limit={68}
                        tip="Facebook recommends shorter descriptions."
                      />

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Site Name</Label>
                          <Input value={og.siteName} onChange={(e) => updateOg('siteName', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label>Locale</Label>
                          <Input value={og.locale} onChange={(e) => updateOg('locale', e.target.value)} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Canonical URL</Label>
                        <Input value={og.url} onChange={(e) => updateOg('url', e.target.value)} />
                      </div>

                      <div className="space-y-2">
                        <Label>OG Image URL</Label>
                        <div className="relative">
                          <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            className="pl-9"
                            value={og.image}
                            onChange={(e) => updateOg('image', e.target.value)}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">Recommended: 1200x630px</p>
                      </div>
                    </div>
                  </TabsContent>

                  {/* TWITTER FORM */}
                  <TabsContent value="twitter" className="mt-0 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 border-b border-border/40 pb-2 mb-4">
                        <Twitter className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold text-lg">Twitter Card</h3>
                      </div>

                      <SeoInput
                        label="Twitter Title"
                        value={twitter.title}
                        onChange={(v) => updateTwitter('title', v)}
                        limit={60}
                      />

                      <SeoTextarea
                        label="Twitter Description"
                        value={twitter.description}
                        onChange={(v) => updateTwitter('description', v)}
                        limit={120}
                      />

                      <div className="space-y-2">
                        <Label>Twitter Image URL</Label>
                        <div className="relative">
                          <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            className="pl-9"
                            value={twitter.image}
                            onChange={(e) => updateTwitter('image', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                </CardContent>
              </Card>
            </Tabs>
          </div>

          {/* --- RIGHT COLUMN: Live Preview & Code --- */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">

            {/* Live Visual Preview */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Live Preview
              </h3>

              <div className="p-1 rounded-xl bg-muted/20 border border-border/50">
                {activeTab === 'google' && (
                  <GooglePreview title={google.title} desc={google.description} url={og.url} />
                )}
                {activeTab === 'og' && (
                  <SocialPreview title={og.title} desc={og.description} image={og.image} site={og.siteName.toUpperCase()} />
                )}
                {activeTab === 'twitter' && (
                  <TwitterPreview title={twitter.title} desc={twitter.description} image={twitter.image} url={og.url} />
                )}
              </div>

            </div>



          </div>
          {/* Code Output */}
          <div className="space-y-2 lg:col-span-12">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Generated HTML
              </h3>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopy}
                className="gap-2 h-8 text-xs bg-background/50 hover:bg-background"
              >
                {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="relative rounded-xl border border-border/50 overflow-hidden shadow-2xl bg-[#1e1e1e]">
              <div className="pt-4 overflow-x-auto max-h-[400px] overflow-y-auto custom-scrollbar">
                <ShikiBlock lang="html" code={getCode()} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SUB COMPONENTS ---

// 1. Inputs with visual character counters
const SeoInput = ({ label, value, onChange, limit, tip }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  limit: number;
  tip?: string;
}) => {
  const remaining = limit - value.length;
  const percentage = (value.length / limit) * 100;
  const color = percentage > 100 ? "bg-red-500" : percentage > 80 ? "bg-yellow-500" : "bg-green-500";

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        <span className={`text-xs ${remaining < 0 ? 'text-red-500 font-bold' : 'text-muted-foreground'}`}>
          {value.length} / {limit}
        </span>
      </div>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
      <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
        <div className={`h-full transition-all duration-300 ${color}`} style={{ width: `${Math.min(percentage, 100)}%` }} />
      </div>
      {tip && <p className="text-[10px] text-muted-foreground">{tip}</p>}
    </div>
  );
}

const SeoTextarea = ({ label, value, onChange, limit, tip }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  limit: number;
  tip?: string;
}) => {
  const remaining = limit - value.length;
  const percentage = (value.length / limit) * 100;
  const color = percentage > 100 ? "bg-red-500" : percentage > 80 ? "bg-yellow-500" : "bg-green-500";

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        <span className={`text-xs ${remaining < 0 ? 'text-red-500 font-bold' : 'text-muted-foreground'}`}>
          {value.length} / {limit}
        </span>
      </div>
      <Textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} />
      <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
        <div className={`h-full transition-all duration-300 ${color}`} style={{ width: `${Math.min(percentage, 100)}%` }} />
      </div>
      {tip && <p className="text-[10px] text-muted-foreground">{tip}</p>}
    </div>
  );
}

// 2. Tab Button
const TabButton = ({ value, icon: Icon, label, active }: any) => (
  <TabsTrigger
    value={value}
    className={`
      flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-200
      data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary data-[state=active]:shadow-md
      data-[state=inactive]:bg-background data-[state=inactive]:hover:bg-muted data-[state=inactive]:border-border
    `}
  >
    <Icon className="w-4 h-4" />
    {label}
  </TabsTrigger>
);

// 3. Previews
const GooglePreview = ({ title, desc, url }: any) => (
  <div className="bg-white dark:bg-black p-4 rounded-lg shadow-sm border border-border/20 font-sans">
    <div className="flex items-center gap-2 mb-1">
      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px]">G</div>
      <div className="flex flex-col">
        <span className="text-xs text-foreground font-medium">Domain Name</span>
        <span className="text-[10px] text-muted-foreground">{url || "https://example.com"}</span>
      </div>
    </div>
    <div className="text-[#1a0dab] dark:text-[#8ab4f8] text-xl font-medium cursor-pointer hover:underline truncate">
      {title || "Page Title"}
    </div>
    <div className="text-sm text-[#4d5156] dark:text-[#bdc1c6] mt-1 line-clamp-2">
      {desc || "Meta description will appear here..."}
    </div>
  </div>
);

const SocialPreview = ({ title, desc, image, site }: any) => (
  <div className="bg-muted/10 rounded-lg overflow-hidden border border-border/50">
    <div
      className="w-full aspect-[1.91/1] bg-gray-200 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${image})` }}
    >
      {!image && <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs">No Image</div>}
    </div>
    <div className="p-3 bg-card border-t border-border/10">
      <div className="text-xs text-muted-foreground uppercase mb-1">{site || "SITE.COM"}</div>
      <div className="font-bold text-foreground leading-tight mb-1 line-clamp-1">{title}</div>
      <div className="text-xs text-muted-foreground line-clamp-1">{desc}</div>
    </div>
  </div>
);

const TwitterPreview = ({ title, desc, image, url }: any) => (
  <div className="bg-card rounded-xl overflow-hidden border border-border/50 max-w-[400px] mx-auto">
    <div
      className="w-full aspect-[1.91/1] bg-gray-200 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${image})` }}
    >
      {!image && <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs">No Image</div>}
    </div>
    <div className="p-3">
      <div className="text-sm font-bold text-foreground mb-1">{title}</div>
      <div className="text-xs text-muted-foreground mb-2 line-clamp-2">{desc}</div>
      <div className="text-xs text-muted-foreground flex items-center gap-1">
        <span className="opacity-70">🔗</span> {url || "example.com"}
      </div>
    </div>
  </div>
);