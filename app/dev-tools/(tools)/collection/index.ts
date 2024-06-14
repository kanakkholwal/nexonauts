import CssMinifierPrettifier from "./css-minifier-and-prettifier";
import HtmlMinifierPrettifier from "./html-minifier-and-prettifier";
import htmlParserTool from "./html-parser-tool";
import Image2Webp from "./image-to-webp-convertor";
import jsonMinifierTool from "./json-minifier-tool";
import metaTagGenerator from "./meta-tag-generator";
import SchemaGenerator from "./schema-markup-generator";
// import svgEncoder from "./svg-encoder";
import HtmlToJsxTool from "./html-to-jsx-convertor";

export type ToolType = {
  slug: string;
  title: string;
  description: string;
  category: string;
  icon: string | React.ReactSVGElement;
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
];
export default _allTools;
