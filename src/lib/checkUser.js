import { getToken, decode } from "next-auth/jwt"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@pages/api/auth/[...nextauth]"

const secret = process.env.NEXT_AUTH_SECRET;


// CHECKING FUNCTIONS
export const hasToken = async (req) => {
    const token = await getToken({ req, secret })
    if (!token) {
        return false
    }
    return true
}
export const isAdmin = async (req) => {
    const token = await getToken({ req, secret });
    if (!token || token.user.role !== 'admin') {
        return false
    }
    return true
}
export const isPro = async (req) => {
    const token = await getToken({ req, secret });
    if (!token || token.user.account_type !== 'premium') {
        return false
    }
    return true
}
export const getUser = async (req) => {
    const token = await getToken({ req, secret })
    if (!token || !token.user) {
        return null
    }
    return token.user
}
export const getUserFromRequest = async (req) => {
    const token = await getToken({ req, secret })

    const decoded = await decode({
        token,
        secret,
    })
    return decoded
}

// API MIDDLEWARE
export const hasTokenMiddleware = async (req, res) => {
    // const token = await getToken({ req, secret })
    const session = await getServerSession(req, res, authOptions)

    console.log(session)
    if (!session) {
        return res.status(403).json({ error: 'Not Allowed - Not logged in' })
        // return next(new Error('Not Allowed - Not logged in'))
    }
    // next()
}
export const isAdminMiddleware = async (req, res, next) => {
    // const token = await getToken({ req, secret })
    const session = await getServerSession(req, res, authOptions)

    
    if (!session) {
        return res.status(403).json({ error: 'Not Allowed - Not logged in' })
    }
    if (session.user.role !== 'admin') {
        return res.status(403).json({ error: 'Not Allowed - Not admin' })
    }
    next()
}
export const isProMiddleware = async (req, res, next) => {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        return res.status(403).json({ error: 'Not Allowed - Not logged in' })
        // return next(new Error('Not Allowed - Not logged in'))
    }
    if (session.user.account_type !== 'premium') {
        return res.status(403).json({ error: 'Not Allowed - Not Pro' })
        // return next(new Error('Not Allowed - Not Pro'))
    }
    next()
}