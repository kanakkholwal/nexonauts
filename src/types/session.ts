type sessionType = {
    expires: Date,
    user: {
        id: string;
        name: string;
        username: string;
        email: string;
        role: string;
        profileURL: string;
        account_type?: string;
    }
}

export type { sessionType }