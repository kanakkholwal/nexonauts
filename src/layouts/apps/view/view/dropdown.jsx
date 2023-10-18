// components/CustomDropdown.tsx
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";


const CustomDropdown = ({ input,onChange,value }
//   : {
//   input: InputType,
//   value: {
//     [key: string]: string
//   },
//   onChange?: Function
// }
) => {

  const permissibleValues = input.field_constraints?.permissible_values || [];

  return (
    <div className='mb-2 flex flex-col items-start appInput'>
      <Label htmlFor={input.field_id} className="text-lg font-semibold mb-2">
        {input.field_label}
        {input.field_mandatory && <span className="text-red-500 ms-1">*</span>}
      </Label>    
        <Select
          defaultValue={permissibleValues[0]}
          required={input.field_mandatory}
          name={input.field_id}
          onValueChange={(value) => {
            console.log(value);
            onChange?.({
              value,
              name:input.field_id
            });
            
          }}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={input.field_placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{input.field_label}</SelectLabel>
            {input.field_constraints.permissible_values?.map((value) => (
              <SelectItem key={value} value={value}  id={`${input.field_id}-${value}`}>
                {value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomDropdown;
