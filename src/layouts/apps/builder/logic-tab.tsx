import { Label } from "@/components/ui/label";
import { AppType } from "src/types/app";
import { useBuilderContext } from '../common/context/builder-context';
import { ModelSelector } from './logic/model-selecter';

// import { MaxLengthSelector } from './logic/maxlength-selector';
// import { TopPSelector } from './logic/top-p-selector';
import { models, types } from "src/lib/models";

import Prompt from './logic/prompt';
import { TemperatureSelector } from './logic/temperature-selector';

export default function LogicTab({ app }: {
    app: AppType
}) {
    const { builderData, updateBuilderData } = useBuilderContext();
    console.log(builderData);

    return (<>
        <div className="w-full mb-2">
            <Label htmlFor='logic_type'>Logic Type</Label>
            <Prompt app={app} />
        </div>
        <div className="w-full mb-2">
            <ModelSelector models={models} types={types} defaultModel={models.find((model) => model.name === builderData.config?.model)}/>
            <TemperatureSelector defaultValue={[0.5]} />

            {/* <>
            <MaxLengthSelector defaultValue={[500]} />
            <TopPSelector defaultValue={[0.4]} />
            </> */}
        </div>



    </>)
}
