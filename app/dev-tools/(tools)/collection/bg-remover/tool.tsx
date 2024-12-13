"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";




export default function ToolComponent() {
    const [image, setImage] = useState<File | null>(null)
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const removeBackgroundInstance = useRef<any>(null)

    const handleRemoval = async () => {
        if (!image) return

        const imageUri = URL.createObjectURL(image)
        const removeBackground = removeBackgroundInstance.current
        if(!removeBackgroundInstance.current) {
            alert("Remove background library not loaded")
            return
        }
        const result = await removeBackground(imageUri)
        console.log(result)


    }
    useEffect(() => {
        async function loadLibrary() {
            if (window === undefined) return
            // Dynamically import the library
            removeBackgroundInstance.current = await import("@imgly/background-removal");
            console.log("Library loaded")
        }
        loadLibrary();
    }, []);

    return <>
        <div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Picture</Label>
                <Input id="picture" type="file"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    multiple={false}
                    accept="image/*"
                />
            </div>
        </div>
        <div>
            <h4 className="text-lg font-semibold">Settings</h4>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Button onClick={handleRemoval}>Remove Background</Button>
            </div>
        </div>
    </>
}