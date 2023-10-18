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


  const permissibleValues = input?.constraints?.permissible_values?.split(",").map((value) => value.trim()) ?? ["Yes", "No"];

  return (
    <RadioGroup className='my-2 appInput'
      defaultValue={value[input.inputId]}
      required={input.inputRequired}
      name={input.inputId}
      onValueChange={(value) => {
        console.log(value);
        onChange && onChange({
          value,
          name: input.inputId
        })
      }}>
      <Label htmlFor={input.inputId} className="text-lg font-semibold mb-2">
        {input.inputLabel}</Label>
      <div className='grid w-full grid-cols-2 gap-2 '>
        {permissibleValues.map((value) => (
          <div key={value} className="flex items-center space-x-2">
            <RadioGroupItem id={`${input.inputId}-${value}`} value={value} />
            <Label htmlFor={`${input.inputId}-${value}`}>{value}</Label>
          </div>
        ))}
      </div>

    </RadioGroup>
  );
};

export default RadioButtonField;
