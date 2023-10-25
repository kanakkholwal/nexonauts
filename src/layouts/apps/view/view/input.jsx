// components/InputField.tsx
// import { InputType } from "../types"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


// interface InputFieldProps {
//     input: InputType;
//     type?:string,
//     value: {
//         [key: string]: string
//       },
//     onChange: Function
// }

const InputField = ({ input,type,value,onChange }) => {



    return (
        <div className='mb-2 appInput'>
            <Label htmlFor={input.id} className="font-semibold mb-2">
                {input.label}
                {input.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
                type={type ?? "text"}
                name={input.id}
                id={input.id}
                minLength={input.constraints.min_length}
                // maxLength={input.constraints.max_length}
                placeholder={input.placeholder}
                required={input.mandatory}
                value={value[input.id]}
                onChange={(e) =>{
                    onChange({
                        value:e.target.value,
                        name:input.id
                    })
                }}
            />
        </div>
    );
};

export default InputField;
