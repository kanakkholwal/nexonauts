"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"


// import { InputType } from '../types';
import { Label } from "@/components/ui/label"


const ComboBox= ({ 
    input ,
    value : givenValue,
    onChange,
}
// : {
//     input: InputType,
//     value: {
//         [key: string]: string
//     },
//     onChange: Function
// }
) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(givenValue[input.field_id] ?? "");
    const suggestedValues = input.field_constraints?.suggested_options?.map((item) =>{
        return {
            label:item,
            value:item
        }
    })
    // as {
    //     label: string;
    //     value: string;
    // }[] 
    || [];
    console.log(suggestedValues,value)

    return (
        <div className="flex flex-col items-start appInput">
      <Label htmlFor={input.field_id} className="text-lg font-semibold mb-2">
        {input.field_label}
        {input.field_mandatory && <span className="text-red-500 ms-1">*</span>}
      </Label>  
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    <span className="capitalize">
                    {value.trim().length > 0
                        ? givenValue[input.field_id]  ?? value: "Select ..."}

                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search options..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                        {suggestedValues.map((item) => (
                            <CommandItem
                                key={item.value}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false);
                                    onChange({
                                        value:currentValue,
                                        name:input.field_id
                                    })
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === item.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {item.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
        </div>
    )
}

export default ComboBox;