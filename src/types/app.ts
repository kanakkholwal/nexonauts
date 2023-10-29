import { UserType } from "./user";

export type AppType = {
    _id?: string | any;
    appId: string;
    config: AppConfigType | null;
    isPublic: boolean;
    enabled: boolean;
    hasCustomFunction: boolean;
    membership: MemberShipType[];
    status: "draft" | "pending" | "published" | "declined" | "archived";
    version: string;
    name: string;
    shortDescription: string;
    description: string;
    type: TypesOfApp;
    categories: string[];
    tags: string[];
    developer: {
        name: string;
        username: string;
        userId: string | null;
    };
    path: string;
    coverImage: string | null;
    isRecommended: boolean;
    createdAt: Date;
    formFlow: FormFlowType;
}
export type AppConfigType = {
    prompt: string;
    model: string;
    hyperparameters: {
        [k :string]:string | number
    }
}
export type MemberShipType = "free" | "pro"| "premium" | "enterprise";
export type AppTypeWithConfig = Omit<AppType, "config"> & { config: AppConfigType };
export type AppTypeViewOnly = Omit<AppType, "config" | "reviews" | "usage" | "formFlow">;
export type AppTypeWithFormFlow = Omit<AppType, "config" | "reviews" | "usage"> & { formFlow: FormFlowType };
export type AppTypeEditable = AppType
export type AppTypeRenderable = Omit<AppType, "config" | "reviews" | "usage"> & { formFlow: FormFlowType };

export type FormFlowType = {
    menuType: TypesOfApp;
    inputs: InputType[];
    controls: Controls[];
    outputs: {
        render_type : string | "markdown" | "html" | "pdf",
        save_to_db:boolean
    };
}
interface Controls {
    controlType: string;
    id: string;
    text: string;
    icon?: string;
    action: string;
    variant?: string;
}
// Also change mongo schema
export type InputType = {
    type: string;
    name: string;
    label: string;
    placeholder: string;
    required: boolean;
    defaultValue: string;
    value?: string;
    id: string;
    helperText?: string;
    options:OptionType[] | [];
    constraints: Record<string, any> | {};
}
export type OptionType =  {
    label: string;
    value: string;
}
export type TypesOfApp = "text_input_to_text_output" | "chatbot" | "text_input_to_image_output" | "text_input_to_video_output" | "text_input_to_audio_output" | "text_input_to_file_output" | "text_input_to_code_output";


export type AppReviewType = {
    appId: string;
    userId: string | UserType;
    rating: number;
    review: string;
    createdAt: string;
    _id?: string | any;
}
export type AppUsageType = {
    appId: string;
    userId: string;
    usage: any;
    createdAt: string;
    _id: string | any;
}


