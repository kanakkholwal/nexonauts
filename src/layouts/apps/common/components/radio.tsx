// components/RadioButtonField.tsx
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { inputType } from "src/models/app";

interface RadioButtonFieldProps {
  input: inputType;
  value: {
    [key: string]: string;
  };
  onChange?: Function;
}

const RadioButtonField = ({
  input,
  value,
  onChange,
}: RadioButtonFieldProps) => {
  const permissibleValues = input?.options ?? [];

  return (
    <RadioGroup
      className="my-2 appInput"
      defaultValue={value[input.field_name]}
      required={input.field_required}
      name={input.field_id}
      onValueChange={(value) => {
        console.log(value);
        onChange &&
          onChange({
            value,
            name: input.field_name,
          });
      }}
    >
      <Label htmlFor={input.field_name} className="text-lg font-semibold mb-2">
        {input.field_label}
      </Label>
      <div className="grid w-full grid-cols-2 gap-2 ">
        {permissibleValues.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem
              id={`${input.field_id}-${option.value}`}
              value={option.value}
            />
            <Label htmlFor={`${input.field_id}-${option.value}`}>
              {option.value}
            </Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
};

export default RadioButtonField;
