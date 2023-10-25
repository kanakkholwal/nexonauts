// components/InputField.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputType } from "src/types/app";


interface InputFieldProps {
    input: InputType;
    type?: string;
    value: any;
    onChange: (e: { value: any; name: string; }) => void;
}

const InputField = ({ input, type, value, onChange }:InputFieldProps) => {



    return (
        <div className='mb-2 appInput'>
            <Label htmlFor={input.id}>
                {input.label}
                {input.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
                type={type ?? "text"}
                variant="ghost"
                name={input.id}
                id={input.name}
                minLength={input.constraints?.min_length}
                // maxLength={input.constraints.max_length}
                placeholder={input.placeholder}
                required={input.required}
                value={value[input.id]}
                onChange={(e) => {
                    onChange({
                        value: e.target.value,
                        name: input.id
                    })
                }}
            />
        </div>
    );
};

export default InputField;
