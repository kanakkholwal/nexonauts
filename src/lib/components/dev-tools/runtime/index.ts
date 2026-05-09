import CssMinifierAndPrettifier from "./css-minifier-and-prettifier.svelte";
import HtmlMinifierAndPrettifier from "./html-minifier-and-prettifier.svelte";
import HtmlParserTool from "./html-parser-tool.svelte";
import HtmlToJsxConvertor from "./html-to-jsx-convertor.svelte";
import ImageToWebpConvertor from "./image-to-webp-convertor.svelte";
import JsonMinifierTool from "./json-minifier-tool.svelte";
import MetaTagGenerator from "./meta-tag-generator.svelte";
import PdfStripper from "./pdf-stripper.svelte";
import SchemaMarkupGenerator from "./schema-markup-generator.svelte";

export const runtimeDevToolComponents = {
	"css-minifier-and-prettifier": CssMinifierAndPrettifier,
	"html-minifier-and-prettifier": HtmlMinifierAndPrettifier,
	"html-parser-tool": HtmlParserTool,
	"html-to-jsx-convertor": HtmlToJsxConvertor,
	"image-to-webp-convertor": ImageToWebpConvertor,
	"json-minifier-tool": JsonMinifierTool,
	"meta-tag-generator": MetaTagGenerator,
	"pdf-stripper": PdfStripper,
	"schema-markup-generator": SchemaMarkupGenerator
} as const;

export type RuntimeDevToolSlug = keyof typeof runtimeDevToolComponents;

export function hasRuntimeDevTool(slug: string): slug is RuntimeDevToolSlug {
	return slug in runtimeDevToolComponents;
}
