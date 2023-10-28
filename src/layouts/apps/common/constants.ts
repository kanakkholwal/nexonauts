import { CgWorkAlt } from 'react-icons/cg';
import { FcSalesPerformance } from 'react-icons/fc';
import { GoPerson } from 'react-icons/go';
import { IoMdCode } from "react-icons/io";
import { LiaMoneyBillWaveSolid } from 'react-icons/lia';
import { MdBusiness, MdOutlineAutoGraph } from 'react-icons/md';
import { PiStudentFill } from 'react-icons/pi';
import { TbHealthRecognition, TbSocial } from 'react-icons/tb';

export const CATEGORIES = [
    { label: "Education", value: "education",Icon:PiStudentFill },
    { label: "Personal", value: "personal" ,Icon:GoPerson},
    { label: "Career", value: "career",Icon:CgWorkAlt },
    { label: "Business", value: "business",Icon:MdBusiness },
    { label: "Health", value: "health",Icon:TbHealthRecognition },
    { label: "Coding", value: "coding",Icon:IoMdCode },
    // { label: "Lifestyle", value: "lifestyle" },
    { label: "Sales & Marketing", value: "sales_and_marketing" ,Icon:FcSalesPerformance},
    { label: "Finance", value: "finance" ,Icon:LiaMoneyBillWaveSolid},
    { label: "Productivity", value: "productivity" ,Icon:MdOutlineAutoGraph},
    { label: "Social", value: "social",Icon:TbSocial },
] as {
    label: string;
    value: string;
    Icon:React.ElementType;
}[];

export const INPUT_TYPES = [
    { label: "Text", value: "text_input" },
    { label: "Number", value: "number_input" },
    { label: "TextArea", value: "text_multiline" },
    { label: "Select", value: "dropdown" },
    { label: "Auto Complete", value: "autoComplete" },
    { label: "Radio", value: "radio" },
    { label: "Checkbox", value: "checkbox" },
] as {
    label: string;
    value: string;
}[];
