import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "src/lib/dbConnect";
import UserModel from "src/models/user";
// Define types for environment variables
interface AuthEnv {
    GOOGLE_ID: string;
    GOOGLE_SECRET: string;
    NEXT_AUTH_SECRET: string;
    NEXTAUTH_URL: string;
}

// Define types for user object
interface User {
    _id: string;
    id?: string;
    name: string;
    email: string;
    username: string;
    account_type?: string;
    profileURL: URL;
    role?: string;
    verified?: boolean;
    provider: string;
}
// Read environment variables
const env: AuthEnv = {
    GOOGLE_ID: process.env.GOOGLE_ID || "",
    GOOGLE_SECRET: process.env.GOOGLE_SECRET || "",
    NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET || "",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "",

};

// Check if all required environment variables are defined
Object.values(env).forEach((value) => {
    if (!value) {
        throw new Error(`Environment variable ${value} is not defined`);
    }
});
const useSecureCookies = env.NEXTAUTH_URL.startsWith('https://')
const cookiePrefix = useSecureCookies ? '__Secure-' : ''
const hostName = new URL(env.NEXTAUTH_URL).hostname;

export const authOptions: NextAuthOptions = {
    // Enable JSON Web Tokens since we will not store sessions in our DB
    session: {
        strategy: "jwt",
    },
    secret: env.NEXT_AUTH_SECRET,
    cookies: {
        sessionToken: {
            name: `${useSecureCookies ? "__Secure-" : ""}next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: useSecureCookies,
                domain: hostName == 'localhost' ? hostName : '.' + "nexonauts.com" // add a . in front so that subdomains are included

            }
        },
    },

    // Here we add our login providers - this is where you could add Google or Github SSO as well
    providers: [
        CredentialsProvider({
            name: "credentials",
            // The credentials object is what's used to generate Next Auth default login page - We will not use it however.
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            // Authorize callback is ran upon calling the sign-in function
            authorize: async (credentials) => {
                return new Promise(async (resolve, reject) => {
                    if (!credentials || !credentials.email || !credentials.password) {
                        return reject({
                            status: 401,
                            message: "Credentials not provided",
                            success: false
                        })
                    }
                    try {
                        await dbConnect();
                        const userInDb = await UserModel.findOne({ email: credentials.email }).select('+password')

                        if (!userInDb) 
                            return reject({
                                status: 401,
                                message: "User not found",
                                success: false
                            })
                        const pwValid = await userInDb.comparePassword(credentials.password);
                    
                        if (!pwValid) 
                        return  reject({
                                status: 401,
                                message: "Wrong Password",
                                success: false
                            })
                        const user = {
                            _id: userInDb._id.toString(),
                            id: userInDb._id.toString(),
                            name: userInDb.name,
                            email: userInDb.email,
                            username: userInDb.username,
                            account_type: userInDb.account_type || "free",
                            profileURL: userInDb.profileURL,
                            role: userInDb.role || "user",
                            verified: userInDb.verified || false,
                            provider: "credentials"
                        } satisfies User
                        

                        console.log("user found",user)
                        return resolve(user)

                    }
                    catch (err) {

                        console.log(err)
                        return reject(err)
                    }
                })

            }
        }),
        GoogleProvider({
            clientId: env.GOOGLE_ID || "",
            clientSecret: env.GOOGLE_SECRET || "",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },
            async profile(profile) {
                try {
                    console.log(profile);
                    await dbConnect();
                    const userInDb = await UserModel.findOne({ email: profile.email })
                    if (!userInDb) {
                        console.log("user not found, creating new user", profile)
                        const user = new UserModel({
                            name: profile.name,
                            email: profile.email,
                            username: profile.email.split("@")[0],
                            profileURL: profile.picture,
                            password: "google" + profile.sub,
                            role: "user",
                            account_type: "free",
                            verificationToken: null,
                            verified: true,
                            provider: "google"
                        });
                        await user.save();

                        return Promise.resolve(user);
                    }
                    console.log("user found", userInDb)
                    await UserModel.updateOne({ _id: userInDb._id }, {
                        $set: {
                            profileURL: profile.picture,
                            verified: true,
                        }
                    })


                    return Promise.resolve(userInDb)
                }
                catch (err) {
                    console.log(err);
                    return Promise.reject("/login?error=google_error")
                }


            },
        }),

    ],
    // All of this is just to add user information to be accessible for our app in the token/session
    callbacks: {
        // We can pass in additional information from the user document MongoDB returns
        // This could be avatars, role, display name, etc...
        async jwt({ token, user }: {
            token: any,
            user: any
        }): Promise<any> {
            if (user) {
                token.user = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    account_type: user.account_type || "free",
                    profileURL: user.profileURL,
                    role: user.role || "user",
                    verified: user.verified || false,
                    provider: user.provider
                }
            }
            return token
        },
        // If we want to access our extra user info from sessions we have to pass it the token here to get them in sync:
        session: async ({ session, token }: {
            session: any,
            token: any
        }) => {
            if (token) {
                session.user = token.user
            }
            return session
        }
    },

    pages: {
        // Here you can define your own custom pages for login, recover password, etc.
        signIn: '/', // Displays sign in buttons
        // signOut: '/auth/sign out',
        // error: '/auth/error',
        // verifyRequest: '/auth/verify-request',
        newUser: '/register'
    },
}



