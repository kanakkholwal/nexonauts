"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { MdContentCopy, MdDeleteOutline } from "react-icons/md";
import { SlRefresh } from "react-icons/sl";

export default function HtmlParser() {
  const [value, SetValue] = useState("");
  const [output, setOutput] = useState("");

  return (
    <div className="flex gap-2 justify-around items-start w-full flex-col lg:flex-row">
      <Card className="grow w-full">
        <CardHeader>
          <CardTitle>Input</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="HtmlValue">Enter HTML Unparsed Code Here</Label>
          <Textarea
            variant="fluid"
            name="HtmlValue"
            placeholder="Enter or Paste pure HTML here"
            rows={10}
            value={value}
            onChange={(e) => SetValue(e.target.value)}
            style={{ fontFamily: "var(--code-font)!important" }}
          />
        </CardContent>
        <CardFooter className="gap-4 justify-center">
          <Button
            onClick={() => {
              setOutput(
                value
                  .replace(/&/gi, "&amp;")
                  .replace(/</gi, "&lt;")
                  .replace(/>/gi, "&gt;")
                  .replace(/"/gi, "&quot;")
                  .replace(/'/gi, "&#039;")
                  .replace(/&#177;/gi, "&plusmn;")
                  .replace(/&#169;/gi, "&copy;")
                  .replace(/&#174;/gi, "&reg;")
                  .replace(/ya'll/gi, "ya'll")
              );
              toast.success("Parsed !!!");
            }}
          >
            Convert <SlRefresh className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="destructive" onClick={() => SetValue("")}>
            Clear <MdDeleteOutline className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
      <Card className="grow w-full">
        <CardHeader>
          <CardTitle>Output</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="output">Here is your output code</Label>
          <Textarea
            variant="fluid"
            readOnly
            rows={10}
            placeholder="Paste your html code in input box and hit Convert to see results"
            id="output"
            value={output}
          />
        </CardContent>
        <CardFooter className="justify-end">
          <Button
            variant="success"
            onClick={() => {
              navigator.clipboard
                .writeText(output)
                .then(() => {
                  toast.success("Copied Successfully");
                })
                .catch((err) => {
                  toast.error("Something went wrong " + err.message);
                });
            }}
          >
            Copy <MdContentCopy className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
