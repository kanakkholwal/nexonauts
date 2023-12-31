type UserType = {
    _id?: string;
    name: string;
    username: string;
    email: string;
    password?: string;
    role: string;
    createdAt: string;
    profilePicture: string;
    account_type: string;
    verificationToken: string|null;
    verified: boolean;
    __v?: number;
}
type SessionUserType = {
    id: string;
    name: string;
    username: string;
    email: string;
    role: string;
    profilePicture: URL;
    account_type: string;
    verificationToken: string|null;
    verified: boolean;
    aditional_info:{
        [key: string]: string | number | boolean | string[] | number[] | boolean[] | URL[] | URL,
    },
    providers: string[];
    preferences: {
        [key: string]: string | number | boolean | string[] | number[] | boolean[],
    },
}

export type { SessionUserType, UserType };

