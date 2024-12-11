import type { StaticImageData } from "next/image";
import bgRemovalTool from "./bg-remover";
import CssMinifierPrettifier from "./css-minifier-and-prettifier";
import HtmlMinifierPrettifier from "./html-minifier-and-prettifier";
import htmlParserTool from "./html-parser-tool";
// import svgEncoder from "./svg-encoder";
import HtmlToJsxTool from "./html-to-jsx-convertor";
import Image2Webp from "./image-to-webp-convertor";
import jsonMinifierTool from "./json-minifier-tool";
import SchemaGenerator from "./schema-markup-generator";
import metaTagGenerator from "./meta-tag-generator";

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
  Image2Webp,
  SchemaGenerator,
  metaTagGenerator,
  HtmlMinifierPrettifier,
  htmlParserTool,
  jsonMinifierTool,
  CssMinifierPrettifier,
  // svgEncoder,
  HtmlToJsxTool,
  bgRemovalTool,
  
];
export default _allTools;
