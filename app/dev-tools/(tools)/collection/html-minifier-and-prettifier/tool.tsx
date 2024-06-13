'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import pretty from 'pretty';
import { FaCompressArrowsAlt, FaExpandArrowsAlt } from 'react-icons/fa';
import { MdContentCopy, MdDeleteOutline } from 'react-icons/md';

export default function HtmlMinifierPrettifier() {
  const [value, SetValue] = useState('');
  const [output, setOutput] = useState('');

  return (
    <div className="flex gap-2 justify-around items-start w-full flex-col lg:flex-row">
      <Card className="grow w-full">
        <CardHeader>
          <CardTitle>HTML Minifier Prettifier</CardTitle>
          <CardDescription>Minify or Beautify your HTML code</CardDescription>
        </CardHeader>
        <CardContent>
          <Label htmlFor="HtmlValue">Enter HTML Code Here</Label>
          <Textarea
            variant="ghost"
            name="HtmlValue"
            rows={10}
            placeholder="Enter HTML Code Here"
            value={value}
            onChange={(e) => SetValue(e.target.value)}
            style={{ fontFamily: 'var(--code-font)!important' }}
          />
        </CardContent>
        <CardFooter className="gap-4 justify-center">
          <Button
            onClick={() => {
              setOutput(
                value
                  .replace(/([^0-9a-zA-Z\.#])\s+/g, '$1')
                  .replace(/\s([^0-9a-zA-Z\.#]+)/g, '$1')
                  .replace(/;}/g, '}')
                  .replace(/\/\*.*?\*\//g, '')
              );
              toast.success('Minified!!!');
            }}
          >
            Minify <FaCompressArrowsAlt className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              setOutput(pretty(value, { ocd: true }));
              toast.success('Beautified!!!');
            }}
          >
            Beautify <FaExpandArrowsAlt className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="destructive" onClick={() => SetValue('')}>
            Clear <MdDeleteOutline className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
      <Card className="grow w-full">
        <CardHeader>
          <CardTitle>Output</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="output">Here is your output Code</Label>
          <Textarea
            variant="fluid"
            readOnly
            rows={10}
            placeholder="Paste your html code in input box and hit Minify or Beautify to see results"
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
                  toast.success('Copied Successfully');
                })
                .catch((err) => {
                  toast.error('Something went wrong ' + err.message);
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
