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
            <Label htmlFor={input.inputId}>
                {input.inputLabel}
                {input.inputRequired && <span className="text-red-500">*</span>}
            </Label>
            <Input
                type={type ?? "text"}
                variant="ghost"
                name={input.inputId}
                id={input.inputId}
                minLength={input.constraints?.min_length}
                // maxLength={input.constraints.max_length}
                placeholder={input.inputPlaceholder}
                required={input.inputRequired}
                value={value[input.inputId]}
                onChange={(e) => {
                    onChange({
                        value: e.target.value,
                        name: input.inputId
                    })
                }}
            />
        </div>
    );
};

export default InputField;
