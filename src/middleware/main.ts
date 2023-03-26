import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';


// import Cors from 'cors'

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
// const cors = Cors({
//     methods: ['POST', 'GET', 'HEAD'],
// })

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: Function
) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}
export const middleware = async (request: NextRequest) => {
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const authCookie = request.cookies.get('kkupgrader-admin-token');
        if (!authCookie) return NextResponse.redirect(new URL('/', request.url));
    }
};


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Run the middleware
    // await runMiddleware(req, res, cors)

    // Rest of the API logic
    res.json({ message: 'Hello Everyone!' })
}