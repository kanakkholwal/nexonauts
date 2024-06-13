'use client';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import cssbeautify from 'cssbeautify';
import { FaCompressArrowsAlt, FaExpandArrowsAlt } from 'react-icons/fa';
import { MdContentCopy, MdDeleteOutline } from 'react-icons/md';

export default function CssMinifierPrettifier() {
  const [value, SetValue] = useState('');
  const [output, setOutput] = useState('');

  return (
    <div className="flex gap-2 justify-around items-start w-full flex-col lg:flex-row">
      <Card className="grow w-full">
        <CardHeader>
          <CardTitle>Input</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="CssValue">Enter Css Code Here</Label>
          <Textarea
            variant="fluid"
            id="cssField"
            name="CssValue"
            rows={10}
            placeholder="Enter Css Code Here"
            value={value}
            onChange={(e) => SetValue(e.target.value)}
            style={{ fontFamily: 'var(--code-font)' }}
          />
        </CardContent>
        <CardFooter className="gap-4 justify-center">
          <Button
            id="minify"
            variant="dark"
            onClick={() => {
              if (value.trim() === '') return;

              setOutput(
                value
                  .replace(/([^0-9a-zA-Z\.#])\s+/g, '$1')
                  .replace(/\s([^0-9a-zA-Z\.#]+)/g, '$1')
                  .replace(/;}/g, '}')
                  .replace(/\/\*.*?\*\//g, '')
              );
              toast.success('Minified !!!', {
                duration: 50000,
              });
            }}
          >
            Minify <FaCompressArrowsAlt className="w-4 h-4 ml-2" />
          </Button>
          <Button
            id="beautify"
            onClick={() => {
              if (value.trim() === '') return;

              setOutput(
                cssbeautify(value, {
                  indent: '  ',
                  autosemicolon: true,
                })
              );
              toast.success('Beautified !!!');
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
          <Label htmlFor="output">Here is your output CSS</Label>
          <Textarea
            variant="fluid"
            readOnly
            rows={10}
            placeholder="Paste your css code in input box and hit Minify or Beautify to see results"
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
