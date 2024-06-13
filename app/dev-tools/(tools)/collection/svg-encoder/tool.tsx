"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";

import React, { useState } from "react";
interface QuoteType {
  level1: string;
  level2: string;
}

const quotes: QuoteType = {
  level1: '"',
  level2: "'",
};

const ContrastButton: React.FC<{
  color: string;
  onClick: () => void;
  current: boolean;
}> = ({ color, onClick, current }) => {
  return (
    <button
      type="button"
      className={`w-7 h-7 rounded-full ${current ? " shadow-lg" : ""}
            ${color === "white" ? "bg-white border border-slate-200 border-solid" : ""}
            ${color === "silver" ? "bg-slate-500" : ""}
            ${color === "black" ? "bg-black" : ""}
            `}
      data-color={color}
      onClick={onClick}
      title={color}
    ></button>
  );
};

const SVGEncoder: React.FC = () => {
  const [quotes, setQuotes] = useState({ level1: '"', level2: "'" });
  const [initValue, setInitValue] = useState("");
  const [resultValue, setResultValue] = useState("");
  const [cssValue, setCssValue] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("white");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInitValue(value);
    getResults(value);
  };

  const getResults = (data) => {
    if (!data) {
      setResultValue("");
      setCssValue("");
    } else {
      const namespaced = addNameSpace(data);
      const escaped = encodeSVG(namespaced);
      setResultValue(escaped);
      const resultCss = `background-image: url(${quotes.level1}data:image/svg+xml,${escaped}${quotes.level1});`;
      setCssValue(resultCss);
    }
  };

  const contrastButtonsSetCurrent = (color) => {
    setBackgroundColor(color);
  };

  const addNameSpace = (data) => {
    if (data.indexOf("http://www.w3.org/2000/svg") < 0) {
      data = data.replace(
        /<svg/g,
        `<svg xmlns=${quotes.level2}http://www.w3.org/2000/svg${quotes.level2}`
      );
    }
    return data;
  };

  const encodeSVG = (data) => {
    let encodedData = data;
    if (quotes.level1 === '"') {
      encodedData = data.replace(/"/g, "'");
    } else {
      encodedData = data.replace(/'/g, '"');
    }
    encodedData = encodedData
      .replace(/>\s{1,}</g, "><")
      .replace(/\s{2,}/g, " ");
    return encodedData.replace(/[\r\n%#()<>?[\\]^`{|}]/g, encodeURIComponent);
  };

  const handleCopyToClipboard = (value) => {
    copy(value);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="grid gap-3">
      <div className="flex gap-2 w-full">
        <div className="flex items-center space-x-2">
          <Switch
            id="quote"
            checked={quotes.level1 === '"' ? true : false}
            onCheckedChange={(value) => {
              setQuotes({
                level1: value ? '"' : "'",
                level2: value ? "'" : '"',
              });
            }}
          />
          <Label htmlFor="quote" className="mb-0">
            {quotes.level1 === '"' ? "Double quotes" : "Single quotes"}
          </Label>
        </div>
        <Button
          onClick={() => {
            setInitValue("");
            setResultValue("");
          }}
          size="sm"
          variant="destructive"
          className=" font-bold  text-xs"
        >
          Clear
        </Button>
        <Button
          onClick={() => {
            setInitValue(`<svg xmlns="http://www.w3.org/2000/svg">
                    <circle r="50" cx="50" cy="50" fill="tomato"/>
                    <circle r="41" cx="47" cy="50" fill="orange"/>
                    <circle r="33" cx="48" cy="53" fill="gold"/>
                    <circle r="25" cx="49" cy="51" fill="yellowgreen"/>
                    <circle r="17" cx="52" cy="50" fill="lightseagreen"/>
                    <circle r="9" cx="55" cy="48" fill="teal"/>
                </svg>`);
            getResults(initValue);
          }}
          size="sm"
          variant="dark"
          className=" font-bold  text-xs"
        >
          Use Example
        </Button>
      </div>
      <div className="flex gap-2 w-full">
        <div className="w-full mx-auto p-2">
          <Label htmlFor="init" className="flex justify-between gap-2">
            <span>Insert SVG Code:</span>
            <button
              className="text-slate-600 font-bold  text-xs hover:text-primary"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                copy(initValue, {
                  onCopy: () => {
                    toast.success("Copied to clipboard");
                  },
                });
              }}
            >
              Copy
            </button>
          </Label>
          <Textarea
            variant="ghost"
            name="init"
            id="init"
            spellCheck={false}
            rows={8}
            onChange={handleInputChange}
            value={initValue}
            placeholder="Paste your SVG code here"
          ></Textarea>
        </div>
        <div className="w-full mx-auto p-2">
          <Label htmlFor="result" className="flex justify-between gap-2">
            <span>Encoded SVG Code:</span>
            <button
              className="text-slate-600 font-bold  text-xs hover:text-primary"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                copy(resultValue, {
                  onCopy: () => {
                    toast.success("Copied to clipboard");
                  },
                });
              }}
            >
              Copy
            </button>
          </Label>
          <Textarea
            variant="ghost"
            name="result"
            id="result"
            spellCheck={false}
            rows={8}
            value={resultValue}
            placeholder="Encoded results will appear here"
          ></Textarea>
          <p className="text-xs mt-1 text-accent-foreground">
            <strong>Note:</strong> You may place encoded SVG here to decode it
            back.
          </p>
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <div className="w-full mx-auto p-2">
          <Label htmlFor="css" className="flex justify-between gap-2">
            <span>Ready for CSS:</span>
            <button
              className="text-slate-600 font-bold  text-xs hover:text-primary"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                copy(cssValue, {
                  onCopy: () => {
                    toast.success("Copied to clipboard");
                  },
                });
              }}
            >
              Copy
            </button>
          </Label>
          <Textarea
            name="css"
            id="css"
            variant="ghost"
            spellCheck={false}
            placeholder="CSS results will appear here"
            rows={8}
            value={cssValue}
            readOnly
          ></Textarea>
        </div>
        <div className="w-full mx-auto p-2">
          <div className="flex justify-between gap-2 text-slate-600 mb-2">
            <span>Preview:</span>

            <div className="flex gap-1">
              Background:
              <ContrastButton
                color="white"
                onClick={() => contrastButtonsSetCurrent("white")}
                current={backgroundColor === "white"}
              />
              <ContrastButton
                color="silver"
                onClick={() => contrastButtonsSetCurrent("silver")}
                current={backgroundColor === "silver"}
              />
              <ContrastButton
                color="black"
                onClick={() => contrastButtonsSetCurrent("black")}
                current={backgroundColor === "black"}
              />
            </div>
          </div>
          <div
            className="p-2 w-full rounded border border-dashed border-border"
            style={{
              background: backgroundColor,
              backgroundImage: `url(${quotes.level1}data:image/svg+xml,${resultValue}${quotes.level1})`,
            }}
          >
            {/* <div dangerouslySetInnerHTML={{ __html: resultValue }}></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SVGEncoder;
