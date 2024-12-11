"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { removeBackground } from "@imgly/background-removal";
import { useState } from "react";

export default function ToolComponent() {
    const [image, setImage] = useState<File|null>(null)

    const handleRemoval = async () => {
        if (!image) return

        const imageUri = URL.createObjectURL(image)
        const result = await removeBackground(imageUri)
        console.log(result)


    }

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
                
            </div>
        </div>
    </>
}