type UserType = {
    _id?: string;
    name: string;
    username: string;
    email: string;
    password?: string;
    role: string;
    createdAt: string;
    profileURL: string;
    account_type: string;
    posts: string[];
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
    profileURL: string;
    account_type?: string;
}

export type { UserType, SessionUserType };
