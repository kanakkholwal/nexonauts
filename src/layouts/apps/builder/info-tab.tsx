import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AppType } from 'src/types/app';
import { useBuilderContext } from "../common/context/builder-context";


export default function InfoTab({ app }: {
    app: AppType}) {
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
                placeholder='Name of the app'  variant="ghost" 
                onChange={(e) => {
                    updateBuilderData({ ...builderData, name: e.target.value })
                }} />
        </div>

       


        <div className="flex flex-col gap-2 ">
            <Label htmlFor="link">Link
                <span className="text-xs text-gray-400"> ({process.env.NEXT_PUBLIC_WEBSITE_URL}{builderData.path.trim().length === 0 ? "/apps/your-app-link":builderData.path})</span>
            </Label>
            <Input id="link" name="link" value={builderData.path}  variant="ghost" 
                placeholder='app-link'
                onChange={(e) => {
                    console.log(e.target.value);
                    updateBuilderData({ ...builderData, path: e.target.value })
                }} />
        </div>
        
        <div className="flex flex-col gap-2 ">
            <Label htmlFor="short-description">
                Short Description
                <span className="text-xs text-red-400"> *</span>
            </Label>
            <Textarea  variant="ghost" 
                id="short-description" name="short-description" value={builderData.shortDescription}
                placeholder='Short Description'
                onChange={(e) => {
                    console.log(e.target.value);
                    updateBuilderData({ ...builderData, shortDescription: e.target.value })
                }} />
        </div>

        <div className="flex flex-col gap-2 ">
            <Label htmlFor="description">
                Description
                <span className="text-xs text-red-400"> *</span>
            </Label>
            <Textarea
                rows={6}
                variant="ghost" 
                id="description" name="description" value={builderData.description}
                placeholder='Description'
                onChange={(e) => {
                    console.log(e.target.value);
                    updateBuilderData({ ...builderData, description: e.target.value })
                }} />
        </div>
        <div className="grid w-full grid-cols-2 gap-2 !my-4">
            {CATEGORIES.map((category) =>{
                return <div className="flex items-center space-x-2" key={category}>
                <Checkbox defaultChecked={category===builderData.categories[0]?true:false} value={category} id={category} 
                onChange={(e) => {
                    console.log(e.target);
                    updateBuilderData({ ...builderData, categories:[category] })
                }}
                />
                <Label htmlFor={category}>{category}</Label>
            </div>
            })}
        </div>
        <div className=' mt-2'>
            <Label >
                App is Public
                <span className="text-xs text-red-400"> *</span>
            </Label>

            {/* <Select 
                onValueChange={(value) => updateBuilderData({ ...builderData, isPublic: value })}
                defaultValue={builderData.isPublic}>
                <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Yes / No" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="public">
                        Public
                    </SelectItem>
                    <SelectItem  value="private">
                        Private
                    </SelectItem>
                    <SelectItem  value="in_apps_collection_only">
                        In Apps Collection
                    </SelectItem>
                </SelectContent>
            </Select> */}
        </div>

    </>)
}
const CATEGORIES = [
    "Writing Assistant",
    "Reading Assistant",
    "Text Analysis",
    "Career",
    "Education",
    "Sales & Marketing",
    "Personal",
    "Other Tools"
]