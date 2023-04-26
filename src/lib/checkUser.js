import { getToken, decode } from "next-auth/jwt"
import { getSession } from "next-auth/react"

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
export const hasTokenMiddleware = async (req, res, next) => {
    const token = await getToken({ req, secret })
    // const session = await getToken({ req })

    if (!token) {
        return next(new Error('Not Allowed - Not logged in'))
    }
    next()
}
export const isAdminMiddleware = async (req, res, next) => {
    // const token = await getToken({ req, secret })
    const session = await getToken({ req })

    
    if (!session) {
        return next(new Error('Not Allowed - Not logged in'))
    }
    if (session.user.role !== 'admin') {
        return next(new Error('Not Allowed - Not admin'))
    }
    next()
}
export const isProMiddleware = async (req, res, next) => {
    const session = await getToken({ req })
    if (!session) {
        return next(new Error('Not Allowed - Not logged in'))
    }
    if (session.user.account_type !== 'premium') {
        return next(new Error('Not Allowed - Not Pro'))
    }
    next()
}