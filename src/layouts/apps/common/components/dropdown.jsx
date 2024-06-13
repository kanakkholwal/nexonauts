// components/CustomDropdown.tsx
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CustomDropdown = (
  { input, onChange, value }
  //   : {
  //   input: InputType,
  //   value: {
  //     [key: string]: string
  //   },
  //   onChange?: Function
  // }
) => {
  const permissibleValues = input.options || [];

  return (
    <div className="mb-2 flex flex-col items-start appInput">
      <Label htmlFor={input.id} className="font-semibold mb-2">
        {input.label}
        {input.required && <span className="text-red-500 ms-1">*</span>}
      </Label>
      <Select
        defaultValue={permissibleValues[0].value}
        required={input.required}
        name={input.id}
        onValueChange={(value) => {
          console.log(value);
          onChange?.({
            value,
            name: input.id,
          });
        }}
      >
        <SelectTrigger className="w-[180px] bg-slate-100 dark:bg-grey-100">
          <SelectValue placeholder={input.placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{input.label}</SelectLabel>
            {input.options?.map((item) => (
              <SelectItem
                key={item._id}
                value={item.value}
                id={`${input.id}-${item.value}`}
              >
                {item.value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomDropdown;
