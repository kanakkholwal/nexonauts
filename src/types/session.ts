type sessionType = {
    expires: Date,
    user: {
        id: string,
        email: string,
        name: string,
        profileURL: string,
        role: string,
        account_type: string,
    }
}

export type {sessionType}