'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import MarkdownView from 'src/components/markdown/view';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';
import HTMLtoJSX, { configType } from 'nexo-html2jsx';
import { Fira_Code } from 'next/font/google';
import React from 'react';
import { MdDeleteOutline, MdOutlineCode } from 'react-icons/md';

const monoFont = Fira_Code({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin-ext', 'latin'],
  display: 'swap',
  adjustFontFallback: false,
  variable: '--fira-code',
});
function extractTextFromNode(node) {
  if (node.type === 'text') {
    return node.value;
  } else if (Array.isArray(node.children)) {
    return node.children.map((child) => extractTextFromNode(child)).join('');
  } else {
    return '';
  }
}

export function RenderCodeBlock({ children, className, node, ...props }) {
  const [state, setState] = React.useState<'copy' | 'idle'>('idle');
  const textContent = extractTextFromNode(node);

  return (
    <pre className={cn('relative', monoFont.className, className)}>
      <button
        className={cn(
          'absolute top-2 right-2',
          'transition-all active:opacity-50  rounded-md p-1.5',
          'border  border-slate-700 bg-gray-800 hover:bg-slate-700  text-white/80  hover:text-white'
        )}
        onClick={() => {
          navigator.clipboard
            .writeText(textContent)
            .then(() => setState('copy'));
          setTimeout(() => setState('idle'), 1000);
        }}
        aria-label="Copy code"
      >
        {state === 'copy' ? (
          <Check className="w-4 h-4" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
      {children}
    </pre>
  );
}

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
    indent: '\t',
    hideComment: false,
    createClass: false,
    createFunction: false,
    outputComponentName: 'MyAwesomeComponent',
  });
  const [state, setState] = useState({
    rawData: rawHtml,
    convertedData: '',
    loading: false,
    copying: false,
    error: false,
    output: false,
  });

  const convertToJSX = async () => {
    setState({ ...state, loading: true, error: false, output: false });
    try {
      const htmlToJsx = HTMLtoJSX(settings);
      const convertor = new htmlToJsx();

      setState({
        ...state,
        convertedData: convertor.convert(state.rawData),
        loading: false,
      });
    } catch (e) {
      console.log(e);
      setState({ ...state, loading: false, error: true });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
      <div className="flex flex-col w-full gap-1.5">
        <Label htmlFor="rawData">Enter Raw HTML Here</Label>
        <Textarea
          variant="outline"
          value={state.rawData}
          className="shadow"
          rows={12}
          cols={8}
          id="rawData"
          onChange={(e) => setState({ ...state, rawData: e.target.value })}
          placeholder="Enter raw Html to convert "
        />
      </div>
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Options</CardTitle>
          <CardDescription>Manage how you convert the code</CardDescription>
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
            <Switch
              id="hideComment"
              onCheckedChange={(value) => {
                setSettings({ ...settings, hideComment: value });
              }}
            />
          </div>
          <div className="flex w-full items-center space-x-2">
            <Label htmlFor="createClass">Create Functional Component</Label>
            <Switch
              id="createClass"
              onCheckedChange={(value) => {
                setSettings({ ...settings, createFunction: value });
              }}
            />
          </div>

          <div className="grid w-full gap-2">
            <Label htmlFor="outputComponentName">Output Component Name</Label>
            <Input
              type="text"
              name="outputComponentName"
              variant="ghost"
              id="outputComponentName"
              value={settings.outputComponentName}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  outputComponentName: e.target.value,
                })
              }
              disabled={!settings.createFunction}
            />
          </div>
        </CardContent>
        <CardFooter className="gap-2 flex-wrap">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  if (state.rawData.length > 0) convertToJSX();
                }}
                disabled={state.rawData.trim().length === 0}
              >
                Convert
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-lg mx-auto">
              <DialogHeader>
                <DialogTitle>Output JSX Code</DialogTitle>
                <DialogDescription>
                  Here is your HTML to JSX converted code...
                </DialogDescription>
              </DialogHeader>
              <MarkdownView
                className="prose lg:prose-xl dark:prose-invert max-w-full mx-auto w-full overflow-x-hidden"
                options={{
                  components: {
                    pre: ({ children, className, node, ...props }) => (
                      <RenderCodeBlock
                        className={cn(
                          'relative',
                          monoFont.className,
                          className
                        )}
                        node={node}
                        {...props}
                      >
                        {children}
                      </RenderCodeBlock>
                    ),
                  },
                }}
              >
                {'```jsx\n' + state.convertedData + '\n```'}
              </MarkdownView>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            onClick={() =>
              setState({ ...state, convertedData: '', rawData: rawHtml })
            }
          >
            Reset Raw Data <MdOutlineCode className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="destructive_light"
            onClick={() =>
              setState({ ...state, convertedData: '', rawData: '' })
            }
          >
            Clear <MdDeleteOutline className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
