import { Label } from "@/components/ui/label";
import { AppType } from "src/types/app";
import { useBuilderContext } from '../common/context/builder-context';
// import { ModelSelector } from '../common/components/model-selecter';

// import { MaxLengthSelector } from '../common/components/maxlength-selector';
// import Prompt from '../common/components/prompt';
// import { TemperatureSelector } from '../common/components/temperature-selector';
// import { TopPSelector } from '../common/components/top-p-selector';
// import { models, types } from "../common/data/models";

export default function LogicTab({ app }: {
    app: AppType
}) {
    const { builderData, updateBuilderData } = useBuilderContext();
    console.log(builderData);

    return (<>
        <div className="w-full mb-2">
            <Label htmlFor='logic_type'>Logic Type</Label>
            {/* <Prompt app={app} /> */}
        </div>
        <div className="w-full mb-2">
            {/* <ModelSelector models={models} types={types} />
            <TemperatureSelector defaultValue={[0.5]} />
            <MaxLengthSelector defaultValue={[500]} />
            <TopPSelector defaultValue={[0.4]} /> */}
        </div>



    </>)
}
