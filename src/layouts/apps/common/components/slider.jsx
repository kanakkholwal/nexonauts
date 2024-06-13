// components/InputField.tsx
// import { InputType } from "../types"

import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

// interface SliderFieldProps {
//     input: InputType;
//     type?: string,
//     value: {
//         [key: string]: string
//     },
//     onChange: Function
// }

const SliderField = ({ input, type, value, onChange }) => {
  console.log(input);

  return (
    <div className="mb-2 appInput">
      <div className="flex justify-between mb-2">
        <Label htmlFor={input.id} className="font-semibold mb-2">
          {input.label}
          {input.required && <span className="text-red-500">*</span>}
        </Label>
        <span className="text-sm text-gray-500">{value[input.id]}</span>
      </div>
      <Slider
        defaultValue={[parseInt(input.constraints?.default_value ?? '0')]}
        step={1}
        min={input.constraints?.min_value}
        max={input.constraints?.max_value}
        value={[parseInt(value[input.id])]}
        onValueChange={(value) => {
          onChange({
            value: value[0],
            name: input.id,
          });
        }}
      />
      {/* <Input
                type={type ?? "text"}
                name={input.id}
                id={input.id}
                minLength={input.constraints.min_length}
                // maxLength={input.constraints.max_length}
                placeholder={input.placeholder}
                required={input.mandatory}
                value={value[input.id]}
                onChange={(e) =>{
                    onChange({
                        value:e.target.value,
                        name:input.id
                    })
                }}
            /> */}
    </div>
  );
};

export default SliderField;
