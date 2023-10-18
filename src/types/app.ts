
export type AppType = {
    _id:string | any;
    appId: string;
    enabled:Boolean;
    name: string;
    shortDescription: string;
    description: string;
    type: TypesOfApp;
    membership: string;
    state: string;
    customFunction: boolean;
    config: any;
    category: string;
    tags: string[];
    author: any;
    path: string;
    version?: string;
    coverImage?: string;
    recommended: boolean,
    createdAt:Date | string,
    averageRating?: number,
    ratings: number[],
    reviews: AppReview[],
    usage: AppUsage[],
    keywords:string[],
    formFlow:{
        menuType: TypesOfApp ,
        inputs:InputType[],
        outputs:any[],
        controls:Controls[]
    }
}
export type PublicAppType = Omit<AppType, "config" | "reviews" | "usage">;
interface Controls {
    controlType: string;
    id: string;
    text: string;
    icon?: string;
    action: string;
    variant: string;
}
// Also change mongo schema
export type InputType ={
    inputType: string;
    inputName: string;
    inputId: string;
    inputLabel:string;
    inputValue: string;
    inputPlaceholder: string;
    inputRequired:boolean;
    inputHelper?: string;
    constraints:any;
    inputOptions: Options[];    
}
type Options = {
    label: string;
    value: string;
}
type TypesOfApp = "text_input_to_text_output" | "chatbot"| "text_input_to_image_output" | "text_input_to_video_output" | "text_input_to_audio_output" | "text_input_to_file_output"  |  "text_input_to_code_output";


interface AppReview {
    appId: string;
    userId: string | any;
    rating: number;
    review: string;
    createdAt: string;
    _id:string | any;
}
interface AppUsage{
    appId: string;
    userId: string;
    usage: any;
    createdAt: string;
    _id:string | any;
}
type newApp = Omit<App ,"_id">
export type AppInfo = {
    _id:string | any;
    appId: string;
    enabled:Boolean;
    name: string;
    shortDescription: string;
    membership: string;
    state: string;
    category: string;
    tags: string[];
    author: any;
    path: string;
    version?: string;
    coverImage?: string;
    recommended: Boolean,
    createdAt:Date | string,
}
export type App = AppType;
export type { AppReview, AppUsage, Controls, Options, TypesOfApp, newApp };
