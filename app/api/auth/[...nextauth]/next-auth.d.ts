import "next-auth";
import { SessionUserType } from "src/types/user";

declare module "next-auth" {
    export interface Session extends DefaultSession {
        user: SessionUserType,
        expires: string
    }
}