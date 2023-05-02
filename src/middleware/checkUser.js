import { getToken ,decode} from "next-auth/jwt"
// import { getServerSession } from "next-auth/next"
// import { authOptions } from "@pages/api/auth/[...nextauth]";
import cookie from 'cookie';

const secret = process.env.NEXT_AUTH_SECRET;

const getTokenFromRequest = async (req) => {
    const cookies = cookie.parse(req.headers.cookie || '')
    const token = process.env.NODE_ENV == 'development'
    ? cookies['next-auth.session-token']
    : cookies['__Secure-next-auth.session-token']
    return token
}
// CHECKING FUNCTIONS
export const hasToken = async (req) => {
    const token = await getToken({ req, secret, raw: true })
    if (!token) {
        return false
    }
    return true
}

export const isAdmin = async (req) => {
    const token = await getToken({ req, secret, raw: true })
    if (!token || token.user.role !== 'admin') {
        return false
    }
    return true
}
export const getUser = async (req) => {
    const token = await getToken({ req, secret, raw: true })
    if (!token || !token.user) {
        return null
    }
    return token.user
}
// export const getUserFromRequest = async (req) => {
//     const token = await getToken({ req, secret,raw: true })

//     console.log(token)
//     const decoded = await decode({
//         token,
//         secret,
//     })
//     return decoded
// }

// API MIDDLEWARE
export const hasTokenMiddleware = async (req, res, next) => {
    // const token = await getToken({ req, secret, raw: true })
    // const session = await getServerSession(req, res, authOptions);
    const cookies = cookie.parse(req.headers.cookie || '')
    const token = process.env.NODE_ENV == 'development'
    ? cookies['next-auth.session-token']
    : cookies['__Secure-next-auth.session-token']



    if (!token) {
        return next(new Error('Not Allowed - Not logged in'))
    }
    next()
}
export const isAdminMiddleware = async (req, res, next) => {
    const cookies = cookie.parse(req.headers.cookie || '')
    const token = process.env.NODE_ENV == 'development'
    ? cookies['next-auth.session-token']
    : cookies['__Secure-next-auth.session-token']


    if (!token) {
        return next(new Error('Not Allowed - Not logged in'))
    }
    let decoded = await decode({
        token,
        secret,
    })

    if (decoded.user.role !== 'admin') {
        return next(new Error('Not Allowed - Not admin'))
    }
    next()
}
