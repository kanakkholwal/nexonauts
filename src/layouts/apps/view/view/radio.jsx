// components/RadioButtonField.tsx
import React from 'react';
// import { InputType } from '../types';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// interface RadioButtonFieldProps {
//   input: InputType,
//   value: {
//     [key: string]: string
//   },
//   onChange?: Function
// }

const RadioButtonField = ({ input, value, onChange }) => {


  const permissibleValues =input.field_constraints?.permissible_values || [];

  return (
    <RadioGroup className='my-2 appInput'
      defaultValue={permissibleValues[0]}
      required={input.field_mandatory}
      name={input.field_id}
      onValueChange={(value) => {
        console.log(value);
        onChange && onChange({
          value,
          name: input.field_id
        })
      }}>
      <Label htmlFor={input.field_id} className="text-lg font-semibold mb-2">
{input.field_label}</Label>
      <div className='grid w-full grid-cols-2 gap-2 '>
        {permissibleValues.map((value) => (
          <div key={value} className="flex items-center space-x-2">
            <RadioGroupItem id={`${input.field_id}-${value}`} value={value} />
            <Label htmlFor={`${input.field_id}-${value}`}>{value}</Label>
          </div>
        ))}
      </div>

    </RadioGroup>
  );
};

export default RadioButtonField;
