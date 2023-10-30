import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import Copy from "copy-to-clipboard";
import { Interweave } from "interweave";
import toast from "react-hot-toast";

export type RenderOutputType = {
    type: string
    data: string | null
}
type RenderOutputProps = {
    output: RenderOutputType,
    loading: boolean
}
export function RenderOutput({ output, loading }: RenderOutputProps) {
    return (<Card className="w-full max-w-[1024px]">
        <CardHeader className="w-full flex items-start sm:items-center gap-2 sm:flex-row justify-between">
            <div>
                <CardTitle>Output</CardTitle>
                <CardDescription>
                    This is the answer of the app
                </CardDescription>
            </div>
            <div>
                <Button variant="gradient" onClick={() => {
                    if (output.type !== "text/plain" || typeof output.data !== "string")
                        return;
                    if (output.data === null || output.data.trim() === "")
                        return;
                    Copy(output.data, {
                        // debug?: boolean;
                        message: 'Press #{key} to copy',
                        format: 'text/plain', // or text/html
                        onCopy(clipboardData) {
                            toast.success("Copied to clipboard");
                        },
                    });
                }}>
                    Copy to Clipboard
                </Button>
            </div>
        </CardHeader>
        <CardContent>
            <div className="bg-slate-50 w-full p-5 py-8 rounded-md">
                {loading ? <>
                    <div className="animate-pulse bg-slate-200 w-[95%] h-4 mb-2 rounded-md" />
                    <div className="animate-pulse bg-slate-200 w-[75%] h-4 mb-2 rounded-md" />
                    <div className="animate-pulse bg-slate-200 w-[90%] h-4 mb-2 rounded-md" />
                    <div className="animate-pulse bg-slate-200 w-[60%] h-4 mb-2 rounded-md" />
                    <div className="animate-pulse bg-slate-200 w-[70%] h-4 mb-2 rounded-md" />
                </> : <>
                    {output.data === null || output.data.trim() === "" ? <p className="text-foreground text-center">No output generated</p> : <>

                        <p>Output Type: {output.type}</p>
                        <Interweave content={output.data} tagName="p" className="text-foreground" />
                    </>}
                </>}


            </div>

        </CardContent>
    </Card>)
}