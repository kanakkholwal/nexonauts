import type { StaticImageData } from "next/image";
import CssMinifierPrettifier from "./css-minifier-and-prettifier";
import HtmlMinifierPrettifier from "./html-minifier-and-prettifier";
import htmlParserTool from "./html-parser-tool";
import HtmlToJsxTool from "./html-to-jsx-convertor";
import Image2Webp from "./image-to-webp-convertor";
import jsonMinifierTool from "./json-minifier-tool";
import metaTagGenerator from "./meta-tag-generator";
import PdfPageStripper from "./pdf-stripper";
import SchemaGenerator from "./schema-markup-generator";

export type ToolType = {
  slug: string;
  title: string;
  description: string;
  category: string;
  icon: string | React.ReactSVGElement | StaticImageData;
  tags: string[];
  Component: React.FC;
};

const _allTools: ToolType[] = [
  PdfPageStripper,
  Image2Webp,
  SchemaGenerator,
  metaTagGenerator,
  HtmlMinifierPrettifier,
  htmlParserTool,
  jsonMinifierTool,
  CssMinifierPrettifier,
  HtmlToJsxTool,

];
export default _allTools;
