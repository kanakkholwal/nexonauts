import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { useStore } from "../store";


export default function InfoTab() {
    const { app, setApp } = useStore();


    return (<>
        <div className="flex flex-col gap-2 ">
            <Label htmlFor="title">App Name
                <span className="text-xs ms-1 text-gray-400">
                    (Name of the app)
                </span>
            </Label>
            <Input id="title" name="title" value={app.name}
                placeholder='Name of the app' variant="ghost"
                onChange={(e) => {
                    setApp({ ...app, name: e.target.value })
                }} />
        </div>

        <div className="flex flex-col gap-2 ">
            <Label htmlFor="appId">App ID (unique)
                <span className="text-xs text-red-400">  *</span>
                <span className="text-xs text-gray-400"> ({process.env.NEXT_PUBLIC_WEBSITE_URL}/apps/{app.appId.toLowerCase().replaceAll(/ /g, "-").replaceAll("_", "-")})</span>
            </Label>
            <Input id="appId" name="appId" value={app.appId}
                variant="ghost" rounded="lg"
                placeholder='(unique without spaces)'
                onChange={(e) => {
                    console.log(e.target.value);
                    setApp({ ...app, appId: e.target.value.replaceAll(/ /g, "_") })
                }} />
            {/* <span className="text-xs text-gray-400"> ({process.env.NEXT_PUBLIC_WEBSITE_URL}{app.path.trim().length === 0 ? "/apps/your-app-link":app.path})</span> */}
        </div>

        <div className="flex flex-col gap-2 ">
            <Label htmlFor="short-description">
                Short Description
                <span className="text-xs text-red-400"> *</span>
                <span className="text-xs text-gray-400"> (Short description of the app)</span>

            </Label>
            <Textarea variant="ghost"
                id="short-description" name="short-description" value={app.shortDescription}
                placeholder='Short description of the app for SEO purposes'
                maxLength={100}
                onChange={(e) => {
                    console.log(e.target.value);
                    setApp({ ...app, shortDescription: e.target.value })
                }} />
            <p className="text-xs text-gray-400 font-semibold">
                Characters: {" "}
                <span className={(app.shortDescription.length >= 50 ? "text-green-500" : app.shortDescription.length <= 20 ? "text-red-500" : "text-primary")}>
                    {app.shortDescription.length}/100
                </span>
            </p>
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
                id="description" name="description" value={app.description}
                placeholder='Description of the app what it does and how it works'
                onChange={(e) => {
                    console.log(e.target.value);
                    setApp({ ...app, description: e.target.value })
                }} />
            <p className="text-xs text-gray-400 font-semibold">
                Characters: {" "}
                <span className={(app.description.length >= 300 ? "text-green-500" : app.description.length <= 200 ? "text-red-500" : "text-primary")}>
                    {app.description.length}/500
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
                        defaultChecked={app.categories.includes(category)}
                        value={category}
                        id={category}
                        onCheckedChange={(value) => {

                            if (value) {
                                setApp({ ...app, categories: [...app.categories, category] })
                            } else {
                                setApp({ ...app, categories: app.categories.filter((cat) => cat !== category) })
                            }
                        }}
                    />
                    <Label htmlFor={category} className="!mb-0 font-medium capitalize">{category.replaceAll("_"," ")}</Label>
                </div>
            })}
        </div>
        <div className=' flex items-center w-full justify-between'>
            <Label>
                Visibile to everyone
            </Label>
            <Switch
                
                checked={app.isPublic}
                onCheckedChange={(value) => {
                    setApp({ ...app, isPublic: value })
                }}

            />
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