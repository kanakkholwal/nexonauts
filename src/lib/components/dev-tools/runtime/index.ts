import CssMinifierAndPrettifier from "./css-minifier-and-prettifier.svelte";
import HtmlMinifierAndPrettifier from "./html-minifier-and-prettifier.svelte";
import HtmlParserTool from "./html-parser-tool.svelte";
import HtmlToJsxConvertor from "./html-to-jsx-convertor.svelte";
import JsonMinifierTool from "./json-minifier-tool.svelte";
import MetaTagGenerator from "./meta-tag-generator.svelte";

export const runtimeDevToolComponents = {
	"css-minifier-and-prettifier": CssMinifierAndPrettifier,
	"html-minifier-and-prettifier": HtmlMinifierAndPrettifier,
	"html-parser-tool": HtmlParserTool,
	"html-to-jsx-convertor": HtmlToJsxConvertor,
	"json-minifier-tool": JsonMinifierTool,
	"meta-tag-generator": MetaTagGenerator
} as const;

export type RuntimeDevToolSlug = keyof typeof runtimeDevToolComponents;

export function hasRuntimeDevTool(slug: string): slug is RuntimeDevToolSlug {
	return slug in runtimeDevToolComponents;
}

