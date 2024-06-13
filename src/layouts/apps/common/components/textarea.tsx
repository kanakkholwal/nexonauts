// components/InputField.tsx
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { inputType } from "src/models/app";

interface InputFieldProps {
  input: inputType;
  value: any;
  onChange: (e: { value: any; name: string }) => void;
}

const InputField = ({ input, value, onChange }: InputFieldProps) => {
  return (
    <div className="mb-2 appInput">
      <Label htmlFor={input.field_name}>
        {input.field_label}
        {input.field_required && <span className="text-red-500">*</span>}
      </Label>
      <Textarea
        name={input.field_name}
        id={input.field_id}
        variant="ghost"
        // minLength={input.constraints["min_length"]}
        // maxLength={input.constraints["max_length"]}
        placeholder={input.field_placeholder}
        required={input.field_required}
        value={value[input.field_name]}
        onChange={(e) => {
          onChange({
            value: e.target.value,
            name: input.field_name,
          });
        }}
        rows={8}
      />
    </div>
  );
};

export default InputField;
