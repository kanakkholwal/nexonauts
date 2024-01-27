import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Copy from "copy-to-clipboard";
import Markdown from 'markdown-to-jsx';
import toast from "react-hot-toast";
import { outputsType } from "src/types/app";

export type RenderOutputType = {
    type: string
    data: string | null
}
type RenderOutputProps = {
    output: RenderOutputType,
    loading: boolean,
    outputConfig: outputsType
}
export function RenderOutput({ output, loading, outputConfig }: RenderOutputProps) {
    return (<Card className="w-full max-w-[1024px]">
        <CardHeader className="w-full flex items-start sm:items-center gap-2 sm:flex-row justify-between">
            <div>
                <CardTitle>Output</CardTitle>
                <CardDescription>
                    This is the answer of the app
                </CardDescription>
            </div>
            <div>
                <Button size="sm" variant="gradient_blue" onClick={() => {
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
            <div className="w-full p-5 py-8 rounded-md">
                {loading ? <>
                    <Skeleton className=" w-[95%] h-4 mb-2 rounded-md" />
                    <Skeleton className=" w-[75%] h-4 mb-2 rounded-md" />
                    <Skeleton className=" w-[90%] h-4 mb-2 rounded-md" />
                    <Skeleton className=" w-[60%] h-4 mb-2 rounded-md" />
                    <Skeleton className=" w-[70%] h-4 mb-2 rounded-md" />
                </> : <>
                    {(output.data === null || output.data?.trim() === "") ?
                        <p className="text-foreground text-center">No output generated</p> : <>
                            {outputConfig.render_type === "text" && <p className="text-foreground text-center">{output.data}</p>}
                            {outputConfig.render_type === "markdown" &&
                                <Markdown className="text-foreground" >
                                    {output.data}
                                </Markdown>}
                        </>}
                </>}


            </div>

        </CardContent>
    </Card>)
}