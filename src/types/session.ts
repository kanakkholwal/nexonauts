import {SessionUserType} from "./user";
type sessionType = {
    expires: Date,
    user: SessionUserType
}

export type { sessionType }