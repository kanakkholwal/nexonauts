import { decode } from "next-auth/jwt"
import cookie from 'cookie';

const secret = process.env.NEXT_AUTH_SECRET;

// get user session
export const getUser = async (req) => {
    const cookies = cookie.parse(req.headers.cookie || '')
    const token = process.env.NODE_ENV == 'development'
        ? cookies['next-auth.session-token']
        : cookies['__Secure-next-auth.session-token'];


    if (!token)
        return {
            user: null
        }

    let decoded = await decode({
        token,
        secret,
    });
    return decoded

}
// validate on backend
export const checkUser = async (req, user) => {
    const cookies = cookie.parse(req.headers.cookie || '')
    const token = process.env.NODE_ENV == 'development'
        ? cookies['next-auth.session-token']
        : cookies['__Secure-next-auth.session-token'];

    let output = {
        isAdmin: false,
        isUser: false,
        isPro: false,
        verified: false,
        message: "User not Verified"
    }
    if (!token)
        return output

    let decoded = await decode({
        token,
        secret,
    });
    if (decoded.user.email.id)
        output = { ...output, isUser: true }
    if (decoded.user.role === "admin")
        output = { ...output, isAdmin: true, isPro: true }

    if (decoded.user.account_type === "premium")
        output = { ...output, isPro: true }

    const _output = verifyUser(decoded, user);

    return {
        ...output,
        ..._output,
    }




}
function verifyUser(tokenUser, DbUser) {

    if (tokenUser.user.id !== DbUser._id.toString())
        return {
            verified: false,
            message: "User Id doesn't match with DB"
        }
    if (tokenUser.user.email !== DbUser.email)
        return {
            verified: false,
            message: "User Email doesn't match with DB"
        }
    if (tokenUser.user.account_type !== DbUser.account_type)
        return {
            verified: false,
            message: "User Account Type doesn't match with DB"
        }
    if (tokenUser.user.role !== DbUser.role)
        return {
            verified: false,
            message: "User Role doesn't match with DB"
        }



    return {
        verified: true,
        message: "User Verified with DB"
    }


}
