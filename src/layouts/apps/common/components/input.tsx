// components/InputField.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inputType } from "src/models/app";


interface InputFieldProps {
    input: inputType;
    type?: string;
    value: any;
    onChange: (e: { value: any; name: string; }) => void;
}

const InputField = ({ input, type, value, onChange }:InputFieldProps) => {



    return (
        <div className='mb-2 appInput'>
            <Label htmlFor={input.field_id}>
                {input.field_label}
                {input.field_required && <span className="text-red-500">*</span>}
            </Label>
            <Input
                type={type ?? "text"}
                variant="ghost"
                name={input.field_name}
                id={input.field_id}
                // minLength={input.constraints?.min_length ?? 0}
                // maxLength={input.constraints.max_length}
                placeholder={input.field_placeholder}
                required={input.field_required}
                value={value[input.field_name]}
                onChange={(e) => {
                    onChange({
                        value: e.target.value,
                        name: input.field_name
                    })
                }}
            />
        </div>
    );
};

export default InputField;
