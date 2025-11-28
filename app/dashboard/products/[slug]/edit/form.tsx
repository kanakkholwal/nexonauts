"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DollarSign,
  Globe,
  Image as ImageIcon,
  Loader2,
  Save,
  Tag,
  Trash2
} from "lucide-react";
import NexoEditor from "nexo-mdx";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { UploadImage } from "~/components/uploader";
import { CATEGORIES as defaultCategories } from "~/constants/marketplace";
import { ProductType } from "~/models/product";
import { HtmlToMarkdown } from "~/utils/string";
import { deleteProduct } from "./actions";

// --- SCHEMA ---
const formSchema = z.object({
  name: z.string().min(3).max(100).transform((v) => v.trim()),
  description: z.string().min(10).max(5000).transform((v) => v.trim()),
  published: z.boolean(),
  url: z.string().url().transform((v) => v.trim()),
  preview_url: z.string().url({ message: "Preview image required" }).transform((v) => v.trim()),
  tags: z.array(z.string().transform((v) => v.trim())),
  categories: z.array(z.string().transform((v) => v.trim())),
  price: z.number().min(0),
});

interface Props {
  product: ProductType;
  updateProduct: (id: string, data: Partial<ProductType>) => Promise<boolean>;
}

export default function ProductForm({ product, updateProduct }: Props) {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      published: product.published,
      url: product.url,
      preview_url: product.preview_url,
      tags: product.tags,
      categories: product.categories,
      price: product.price || 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    toast.promise(updateProduct(product._id, values), {
      loading: "Saving changes...",
      success: "Product updated successfully!",
      error: "Failed to update product"
    })
      .finally(() => setLoading(false));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* --- MAIN EDITOR (Left Column) --- */}
        <div className="lg:col-span-8 space-y-8">

          {/* General Info Card */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Product Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Ultimate SaaS Kit"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Description</FormLabel>
                  <FormControl>
                    <div className="border border-border/50 rounded-xl overflow-hidden bg-background/50 min-h-[400px]">
                      <NexoEditor
                        placeholder="Describe your product..."
                        className="min-h-[400px] prose dark:prose-invert max-w-none focus:outline-none"
                        onPaste={(e) => {
                          e.preventDefault();
                          const text = e.clipboardData.getData("text/plain");
                          form.setValue("description", field.value + HtmlToMarkdown(text));
                        }}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Supports Markdown formatting.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Media Card */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-primary" /> Media
            </h3>

            <FormField
              control={form.control}
              name="preview_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Preview Area */}
                    <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-dashed border-border/50 bg-muted/20 flex items-center justify-center group">
                      {field.value ? (
                        <Image
                          src={field.value}
                          fill
                          alt="Preview"
                          className="object-cover transition-opacity group-hover:opacity-75"
                        />
                      ) : (
                        <div className="text-center p-4">
                          <ImageIcon className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-50" />
                          <p className="text-sm text-muted-foreground">No image uploaded</p>
                        </div>
                      )}
                    </div>

                    {/* Upload Controls */}
                    <div className="space-y-4">
                      <FormControl>
                        <Input placeholder="https://..." {...field} className="bg-background/50" />
                      </FormControl>
                      <UploadImage
                        onUpload={(url) => field.onChange(url)}
                      // Pass custom class or variant if supported by your uploader
                      />
                      <p className="text-xs text-muted-foreground">
                        Recommended size: 1280x720 (16:9). Max size 5MB.
                      </p>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

        </div>

        {/* --- SIDEBAR SETTINGS (Right Column) --- */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6">

          {/* Status & Actions Card */}
          <div className="bg-card border border-border/50 rounded-2xl p-5 shadow-sm space-y-6">
            <div className="flex flex-col items-start justify-center gap-2 w-full">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Status</h3>
              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0 justify-between">
                    <FormLabel className={cn("text-sm font-medium mb-0", field.value ? "text-emerald-500" : "text-muted-foreground")}>
                      {field.value ? "Published" : "Draft"}
                    </FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full h-11" disabled={loading}>
              {loading ? <Loader2 className="mr-2 w-4 h-4 animate-spin" /> : <Save className="mr-2 w-4 h-4" />}
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          {/* Pricing & Link */}
          <div className="bg-card/50 border border-border/50 rounded-2xl p-5 shadow-sm space-y-6">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Details</h3>

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> Price</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        className="pl-7 bg-background/50"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> Purchase Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://gumroad.com/..." className="bg-background/50" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">Link to Gumroad, LemonSqueezy, etc.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Taxonomy */}
          <div className="bg-card/50 border border-border/50 rounded-2xl p-5 shadow-sm space-y-6">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Categorization</h3>

            <FormField
              control={form.control}
              name="categories"
              render={() => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto pr-1 no-scrollbar">
                    {defaultCategories.map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="categories"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item])
                                    : field.onChange(field.value?.filter((value) => value !== item));
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer flex-1">{item}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" /> Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="react, saas, dashboard..."
                      className="bg-background/50"
                      {...field}
                      value={field.value?.join(", ")}
                      onChange={(e) => field.onChange(e.target.value.split(",").map(t => t.trim()))}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">Comma separated</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Danger Zone */}
          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-red-600 dark:text-red-400">Danger Zone</h3>
            <Button
              type="button"
              variant="destructive"
              className="w-full bg-red-500/10 text-red-600 hover:bg-red-500/20 border border-red-500/20 shadow-none"
              disabled={deleting}
              onClick={() => {
                if (confirm("Are you sure you want to delete this product? This cannot be undone.")) {
                  setDeleting(true);
                  toast.promise(deleteProduct(product._id), {
                    loading: "Deleting...",
                    success: "Deleted successfully",
                    error: "Failed to delete"
                  }).finally(() => setDeleting(false));
                }
              }}
            >
              {deleting ? <Loader2 className="mr-2 w-4 h-4 animate-spin" /> : <Trash2 className="mr-2 w-4 h-4" />}
              Delete Product
            </Button>
          </div>

        </div>

      </form>
    </Form>
  );
}