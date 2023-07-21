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


// API MIDDLEWARE
export const hasTokenMiddleware = async (req, res, next) => {
    // const token = await getToken({ req, secret, raw: true })
    // const session = await getServerSession(req, res, authOptions);
    const cookies = cookie.parse(req.headers.cookie || '')
    const token = process.env.NODE_ENV == 'development'
    ? cookies['next-auth.session-token']
    : cookies['__Secure-next-auth.session-token'];
    



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
        return next(new Error({
            code: 401,
            message: 'Not Allowed - Not logged in',
            success: false
        }))
    }
    let decoded = await decode({
        token,
        secret,
    })

    if (decoded.user.role !== 'admin') {
        return next(new Error({
            code: 401,
            message: 'Not Allowed - Not admin',
            success: false
        }))
    }
    next()
}
export const hasSsrMiddleware = async (req, res, next) => {

  return new Promise(function(resolve,reject) {
    console.log(req.headers)
        const authHeader = req.headers['x-authorization'];

      if (!authHeader) {
          // If no authorization header is present, the request is not authenticated
          return reject({
              code: 401, message: 'Missing authorization header',
              success: false
          });
      }
  
        // The authorization header should have the format: "Bearer <token>"
        const [authType, token] = authHeader.split(' ');
  
        if (authType !== 'Bearer' || !token || token !== process.env.NEXT_AUTH_SECRET) {
            // If the authorization header format is incorrect, the request is not authenticated
            return res.status(401).json({
                code: 401, message: 'Invalid authorization header',
                success: false
             });
        }
        else if(token === process.env.NEXT_AUTH_SECRET){
            resolve({
                code: 200, message: 'Valid authorization header',
                success: true
            });
        }
        else {
            reject({
                code: 401, message: 'Invalid authorization header',
                success: false
            });
        }


      })
}
