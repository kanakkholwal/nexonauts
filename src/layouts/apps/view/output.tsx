import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Interweave } from "interweave";

export function RenderOutput({ output,loading }) {
    return (<Card className="w-full max-w-[1024px]">
        <CardHeader className="w-full flex items-start sm:items-center gap-2 sm:flex-row justify-between">
            <div>
            <CardTitle>Output</CardTitle>
            <CardDescription>
                This is the answer of the app
            </CardDescription>
            </div>
            <div>
                <Button variant="gradient">
                        Copy to Clipboard
                </Button>
            </div>
        </CardHeader>
        <CardContent>   
            {loading && "Generating..."}         
            {!output ? <div className="bg-slate-100 w-full aspect-[21/9] p-5 rounded-lg">
                <div className="animate-pulse bg-slate-200 w-full h-full rounded-lg"></div>
                

            </div>:
        output?.map((output, index) => {
            const { outputType, data, subtype, ...rest } = output;
            return <>
                <p>Output Type: {outputType}</p>
                <Interweave content={data}/>
            </>;
        })}
        </CardContent>
    </Card>)
}