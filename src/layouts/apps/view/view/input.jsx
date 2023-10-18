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
      <Label htmlFor={input.field_id} className="text-lg font-semibold mb-2">
                {input.field_label}
                {input.field_mandatory && <span className="text-red-500">*</span>}
            </Label>
            <Input
                type={type ?? "text"}
                name={input.field_id}
                id={input.field_id}
                minLength={input.field_constraints.min_length}
                // maxLength={input.field_constraints.max_length}
                placeholder={input.field_placeholder}
                required={input.field_mandatory}
                value={value[input.field_id]}
                onChange={(e) =>{
                    onChange({
                        value:e.target.value,
                        name:input.field_id
                    })
                }}
            />
        </div>
    );
};

export default InputField;
