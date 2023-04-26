import { getServerSession } from "next-auth/next";
import { authOptions } from '@pages/api/auth/[...nextauth]';
import { getToken } from "next-auth/jwt";

// const secret = process.env.NEXT_AUTH_SECRET;


// CHECKING FUNCTIONS
export const hasToken = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions)

    if (!session) {
        return false
    }
    return true
}
export const isAdmin = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions)
    if (!session || session.user.role !== 'admin') {
        return false
    }
    return true
}
export const getUser = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions)
    if (!session || !session.user) {
        return null
    }
    return token.user
}


// API MIDDLEWARE
export const hasTokenMiddleware = async (req, res, next) => {
    const token = await getToken({ req, secret })
    if (!token) {
        return next(new Error('Not Allowed - Not logged in'))
    }
    next()
}
export const isAdminMiddleware = async (req, res, next) => {
    const token = await getToken({ req, secret })
    if (!token) {
        return next(new Error('Not Allowed - Not logged in'))
    }
    if (token.user.role !== 'admin') {
        return next(new Error('Not Allowed - Not admin'))
    }
    next()
}
