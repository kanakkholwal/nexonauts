import { getToken } from "next-auth/jwt"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@pages/api/auth/[...nextauth]";

const secret = process.env.NEXT_AUTH_SECRET;


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
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
        return next(new Error('Not Allowed - Not logged in'))
    }
    next()
}
export const isAdminMiddleware = async (req, res, next) => {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
        return next(new Error('Not Allowed - Not logged in'))
    }
    if (session.user.role !== 'admin') {
        return next(new Error('Not Allowed - Not admin'))
    }
    next()
}
