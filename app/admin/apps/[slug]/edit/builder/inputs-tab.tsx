"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineDeleteOutline, MdOutlineDragIndicator } from "react-icons/md";
import { TbEdit, TbTrash } from "react-icons/tb";
import { INPUT_TYPES } from "src/constants/app";
import {
    inputType
} from "src/models/app";
import { useAppStore } from '../store';


export default function InputTab() {
    const { formFlow: {
        inputs,
        controls
    } } = useAppStore()

    const [input, setInput] = useState<inputType>({
        field_id: new Date().getTime().toString(),
        field_label: "",
        field_defaultValue: "",
        field_required: true,
        field_placeholder: "",
        field_type: "none",
        field_name: "",
        constraints: {},
        options: []
    });

    
    const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

    // Drag and Drop Logic
    const handleDragStart = (index: number) => {
        setDraggedItemIndex(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        const items = [...inputs];
        const draggedItem = items[draggedItemIndex !== null ? draggedItemIndex : index];
        items.splice(draggedItemIndex !== null ? draggedItemIndex : index, 1);
        items.splice(index, 0, draggedItem);
        useAppStore.setState({
            formFlow: {
                ...useAppStore.getState().formFlow,
                inputs: items
            }
        })  
        setDraggedItemIndex(index);
    };

    // Utility function to update form data
    const updateBuilderDataAndResetInput = (updatedInput: inputType) => {
        const updatedInputs = [...inputs];
        const index = updatedInputs.findIndex((item) => item.field_id === updatedInput.field_id);
        if (index !== -1) {
            updatedInputs.splice(index, 1, updatedInput);
        } else {
            updatedInputs.push(updatedInput);
        }
        useAppStore.setState({
            formFlow: {
                ...useAppStore.getState().formFlow,
                inputs: updatedInputs
            }
        })

        setInput({
            ...input,
            field_id:new Date().getTime().toString(),
            field_label: "",
            field_defaultValue: "",
            field_required: true,
            field_placeholder: "",

            constraints: {
                // "data_type": "str",
                // "min_length": 1,
                // 'max_length': 200,
            },
            field_name: "",
            options: []
        });

    };


    return (<>

        <div className="flex flex-col gap-2">

            <div className="flex flex-col justify-between items-center p-5 bg-slate-100 dark:bg-slate-900 rounded-md">
                <div className="flex flex-row justify-between items-center w-full">
                    <Label htmlFor="add_field">
                        Input Field
                    </Label>
                    <Select
                        onValueChange={(value) => {
                            console.log(value)
                            setInput({
                                ...input,
                                field_type: value,
                                options: (value === "dropdown" || value === "radio" || value === "checkbox") ? [{
                                    label: "",
                                    value: ""
                                }] : []
                            })
                        }}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={"Field Type"} />
                        </SelectTrigger>
                        <SelectContent>
                            {INPUT_TYPES.map((item, index) => (
                                <SelectItem key={index} value={item.value} role="button">
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-row justify-between items-center w-full gap-2 my-2">
                    <Input id="label" type="text" placeholder="@Field Name (eg. user_name)"
                        value={input.field_label}
                        onChange={(e) => {
                            setInput({
                                ...input,
                                field_label: e.target.value.trim(),
                                field_name: e.target.value.replaceAll("_", " ").replaceAll("-", " ").split(" ").map((item) => item.charAt(0).toUpperCase() + item.slice(1)).join(" ").trim().replaceAll(" ", "_").toLowerCase(),
                            })
                        }} />
                    <div className="items-center flex gap-2">
                        <Label htmlFor="mandatory" className="mb-0">
                            Mandatory
                        </Label>
                        <Switch
                            name="mandatory"
                            defaultChecked={true}
                            onCheckedChange={(checked) => {
                                setInput({
                                    ...input,
                                    field_required: checked
                                })
                            }}
                        />
                    </div>

                </div>
                {(input.field_type === "text_input" || input.field_type === "text_multiline") ?
                    <Input id="placeholder" type="text" placeholder="Field Placeholder" value={input.field_placeholder} onChange={(e) => {
                        setInput({
                            ...input,
                            field_placeholder: e.target.value
                        })
                    }} /> : null}
                {input.field_type === "number_input" ? <div className="flex w-full flex-row gap-1 my-2">
                    <Input id="min" type="number" placeholder="Min"
                        value={input.constraints["min_length"] ?? 0}
                        onChange={(e) => {
                            setInput({
                                ...input,
                                constraints: {
                                    ...input.constraints,
                                    "min_length": parseInt(e.target.value ?? 0)
                                }
                            })
                        }
                        }
                    />
                    <Input id="max" type="number" placeholder="Max"
                        value={input.constraints["max_length"]}
                        onChange={(e) => {
                            setInput({
                                ...input,
                                constraints: {
                                    ...input.constraints,
                                    "max_length": parseInt(e.target.value ?? 0)
                                }
                            })
                        }
                        }
                    />

                </div> : null}
                {(input.field_type === "dropdown" || input.field_type === "radio" || input.field_type === "checkbox") ? <div>
                    <Label>
                        Add Options
                    </Label>

                    {input.options?.map((option, index) => {
                        return (<div className="flex flex-row justify-between items-center w-full gap-2 my-2" key={index}>
                            <Input id={`option_${index}`} type="text" placeholder={`Option ${index + 1}`} value={option.value}
                                onChange={(e) => {
                                    setInput({
                                        ...input,
                                        options: input.options?.map((item, i: number) => {
                                            if (i === index) {
                                                return {
                                                    label: e.target.value.split(" ").map((item) => item.charAt(0).toUpperCase() + item.slice(1)).join("_"),
                                                    value: e.target.value
                                                }
                                            } else {
                                                return item
                                            }
                                        }
                                        )

                                    })

                                }} />
                            <Button variant="ghost" size="icon" onClick={() => {
                                setInput({
                                    ...input,
                                    options: input.options ? [...input.options, {
                                        label: "",
                                        value: ""
                                    }] : []

                                })
                            }}>
                                <IoMdAdd className="w-5 h-5" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => {
                                setInput({
                                    ...input,
                                    options: input.options?.filter((item, i: number) => i !== index)

                                })
                            }}
                                disabled={input.options?.length === 1 ? true : false}
                            >
                                <MdOutlineDeleteOutline className="w-5 h-5" />
                            </Button>

                        </div>)
                    })}</div> : null}
                <div className="flex flex-row justify-center items-center my-2">
                    <Button variant="outline" onClick={() => {
                        if (input.field_id.trim() === "") {
                            toast.error("Field ID cannot be empty")
                            return
                        }
                        if (!INPUT_TYPES.find((type) => type.value === input.field_type)) {
                            toast.error("Select a proper input type");
                            return
                        }
                        if (input.field_label.trim() === "") {
                            toast.error("Field name cannot be empty")
                            return
                        }
                        if (input.field_type === "dropdown" || input.field_type === "radio" || input.field_type === "checkbox") {
                            if (input.options?.length === 0) {
                                toast.error("Add atleast one option")
                                return
                            }
                        }
                        useAppStore.setState((state) =>{
                            return {
                                ...state,
                                formFlow: {
                                    ...state.formFlow,
                                    inputs: [...state.formFlow.inputs, input]
                                }
                            }
                        })
                        setInput({
                            ...input,
                            field_id: new Date().getTime().toString(),
                            field_label: "",
                            field_defaultValue: "",
                            field_required: true,
                            field_placeholder: "",
                            constraints: {
                                // "data_type": "str",
                                // "min_length": 1,
                                // 'max_length': 200,
                            },
                            field_name: "",
                            options: []
                        })

                    }}>
                        Add Field
                    </Button>

                </div>


                <div className="flex flex-col gap-1 my-2 border  w-full bg-gray-50 dark:bg-slate-950 p-1  rounded-md  ">
                    {
                        inputs?.map((item, index) => {
                            return (<div className="flex flex-row justify-between items-center w-full gap-2 border-b-1 border-slate-200" key={index} draggable>
                                <span className="ms-3 font-semibold text-xs truncate">
                                    @{item.field_name}
                                </span>

                                <div className="flex gap-1 text-sm items-center">


                                    <Button
                                        onClick={() => {
                                            setInput(item);
                                        }}
                                        variant="outline" size="icon">
                                        <TbEdit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            const _inputs = [...inputs]
                                            _inputs?.splice(index, 1);
                                            useAppStore.setState((state) =>{
                                                return {
                                                    ...state,
                                                    formFlow: {
                                                        ...state.formFlow,
                                                        inputs: _inputs
                                                    }
                                                }
                                            })

                                        }}
                                        variant="outline" size="icon">
                                        <TbTrash className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        onDragOver={(e) => handleDragOver(e, index)}
                                        onDragStart={() => handleDragStart(index)}

                                        variant="outline" size="icon"
                                    >
                                        <MdOutlineDragIndicator className="w-4 h-4" />
                                    </Button>
                                </div>

                            </div>)
                        })
                    }
                    {inputs.length === 0 ? <span className="px-3 py-2 text-sm font-semibold mx-auto bg-slate-100 dark:bg-slate-900 rounded">No Input Fields</span> : null}
                </div>



            </div>
        </div>
        <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center">
                <Label htmlFor="generate_btn">
                    Generation Button Text
                </Label>
                <Select
                    onValueChange={(value) => {
                    useAppStore.setState((state) => {
                        return {
                            ...state,
                            formFlow: {
                                ...state.formFlow,
                                controls: state.formFlow.controls.map((control) => {
                                    if (control.action === "get_output") {
                                        return {
                                            ...control,
                                            text: value
                                        }
                                    } else {
                                        return control
                                    }
                                })
                            }
                        }
                    })

                    }}
                >
                    <SelectTrigger className="w-[180px] bg-slate-100">
                        <SelectValue placeholder={"Button Text"} />
                    </SelectTrigger>
                    <SelectContent>
                        {["Generate", "Analyse", "Detect"]?.map((value) => (
                            <SelectItem key={value} value={value}>
                                {value}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div >

    </>)
}

