// components/InputField.tsx
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { InputType } from "src/types/app";


interface InputFieldProps {
    input: InputType;
    value: any;
    onChange: (e: { value: any; name: string; }) => void;
}

const InputField = ({ input, value, onChange }: InputFieldProps) => {



    return (
        <div className='mb-2 appInput'>
            <Label htmlFor={input.id}>
                {input.label}
                {input.required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
                name={input.id}
                id={input.id}
                variant="ghost"
                // minLength={input.constraints["min_length"]}
                // maxLength={input.constraints["max_length"]}
                placeholder={input.placeholder}
                required={input.required}
                value={value[input.id]}
                onChange={(e) => {
                    onChange({
                        value: e.target.value,
                        name: input.id
                    })
                }}
                rows={8}

            />
        </div>
    );
};

export default InputField;
