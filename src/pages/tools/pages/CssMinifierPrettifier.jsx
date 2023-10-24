import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FormElement from "components/form-elements/FormElement";
import { useState } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Button from "components/buttons";
import cssbeautify from 'cssbeautify';
import { FaCompressArrowsAlt, FaExpandArrowsAlt } from "react-icons/fa";
import { MdContentCopy, MdDeleteOutline } from "react-icons/md";
  

export default function CssMinifierPrettifier() {
    const [value, SetValue] = useState("");



    return (
        <div className="flex gap-2 justify-around items-start">
            <Card>
  <CardHeader>
    <CardTitle>CSS Minifier Prettifier</CardTitle>
    <CardDescription>Minify or Beautify your CSS code</CardDescription>
  </CardHeader>
  <CardContent>
  <FormElement>
                <Textarea variant="ghost" id="cssField" name="CssValue" rows={10}
                placeholder="Enter Css Code Here"
                
                value={value} onChange={(e) => SetValue(e.target.value)} style={{ fontFamily: "var(--code-font)" }} />
                <Label htmlFor="CssValue">Enter Css Code Here</Label>
            </FormElement>
  </CardContent>
  <CardFooter>
  <Button id="minify" onClick={() => {

SetValue(value.replace(/([^0-9a-zA-Z\.#])\s+/g, "$1").replace(/\s([^0-9a-zA-Z\.#]+)/g, "$1").replace(/;}/g, "}").replace(/\/\*.*?\*\//g, ""))
}}>
Minify <FaCompressArrowsAlt />
</Button>
<Button nature="primary" id="beautify" onClick={() => SetValue(cssbeautify(value, {
indent: '  ',
autosemicolon: true
}))}>
Beautify <FaExpandArrowsAlt />
</Button>
<Button nature="danger" onClick={() => SetValue("")}>
Clear <MdDeleteOutline />
</Button>
<Button nature="success" onClick={() => {
navigator.clipboard.writeText(value)
}}>
Copy <MdContentCopy />
</Button>
  </CardFooter>
</Card>

        </div>
    )
}