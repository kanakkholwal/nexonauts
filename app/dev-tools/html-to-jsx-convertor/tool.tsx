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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import { Button } from "@/components/ui/button";
// import HTMLtoJSX from 'html-2-jsx';
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


  const [settings, setSettings] = useState({
    indent: '\t',
    hideComment: false,
    createClass: false,
    outputClassName: 'MyAwesomeComponent'
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


      // const convertor = new HTMLtoJSX(settings);

      setState({ ...state, convertedData:` convertor.convert(state.rawData)`, loading: false });
    }
    catch (e) {
      console.log(e);
      setState({ ...state, loading: false, error: true });
    }

  };


  return (
    <div className="flex justify-around item-start">

      <div className="mb-2">
        <Label htmlFor="rawData">Enter Raw HTML Here</Label>
        <Textarea variant="ghost" value={state.rawData}
          rows={8} id="rawData" onChange={(e) => setState({ ...state, rawData: e.target.value })} placeholder="Enter raw Html to convert " />
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
          <div >
            <Label htmlFor="Indentation">Indentation</Label>
            <Select
              onValueChange={(value) => {
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
          </div>

          <div className="flex w-full items-center space-x-2">
            <Label htmlFor="hideComment">Hide Comment</Label>
            <Switch id="hideComment" onCheckedChange={(value) => {
              setSettings({ ...settings, hideComment: value })
            }} />
          </div>
          <div className="flex w-full items-center space-x-2">
            <Label htmlFor="createClass">Create Class</Label>
            <Switch id="createClass" onCheckedChange={(value) => {
              setSettings({ ...settings, createClass: value })
            }} />
          </div>

          <div className="grid w-full gap-2">
            <Label htmlFor="outputClassName">Output Class Name</Label>
            <Input
              type="text"
              name="outputClassName"
              variant="ghost"
              id="outputClassName"
              value={settings.outputClassName}
              onChange={(e) => setSettings({ ...settings, outputClassName: e.target.value })}
              disabled={!settings.createClass}
            /></div>


        </CardContent>
        <CardFooter>

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
              <CodeBlock language={settings.createClass ? "javascript" : "html"} data={state.convertedData} />
            </DialogContent>
          </Dialog>

          <Button variant="secondary" onClick={() => setState({ ...state, convertedData: "", rawData: rawHtml })} >
            Reset Raw Data <MdOutlineCode />
          </Button>
          <Button variant="slate"  onClick={() => setState({ ...state, convertedData: "", rawData: "" })}>
            Clear <MdDeleteOutline />
          </Button>

        </CardFooter>
      </Card>



    </div>
  );
}