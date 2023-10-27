// components/RadioButtonField.tsx
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { InputType } from "src/types/app";

interface RadioButtonFieldProps {
  input: InputType,
  value: {
    [key: string]: string
  },
  onChange?: Function
}

const RadioButtonField = ({ input, value, onChange }: RadioButtonFieldProps) => {


  const permissibleValues = input?.options ?? [];

  return (
    <RadioGroup className='my-2 appInput'
      defaultValue={value[input.id]}
      required={input.required}
      name={input.id}
      onValueChange={(value) => {
        console.log(value);
        onChange && onChange({
          value,
          name: input.id
        })
      }}>
      <Label htmlFor={input.id} className="text-lg font-semibold mb-2">
        {input.label}</Label>
      <div className='grid w-full grid-cols-2 gap-2 '>
        {permissibleValues.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem id={`${input.id}-${option.value}`} value={option.value} />
            <Label htmlFor={`${input.id}-${option.value}`}>{option.value}</Label>
          </div>
        ))}
      </div>

    </RadioGroup>
  );
};

export default RadioButtonField;
