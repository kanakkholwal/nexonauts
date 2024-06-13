'use client';

import { Label } from '@/components/ui/label';
import { useAppStore } from '../store';

// import { MaxLengthSelector } from './logic/maxlength-selector';
// import { TopPSelector } from './logic/top-p-selector';

import Prompt from './logic/prompt';

export default function LogicTab() {
  const { config } = useAppStore();

  return (
    <>
      <div className="w-full mb-2">
        <Label htmlFor="logic_type">Logic Type</Label>
        <Prompt />
      </div>
      <div className="w-full mb-2">
        {/* <ModelSelector models={models} types={types} defaultModel={models.find((model) => model.name === config?.model)}/> */}
        {/* <TemperatureSelector defaultValue={[0.5]} /> */}

        {/* <>
            <MaxLengthSelector defaultValue={[500]} />
            <TopPSelector defaultValue={[0.4]} />
            </> */}
      </div>
    </>
  );
}
