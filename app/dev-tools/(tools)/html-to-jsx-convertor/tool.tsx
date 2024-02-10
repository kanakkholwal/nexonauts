"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import CodeBlock from "components/code-block";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import { Button } from "@/components/ui/button";
import HTMLtoJSX, { configType } from 'nexo-html2jsx';
import { MdDeleteOutline, MdOutlineCode } from "react-icons/md";



const rawHtml = `
<!-- Hello world -->
<div class="awesome" style="border: 1px solid red">
  <label for="name">Enter your name: </label>
  <input type="text" id="name" />
</div>
<p>Enter your HTML here</p>
`;
export default function HtmlToJsxTool() {


  const [settings, setSettings] = useState<configType>({
    indent: "\t",
    hideComment: false,
    createClass: false,
    createFunction: false,
    outputComponentName: 'MyAwesomeComponent',
  })
  const [state, setState] = useState({
    rawData: rawHtml,
    convertedData: "",
    loading: false,
    copying: false,
    error: false,
    output: false,
  });

  const convertToJSX = async () => {

    setState({ ...state, loading: true, error: false, output: false });
    try {


      const htmlToJsx = HTMLtoJSX(settings)
      const convertor = new htmlToJsx();

      setState({ ...state, convertedData: convertor.convert(state.rawData), loading: false });
    }
    catch (e) {
      console.log(e);
      setState({ ...state, loading: false, error: true });
    }

  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">

      <div className="flex flex-col w-full gap-1.5">
        <Label htmlFor="rawData">Enter Raw HTML Here</Label>
        <Textarea variant="ghost" value={state.rawData}
          rows={12} cols={8} id="rawData" onChange={(e) => setState({ ...state, rawData: e.target.value })} placeholder="Enter raw Html to convert " />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>
            Options
          </CardTitle>
          <CardDescription>
            Manage how you convert the code
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          {/* <div >
            <Label htmlFor="Indentation">Indentation</Label>
            <Select
              onValueChange={(value: configType["indent"]) => {
                setSettings({ ...settings, indent: value })
              }}
            >
              <SelectTrigger className="w-[180px] bg-slate-100">
                <SelectValue placeholder="Indentation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="\t">Tab</SelectItem>
                <SelectItem value=" ">Space</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          <div className="flex w-full items-center space-x-2">
            <Label htmlFor="hideComment">Hide Comment</Label>
            <Switch id="hideComment" onCheckedChange={(value) => {
              setSettings({ ...settings, hideComment: value })
            }} />
          </div>
          <div className="flex w-full items-center space-x-2">
            <Label htmlFor="createClass">Create Functional Component</Label>
            <Switch id="createClass" onCheckedChange={(value) => {
              setSettings({ ...settings, createFunction: value })
            }} />
          </div>

          <div className="grid w-full gap-2">
            <Label htmlFor="outputComponentName">Output Component Name</Label>
            <Input
              type="text"
              name="outputComponentName"
              variant="ghost"
              id="outputComponentName"
              value={settings.outputComponentName}
              onChange={(e) => setSettings({ ...settings, outputComponentName: e.target.value })}
              disabled={!settings.createClass}
            /></div>


        </CardContent>
        <CardFooter className="gap-2 flex-wrap">

          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={() => {
                if (state.rawData.length > 0)
                  convertToJSX();
              }} disabled={state.rawData.trim().length === 0}>
                Convert
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Output JSX Code
                </DialogTitle>
                <DialogDescription>
                  Here is your HTML to JSX converted code...
                </DialogDescription>
              </DialogHeader>
              <CodeBlock language={settings.createFunction ? "javascript" :"html"} data={state.convertedData} />
            </DialogContent>
          </Dialog>

          <Button variant="outline" onClick={() => setState({ ...state, convertedData: "", rawData: rawHtml })} >
            Reset Raw Data <MdOutlineCode className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="destructive_light" onClick={() => setState({ ...state, convertedData: "", rawData: "" })}>
            Clear <MdDeleteOutline className="w-4 h-4 ml-2" />
          </Button>

        </CardFooter>
      </Card>



    </div>
  );
}