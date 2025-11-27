"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import {
  Check,
  Copy,
  FileText,
  Globe,
  Plus,
  Search,
  Settings2,
  ShoppingBag,
  Trash2,
  User
} from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SiGooglemaps as MapPath } from "react-icons/si";
import ShikiBlock from "src/components/shiki-block/shiki-block"; // Ensure this path is correct

// --- Main Component ---
export default function SchemaGenerator() {
  const [html, setHtml] = useState("");
  const [activeTab, setActiveTab] = useState("website");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen w-full relative pb-20">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 pt-8">

        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Schema Markup Generator</h1>
          <p className="text-muted-foreground">
            Boost your SEO by generating valid JSON-LD structured data for your website.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* --- Left Column: Configuration --- */}
          <div className="lg:col-span-12 space-y-6">
            <Tabs defaultValue="website" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="mb-6 overflow-x-auto pb-2 no-scrollbar">
                <TabsList className="w-full justify-start h-auto bg-transparent p-0 gap-2">
                  <TabButton value="website" icon={Globe} label="Website" active={activeTab} />
                  <TabButton value="breadcrumbs" icon={MapPath} label="Breadcrumbs" active={activeTab} />
                  <TabButton value="person" icon={User} label="Person" active={activeTab} />
                  <TabButton value="article" icon={FileText} label="Article" active={activeTab} />
                  <TabButton value="product" icon={ShoppingBag} label="Product" active={activeTab} />
                </TabsList>
              </div>

              <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
                <CardContent className="p-6">
                  <TabsContent value="website" className="mt-0">
                    <Website setCode={setHtml} />
                  </TabsContent>
                  <TabsContent value="breadcrumbs" className="mt-0">
                    <Breadcrumbs setCode={setHtml} />
                  </TabsContent>
                  <TabsContent value="person" className="mt-0">
                    <Person setCode={setHtml} />
                  </TabsContent>
                  <TabsContent value="article" className="mt-0">
                    <Article setCode={setHtml} />
                  </TabsContent>
                  <TabsContent value="product" className="mt-0">
                    <Product setCode={setHtml} />
                  </TabsContent>
                </CardContent>
              </Card>
            </Tabs>
          </div>

          {/* --- Right Column: Preview (Sticky) --- */}
          <div className="lg:col-span-12 lg:sticky lg:top-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Settings2 className="w-4 h-4" />
                  JSON-LD Preview
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
                <div className="absolute top-0 left-0 right-0 h-10 bg-[#252526] border-b border-white/5 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="pt-10 overflow-x-auto max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
                  {/* Assuming ShikiBlock handles its own padding/bg, if not wrap it */}
                  <ShikiBlock lang="json" code={html} />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 text-sm text-muted-foreground">
                <p>
                  Using <span className="font-semibold text-foreground">React or Next.js?</span>{" "}
                  Convert this output using our{" "}
                  <Link href="/tools/html-to-jsx-convertor" className="text-primary hover:underline font-medium">
                    HTML to JSX Converter
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

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


interface Props {
  setCode: Dispatch<SetStateAction<string>>;
}

