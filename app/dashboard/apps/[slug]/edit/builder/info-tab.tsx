import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useBuilderContext } from "../store";


export default function InfoTab() {
    const { builderData, updateBuilderData } = useBuilderContext();


    return (<>
        <div className="flex flex-col gap-2 ">
            <Label htmlFor="title">App Name
                <span className="text-xs ms-1 text-gray-400">
                    (Name of the app)
                </span>
            </Label>
            <Input id="title" name="title" value={builderData.name}
                placeholder='Name of the app' variant="ghost"
                onChange={(e) => {
                    updateBuilderData({ ...builderData, name: e.target.value })
                }} />
        </div>

        <div className="flex flex-col gap-2 ">
            <Label htmlFor="appId">App Slug (unique)
                <span className="text-xs text-red-400">  *</span>
                {/* <span className="text-xs text-gray-400"> ({process.env.NEXT_PUBLIC_WEBSITE_URL}/apps/{builderData.slug.toLowerCase().replaceAll(/ /g, "-").replaceAll("_", "-")})</span> */}
            </Label>
            <Input id="slug" name="slug" value={builderData.slug}
                variant="ghost" rounded="lg"
                placeholder='(unique without spaces)'
                onChange={(e) => {
                    console.log(e.target.value);
                    updateBuilderData({ ...builderData, slug: e.target.value.replaceAll(/ /g, "_") })
                }} />
            <span className="text-xs text-gray-400"> ({process.env.NEXT_PUBLIC_WEBSITE_URL}/apps/{builderData.slug.trim().length === 0 ? "your-app-link" : builderData.slug.toLowerCase().replaceAll(/ /g, "-").replaceAll("_", "-")})</span>
        </div>

        <div className="flex flex-col gap-2 ">
            <Label htmlFor="description">
                Description
                <span className="text-xs text-red-400"> *</span>
            </Label>
            <Textarea
                rows={6}
                variant="ghost"
                maxLength={500}
                id="description" name="description" value={builderData.description}
                placeholder='Description of the app  for SEO purposes, what it does and how it works'
                onChange={(e) => {
                    console.log(e.target.value);
                    // setApp({ ...app, description: e.target.value })
                }} />
            <p className="text-xs text-gray-400 font-semibold">
                Characters: {" "}
                <span className={(builderData.description.length >= 300 ? "text-green-500" : builderData.description.length <= 200 ? "text-red-500" : "text-primary")}>
                    {builderData.description.length}/500
                </span>
            </p>
        </div>
        <Label htmlFor="category">
            Categories
            <span className="text-xs text-red-400"> *</span>
        </Label>
        <div className="grid w-full grid-cols-2 gap-2 !my-4">
            {CATEGORIES.map((category) => {
                return <div className="flex items-center space-x-2" key={category}>
                    <Checkbox
                        defaultChecked={builderData.categories.includes(category)}
                        value={category}
                        id={category}
                        onCheckedChange={(value) => {

                            if (value) {
                                updateBuilderData({ ...builderData, categories: [...builderData.categories, category] })
                            } else {
                                updateBuilderData({ ...builderData, categories: builderData.categories.filter((cat) => cat !== category) })
                            }
                        }}
                    />
                    <Label htmlFor={category} className="!mb-0 font-medium capitalize">{category.replaceAll("_", " ")}</Label>
                </div>
            })}
        </div>

    </>)
}
const CATEGORIES = [
    "writing_assistant",
    "reading_assistant",
    "text_analysis",
    "career",
    "education",
    "sales_and_marketing",
    "personal",
    "productivity",
    "finance",
    "coding",
    "other_tools"
]