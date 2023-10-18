// components/InputField.tsx
// import { InputType } from "../types"

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

// interface SliderFieldProps {
//     input: InputType;
//     type?: string,
//     value: {
//         [key: string]: string
//     },
//     onChange: Function
// }

const SliderField = ({ input, type, value, onChange }) => {

    console.log(input)

    return (
        <div className='mb-2 appInput'>
            <div className="flex justify-between mb-2">
            <Label htmlFor={input.field_id} className="text-lg font-semibold mb-2">
                    {input.field_label}
                    {input.field_mandatory && <span className="text-red-500">*</span>}
                </Label>
                <span className="text-sm text-gray-500">{value[input.field_id]}</span>
            </div>
            <Slider
                defaultValue={[parseInt(input.field_constraints.default_value ?? "0")]}
                step={1}
                min={input.field_constraints.min_value}
                max={input.field_constraints.max_value}
                value={[parseInt(value[input.field_id])]}
                onValueChange={(value) => {
                    onChange({
                        value: value[0],
                        name: input.field_id
                    })
                }}

            />
            {/* <Input
                type={type ?? "text"}
                name={input.field_id}
                id={input.field_id}
                minLength={input.field_constraints.min_length}
                // maxLength={input.field_constraints.max_length}
                placeholder={input.field_placeholder}
                required={input.field_mandatory}
                value={value[input.field_id]}
                onChange={(e) =>{
                    onChange({
                        value:e.target.value,
                        name:input.field_id
                    })
                }}
            /> */}
        </div>
    );
};

export default SliderField;