// --- 1. Website Form ---
function Website({ setCode }: Props) {
  const [name, setName] = useState("");
  const [alternateName, setAlternateName] = useState("");
  const [url, setUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [queryString, setQueryString] = useState("");

  useEffect(() => {
    setCode(`<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "${name}",
      "alternateName": "${alternateName}",
      "url": "${url}"${searchQuery.length > 0
        ? `,
      "potentialAction": {
        "@type": "SearchAction",
        "target": "${searchQuery}{search_term_string}${queryString}",
        "query-input": "required name=search_term_string"
      }`
        : ""
      }
    }
</script>`);
  }, [name, alternateName, url, searchQuery, queryString, setCode]);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="font-semibold text-lg border-b pb-2">Basic Identity</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Website Name</Label>
            <Input id="name" placeholder="e.g. Nexonauts" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="alternateName">Alternate Name</Label>
            <Input id="alternateName" placeholder="e.g. NX Tools" value={alternateName} onChange={(e) => setAlternateName(e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="url">Website URL</Label>
            <Input id="url" type="url" placeholder="https://..." value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2">
          <Search className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-lg">Sitelinks Search Box</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="searchQuery">Search Query URL</Label>
            <Input id="searchQuery" placeholder="https://example.com/search?q=" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <p className="text-[10px] text-muted-foreground">The URL that handles internal searches.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="queryString">Query String Parameter</Label>
            <Input id="queryString" placeholder="Optional suffix" value={queryString} onChange={(e) => setQueryString(e.target.value)} disabled={searchQuery === ""} />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 2. Breadcrumbs Form ---
function Breadcrumbs({ setCode }: Props) {
  const [items, setItems] = useState([{ name: "", url: "", image: "" }]);

  useEffect(() => {
    setCode(`<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [${items.map((item, index) => `
        {
          "@type": "ListItem",
          "position": ${index + 1},
          "name": "${item.name}",
          "item": "${item.url}",
          "image": "${item?.image}"
        }`).join(',')}
      ]
    }
</script>`);
  }, [items, setCode]);

  const updateItem = (index: number, field: string, value: string) => {
    const newItems: any = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-2">
        <h3 className="font-semibold text-lg">Hierarchy Items</h3>
        <Button size="sm" onClick={() => setItems([...items, { name: "", url: "", image: "" }])}>
          <Plus className="w-4 h-4 mr-1" /> Add Item
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="relative p-4 rounded-xl border border-border/60 bg-muted/20 group hover:border-primary/30 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Position #{index + 1}</span>
              {items.length > 1 && (
                <Button size="icon" variant="ghost" className="h-6 w-6 text-destructive hover:bg-destructive/10" onClick={() => removeItem(index)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input placeholder="Home" value={item.name} onChange={(e) => updateItem(index, 'name', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>URL</Label>
                <Input placeholder="https://..." value={item.url} onChange={(e) => updateItem(index, 'url', e.target.value)} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Image (Optional)</Label>
                <Input placeholder="https://..." value={item.image} onChange={(e) => updateItem(index, 'image', e.target.value)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 3. Person Form ---
function Person({ setCode }: Props) {
  // Use a state object for cleaner handling
  const [formData, setFormData] = useState({
    name: "", alternateName: "", url: "", image: "", jobTitle: "",
    worksFor: "", telephone: "", email: "", address: "", sameAs: ""
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    setCode(`<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "${formData.name}",
      "alternateName": "${formData.alternateName}",
      "url": "${formData.url}",
      "image": "${formData.image}",
      "jobTitle": "${formData.jobTitle}",
      "worksFor": "${formData.worksFor}",
      "telephone": "${formData.telephone}",
      "email": "${formData.email}",
      "address": "${formData.address}",
      "sameAs": [${formData.sameAs.split(",").map((item) => `"${item.trim()}"`)}]
    }
</script>`);
  }, [formData, setCode]);

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg border-b pb-2">Personal Information</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Name</Label>
          <Input placeholder="John Doe" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Job Title</Label>
          <Input placeholder="Software Engineer" value={formData.jobTitle} onChange={(e) => handleChange('jobTitle', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Phone</Label>
          <Input type="tel" placeholder="+1-555-..." value={formData.telephone} onChange={(e) => handleChange('telephone', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Works For</Label>
          <Input placeholder="Company Name" value={formData.worksFor} onChange={(e) => handleChange('worksFor', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Website / URL</Label>
          <Input placeholder="https://johndoe.com" value={formData.url} onChange={(e) => handleChange('url', e.target.value)} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Address</Label>
          <Input placeholder="123 Main St, City, Country" value={formData.address} onChange={(e) => handleChange('address', e.target.value)} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Social Profiles (Comma separated)</Label>
          <Input placeholder="https://twitter.com/john, https://linkedin.com/in/john" value={formData.sameAs} onChange={(e) => handleChange('sameAs', e.target.value)} />
        </div>
      </div>
    </div>
  );
}

// --- 4. Article Form ---
function Article({ setCode }: Props) {
  const [type, setType] = useState("NewsArticle"); // Fixed typo in original "NewsArticole"
  const [data, setData] = useState({
    headline: "", isAMP: false, image: "", width: "", height: "",
    author: "", publisher: "", datePublished: "", dateModified: "",
    description: "", articleBody: "", url: "", sameAs: ""
  });

  const update = (field: string, value: any) => setData(prev => ({ ...prev, [field]: value }));

  useEffect(() => {
    setCode(`<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "${type}",
      "headline": "${data.headline}",
      "image": {
          "@type": "ImageObject",
          "url": "${data.image}",
          "width": "${data.width}",
          "height": "${data.height}"
      }${data.isAMP ? `,
      "author": {
          "@type": "Person",
          "name": "${data.author}"
      },
      "publisher": "${data.publisher}",
      "datePublished": "${data.datePublished}",
      "dateModified": "${data.dateModified}",
      "description": "${data.description}",
      "articleBody": "${data.articleBody}",
      "url": "${data.url}",
      "sameAs": [${data.sameAs.split(",").map((item) => `"${item.trim()}"`)}]` : ""}
    }
</script>`);
  }, [type, data, setCode]);

  return (
    <div className="space-y-6">
      <RadioGroup defaultValue="NewsArticle" onValueChange={setType} className="grid grid-cols-2 gap-4">
        <div>
          <RadioGroupItem value="NewsArticle" id="news" className="peer sr-only" />
          <Label
            htmlFor="news"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            News Article
          </Label>
        </div>
        <div>
          <RadioGroupItem value="BlogPosting" id="blog" className="peer sr-only" />
          <Label
            htmlFor="blog"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            Blog Posting
          </Label>
        </div>
      </RadioGroup>

      <div className="space-y-2">
        <Label>Headline</Label>
        <Input placeholder="Article Title" value={data.headline} onChange={(e) => update('headline', e.target.value)} />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2 md:col-span-3">
          <Label>Image URL</Label>
          <Input placeholder="https://..." value={data.image} onChange={(e) => update('image', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Width (px)</Label>
          <Input type="number" placeholder="1200" value={data.width} onChange={(e) => update('width', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Height (px)</Label>
          <Input type="number" placeholder="630" value={data.height} onChange={(e) => update('height', e.target.value)} />
        </div>
      </div>

      <div className="flex items-center space-x-2 py-4 border-y border-border/50">
        <Switch id="isAmp" checked={data.isAMP} onCheckedChange={(v) => update('isAMP', v)} />
        <Label htmlFor="isAmp">Enable Extended Fields (AMP/Rich Snippet)</Label>
      </div>

      {data.isAMP && (
        <div className="grid md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4">
          <div className="space-y-2">
            <Label>Author</Label>
            <Input value={data.author} onChange={(e) => update('author', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Publisher</Label>
            <Input value={data.publisher} onChange={(e) => update('publisher', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Date Published</Label>
            <Input type="date" value={data.datePublished} onChange={(e) => update('datePublished', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Date Modified</Label>
            <Input type="date" value={data.dateModified} onChange={(e) => update('dateModified', e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Description</Label>
            <Input value={data.description} onChange={(e) => update('description', e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Canonical URL</Label>
            <Input value={data.url} onChange={(e) => update('url', e.target.value)} />
          </div>
        </div>
      )}
    </div>
  );
}

// --- 5. Product Form ---
const PRODUCT_IDENTIFIERS = [
  { value: "sku", label: "SKU" },
  { value: "gtin8", label: "GTIN-8" },
  { value: "gtin13", label: "GTIN-13" },
  { value: "gtin14", label: "GTIN-14" },
  { value: "mpn", label: "MPN" },
];

function Product({ setCode }: Props) {
  const [basic, setBasic] = useState({ name: "", image: "", description: "", brand: "", url: "" });
  const [types, setTypes] = useState<Record<string, { enable: boolean; value: string }>>({
    sku: { enable: false, value: "" },
    gtin8: { enable: false, value: "" },
    gtin13: { enable: false, value: "" },
    gtin14: { enable: false, value: "" },
    mpn: { enable: false, value: "" },
  });
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [offers, setOffers] = useState({
    price: "", priceCurrency: "USD", priceValidUntil: "", lowPrice: "",
    type: "Offer", url: "", itemCondition: "New", availability: "InStock"
  });
  const [ratings, setRatings] = useState({ ratingValue: "", bestRating: "5", worstRating: "1", ratingCount: "" });

  // Load currencies only once
  useEffect(() => {
    axios.get("https://openexchangerates.org/api/currencies.json")
      .then(({ data }) => {
        setCurrencies(Object.entries(data).map(([key, value]) => ({ value: key, label: `${key} - ${value}` })));
      })
      .catch(() => setCurrencies([{ value: "USD", label: "USD - United States Dollar" }]));
  }, []);

  const updateBasic = (f: string, v: string) => setBasic(p => ({ ...p, [f]: v }));
  const updateOffers = (f: string, v: string) => setOffers(p => ({ ...p, [f]: v }));
  const updateRatings = (f: string, v: string) => setRatings(p => ({ ...p, [f]: v }));

  useEffect(() => {
    const identifiers = Object.keys(types)
      .filter((k) => types[k].enable && types[k].value.trim().length > 0)
      .map((k) => `"${k}": "${types[k].value.trim()}"`).join(",\n      ");

    const offerStr = offers.type === "Offer"
      ? `"priceValidUntil": "${offers.priceValidUntil}",\n      "url": "${offers.url}",\n      "availability": "http://schema.org/${offers.availability}",\n      "itemCondition": "http://schema.org/${offers.itemCondition}",`
      : "";

    setCode(`<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "${basic.name}",
      "image": "${basic.image}",
      "description": "${basic.description}",
      "brand": {
          "@type": "Brand",
          "name": "${basic.brand}"
      },
      "url": "${basic.url}",
      "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "${ratings.ratingValue}",
          "bestRating": "${ratings.bestRating}",
          "worstRating": "${ratings.worstRating}",
          "ratingCount": "${ratings.ratingCount}"
      },
      "offers": {
          "@type": "${offers.type}",
          "priceCurrency": "${offers.priceCurrency}",
          "lowPrice": "${offers.lowPrice}",
          ${offerStr}
      }${identifiers ? ",\n      " + identifiers : ""}
    }
</script>`);
  }, [basic, types, offers, ratings, setCode]);

  return (
    <div className="space-y-8">

      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg border-b pb-2">Product Details</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Product Name</Label><Input value={basic.name} onChange={e => updateBasic('name', e.target.value)} /></div>
          <div className="space-y-2"><Label>Brand</Label><Input value={basic.brand} onChange={e => updateBasic('brand', e.target.value)} /></div>
          <div className="space-y-2"><Label>Image URL</Label><Input value={basic.image} onChange={e => updateBasic('image', e.target.value)} /></div>
          <div className="space-y-2"><Label>Product URL</Label><Input value={basic.url} onChange={e => updateBasic('url', e.target.value)} /></div>
          <div className="space-y-2 md:col-span-2"><Label>Description</Label><Input value={basic.description} onChange={e => updateBasic('description', e.target.value)} /></div>
        </div>
      </div>

      {/* Identifiers */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg border-b pb-2">Identifiers</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {PRODUCT_IDENTIFIERS.map((item) => (
            <div key={item.value} className="flex items-end gap-2 p-3 border rounded-md">
              <div className="flex-1 space-y-2">
                <Label className="text-xs uppercase text-muted-foreground">{item.label}</Label>
                <Input
                  className="h-8"
                  placeholder="Value..."
                  value={types[item.value].value}
                  disabled={!types[item.value].enable}
                  onChange={(e) => setTypes(p => ({ ...p, [item.value]: { ...p[item.value], value: e.target.value } }))}
                />
              </div>
              <Switch
                checked={types[item.value].enable}
                onCheckedChange={(v) => setTypes(p => ({ ...p, [item.value]: { ...p[item.value], enable: v } }))}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Offers & Pricing */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg border-b pb-2">Pricing & Offers</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Offer Type</Label>
            <Select value={offers.type} onValueChange={v => updateOffers('type', v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Offer">Single Offer</SelectItem>
                <SelectItem value="AggregateOffer">Aggregate Offer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Currency</Label>
            <Select value={offers.priceCurrency} onValueChange={v => updateOffers('priceCurrency', v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {currencies.map((c, i) => <SelectItem key={i} value={c.value}>{c.value}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {offers.type === "Offer" ? (
            <>
              <div className="space-y-2"><Label>Price</Label><Input type="number" value={offers.price} onChange={e => updateOffers('price', e.target.value)} /></div>
              <div className="space-y-2"><Label>Valid Until</Label><Input type="date" value={offers.priceValidUntil} onChange={e => updateOffers('priceValidUntil', e.target.value)} /></div>
              <div className="space-y-2">
                <Label>Availability</Label>
                <Select value={offers.availability} onValueChange={v => updateOffers('availability', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["InStock", "OutOfStock", "PreOrder", "SoldOut", "Discontinued"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Condition</Label>
                <Select value={offers.itemCondition} onValueChange={v => updateOffers('itemCondition', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["New", "Used", "Refurbished", "Damaged"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </>
          ) : (
            <div className="space-y-2 md:col-span-2">
              <Label>Low Price</Label>
              <Input type="number" value={offers.lowPrice} onChange={e => updateOffers('lowPrice', e.target.value)} />
            </div>
          )}
        </div>
      </div>

      {/* Ratings */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg border-b pb-2">Reviews</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2"><Label>Score</Label><Input type="number" value={ratings.ratingValue} onChange={e => updateRatings('ratingValue', e.target.value)} /></div>
          <div className="space-y-2"><Label>Count</Label><Input type="number" value={ratings.ratingCount} onChange={e => updateRatings('ratingCount', e.target.value)} /></div>
          <div className="space-y-2"><Label>Best</Label><Input type="number" value={ratings.bestRating} onChange={e => updateRatings('bestRating', e.target.value)} /></div>
          <div className="space-y-2"><Label>Worst</Label><Input type="number" value={ratings.worstRating} onChange={e => updateRatings('worstRating', e.target.value)} /></div>
        </div>
      </div>

    </div>
  );
}