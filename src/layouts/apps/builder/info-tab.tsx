import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { AppType } from 'src/types/app';
import { useBuilderContext } from "../common/context/builder-context";


export default function InfoTab({ app }: { app: AppType }) {
    const { builderData, updateBuilderData } = useBuilderContext();
    console.log(builderData);


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
            <Label htmlFor="appId">App ID (unique)
                <span className="text-xs text-red-400">  *</span>
                <span className="text-xs text-gray-400"> ({process.env.NEXT_PUBLIC_WEBSITE_URL}/apps/{builderData.appId.toLowerCase().replaceAll(/ /g, "-").replaceAll("_", "-")})</span>
            </Label>
            <Input id="appId" name="appId" value={builderData.appId}
                variant="ghost" rounded="lg"
                placeholder='(unique without spaces)'
                onChange={(e) => {
                    console.log(e.target.value);
                    updateBuilderData({ ...builderData, appId: e.target.value.replaceAll(/ /g, "_") })
                }} />
            {/* <span className="text-xs text-gray-400"> ({process.env.NEXT_PUBLIC_WEBSITE_URL}{builderData.path.trim().length === 0 ? "/apps/your-app-link":builderData.path})</span> */}
        </div>

        <div className="flex flex-col gap-2 ">
            <Label htmlFor="short-description">
                Short Description
                <span className="text-xs text-red-400"> *</span>
                <span className="text-xs text-gray-400"> (Short description of the app)</span>

            </Label>
            <Textarea variant="ghost"
                id="short-description" name="short-description" value={builderData.shortDescription}
                placeholder='Short description of the app for SEO purposes'
                maxLength={100}
                onChange={(e) => {
                    console.log(e.target.value);
                    updateBuilderData({ ...builderData, shortDescription: e.target.value })
                }} />
            <p className="text-xs text-gray-400 font-semibold">
                Characters: {" "}
                <span className={(builderData.shortDescription.length >= 50 ? "text-green-500" : builderData.shortDescription.length <= 20 ? "text-red-500" : "text-primary")}>
                    {builderData.shortDescription.length}/100
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
                id="description" name="description" value={builderData.description}
                placeholder='Description of the app what it does and how it works'
                onChange={(e) => {
                    console.log(e.target.value);
                    updateBuilderData({ ...builderData, description: e.target.value })
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
                    <Label htmlFor={category} className="!mb-0 font-medium capitalize">{category.replaceAll("_"," ")}</Label>
                </div>
            })}
        </div>
        <div className=' flex items-center w-full justify-between'>
            <Label>
                Visibile to everyone
            </Label>
            <Switch
                
                checked={builderData.isPublic}
                onCheckedChange={(value) => {
                    updateBuilderData({ ...builderData, isPublic: value })
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