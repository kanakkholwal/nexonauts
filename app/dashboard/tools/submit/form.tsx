"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { nanoid } from "nanoid";
import { UploadImage } from "src/components/uploader";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpRight, LoaderCircle } from "lucide-react";

import { Tag, TagInput } from "@/components/custom/tag-input";
import NexoEditor from "nexo-mdx";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import MarkdownView from "src/components/markdown/view";
import {
  ICategory,
  PublicToolPricingType,
  PublicToolStatus,
  rawPublicToolType,
} from "src/models/tool";
import { z } from "zod";
import { useFormStore } from "./store";
const urlSchema = z
  .string()
  .url()
  .transform((value) => {
    return value.trim();
  });

export default function Form({
  submitTool,
  available_categories,
}: {
  submitTool: (data: Record<string, any>) => Promise<any>;
  available_categories: ICategory[];
}) {
  const tool = useFormStore((state) => state.tool) as rawPublicToolType;
  const [loading, setLoading] = React.useState(false);
  const editorRef = React.useRef(null);
  const [generating, setGenerating] = React.useState(false);
  const [tags, setTags] = React.useState<Tag[]>(
    tool?.tags.map((tag) => ({ id: nanoid(), text: tag })) || []
  );

  return (
    <>
      <div className="flex gap-5 justify-around items-start flex-col @4xl:flex-row">
        <div className="grid grid-cols-1 gap-4 w-full">
          <div className="max-w-sm">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={tool?.name}
              placeholder="Name of the tool"
              disabled={loading}
              onChange={(e) => {
                useFormStore.setState({
                  tool: { ...tool, name: e.target.value },
                });
              }}
            />
          </div>
          <div className="max-w-sm">
            <Label htmlFor="link">Link</Label>
            <Input
              id="link"
              name="link"
              type="url"
              value={tool?.link}
              placeholder="link of the tool"
              disabled={loading}
              onChange={(e) => {
                useFormStore.setState({
                  tool: { ...tool, link: e.target.value },
                });
              }}
            />
          </div>

          <div className="grid w-full items-center gap-1.5 my-4">
            <Label htmlFor="description">Description</Label>
            <NexoEditor
              id="description"
              className="!h-auto p-0"
              value={tool?.description || ""}
              disabled={loading || generating}
              onChange={(value, _) => {
                useFormStore.setState({
                  tool: { ...tool, description: value },
                });
              }}
              renderHtml={(text: string) => (
                <MarkdownView className="prose lg:prose-xl">
                  {text}
                </MarkdownView>
              )}
              ref={editorRef}
            />
          </div>
          <div className="border rounded-lg p-4 grid">
            <Label htmlFor="tags">Tags</Label>
            <TagInput
              id="tags"
              showCount={true}
              placeholder="Enter a tag or keyword"
              size="sm"
              inputFieldPostion="top"
              tags={tags}
              setTags={(newTags) => {
                setTags(newTags);
              }}
            />
          </div>
          <div className="border rounded-lg p-4 grid">
            <div className="mb-4">
              <Label htmlFor="categories">Categories</Label>
              <p className="text-sm text-muted-foreground">
                Select the categories that best describe your tool.
              </p>
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
              {available_categories.map((category, index) => {
                return (
                  <div
                    key={"category_" + index}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <Checkbox
                      id={"category_" + index}
                      name={"category_" + index}
                      checked={tool.categories
                        .map((cat) => cat.slug)
                        .includes(category.slug)}
                      disabled={loading}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          // check if category already exists
                          if (
                            !tool.categories
                              .map((cat) => cat.slug)
                              .includes(category.slug)
                          ) {
                            // setCategories([...categories, category]);
                            useFormStore.setState({
                              tool: {
                                ...tool,
                                categories: [...tool.categories, category],
                              },
                            });
                          }
                        } else {
                          useFormStore.setState({
                            tool: {
                              ...tool,
                              categories: tool.categories.filter(
                                (cat) => cat.slug !== category.slug
                              ),
                            },
                          });
                        }
                      }}
                    />
                    <Label className="font-normal cursor-pointer">
                      {category.name}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 flex-0 bg-glasss p-5 rounded-xl w-full md:min-w-[24rem] md:max-w-md mx-auto">
          <div className="grid items-center gap-1.5 py-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <Label htmlFor="coverImage" className="mb-0">
                Cover Image
              </Label>
              <UploadImage
                key={"coverImage_upload"}
                onUpload={(fileUrl) => {
                  useFormStore.setState({
                    tool: { ...tool, coverImage: fileUrl },
                  });
                }}
              />
            </div>
            <Input
              id="coverImage"
              name="coverImage"
              type="url"
              value={tool?.coverImage}
              disabled={loading}
              placeholder="Cover Image URL"
              onChange={(e) => {
                useFormStore.setState({
                  tool: { ...tool, coverImage: e.target.value },
                });
              }}
            />
            {tool?.coverImage.length > 5 ? (
              <>
                {urlSchema.safeParse(tool?.coverImage).success ? (
                  <div className="flex flex-row gap-3 items-center justify-center">
                    <Image
                      width={320}
                      height={320}
                      src={tool.coverImage}
                      alt={tool.name}
                      className="rounded-lg backdrop-blur-lg border border-border max-w-40 p-2"
                    />
                  </div>
                ) : (
                  <p className="text-xs text-red-500">Invalid URL</p>
                )}
              </>
            ) : null}
          </div>
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="pricing_type" className="mb-0">
              Pricing Type
            </Label>
            <Select
              name="pricing_type"
              value={tool?.pricing_type}
              disabled={loading}
              onValueChange={(value) => {
                useFormStore.setState({
                  tool: {
                    ...tool,
                    pricing_type: value as PublicToolPricingType,
                  },
                });
              }}
            >
              <SelectTrigger className="w-[180px] captialize">
                <SelectValue placeholder="Select Pricing" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "free",
                  "paid",
                  "freemium",
                  "one_time_license",
                  "subscription",
                  "open_source",
                  "other",
                ].map((pricing_type) => {
                  return (
                    <SelectItem
                      key={`tool_pricing_${pricing_type}`}
                      value={pricing_type}
                      className="captialize"
                    >
                      {pricing_type}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="status" className="mb-0">
              Status
            </Label>

            <Select
              name="status"
              value={tool?.status}
              disabled={loading}
              onValueChange={(value) => {
                useFormStore.setState({
                  tool: { ...tool, status: value as PublicToolStatus },
                });
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder="Select Status"
                  className="captialize"
                />
              </SelectTrigger>
              <SelectContent>
                {["draft", "published"].map((status) => {
                  return (
                    <SelectItem
                      key={`tool_status_${status}`}
                      value={status}
                      className="captialize"
                    >
                      {status}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-center">
            <Button variant="link" asChild>
              <Link href={"/scout/tools/" + tool.slug} target="_blank">
                Live Preview
                <ArrowUpRight />
              </Link>
            </Button>
          </div>
          <Button
            size="lg"
            width="sm"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              console.log("Save Changes", tool);
              setLoading(true);
              toast
                .promise(
                  submitTool({
                    name: tool.name,
                    slug: tool.slug,
                    link: tool.link,
                    status: tool.status,
                    pricing_type: tool.pricing_type,
                    description: tool.description,
                    tags: tags
                      .filter((tag) => tag.text.trim() !== "")
                      .map((tag) => tag.text),
                    categories: tool.categories,
                    coverImage: tool.coverImage,
                  }),
                  {
                    loading: "Submitting Changes...",
                    success: (data) => {
                      return "Changes Saved";
                    },
                    error: (error) => {
                      console.error(error);
                      return "Error Saving Changes";
                    },
                  }
                )
                .finally(() => {
                  setLoading(false);
                });
            }}
          >
            {loading ? <LoaderCircle className="animate-spin" /> : null}
            {loading ? "Submitting..." : "Submit Tool"}
          </Button>
        </div>
      </div>
    </>
  );
}
