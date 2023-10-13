import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
// import AppleProvider from "next-auth/providers/apple";

import User from "models/user";
import Notification from "models/notification";
import dbConnect from "lib/dbConnect";

export const authOptions = {
    // Enable JSON Web Tokens since we will not store sessions in our DB
    session: {
        jwt: true,
    },
    secret: process.env.NEXT_AUTH_SECRET,

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


                // return Promise.resolve(user)
                return new Promise(async(resolve, reject) => {
                    try{

                        await dbConnect();


                        // Try to find the user and also return the password field
                        const user = await User.findOne({ email: credentials.email }).select('+password')
        
                        if(!user){
                            reject({
                                status: 401,
                                message: "User not found",
                                success: false
                            })
                        }
        
                        // Use the comparePassword method we defined in our user.js Model file to authenticate
                        const pwValid = await user.comparePassword(credentials.password)
        
        
                        if (!pwValid) {
                            await Notification.create({
                                message: "User attempted to login with wrong Password",
                                user: user._id
                            });
        
                            reject({
                                status: 401,
                                message: "Wrong Password",
                                success: false
                            })

                        }
        
                        await Notification.create({
                            message: "User logged in using Email and Password",
                            user: user._id
                        });
        
                        // console.log(user)
                        resolve(user)
        
                    }
                    catch(err){

                        console.log(err)
                        reject(err)
                    }
                })

            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization: {
              params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code"
              }
            },
            async profile(profile) {
                try{
                    console.log(profile);
                    await dbConnect();
                    const userInDb = await User.findOne({email: profile.email})
                    if (!userInDb) {

                        const user = new User({
                            name:profile.name,
                            email: profile.email,
                            profileURL: profile.picture,
                            password: "google" + profile.sub,
                            role: "user",
                            account_type: "free",
                            verificationToken: null,
                            verified: true,
                        });
                        await user.save();
                        
                        
                        await Notification.create({
                            message: "User logged in using Google SignIn",
                            user: user._id,
                            type: "system",
                            subtype: "login"
                        });
                        return Promise.resolve(user);
                    }
                    await Notification.create({
                        message: "User logged in using Google SignIn",
                        user: userInDb._id,
                        type: "system",
                        subtype: "login"
                    });

                    return Promise.resolve(userInDb)
                }
                catch(err){
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
        async jwt({ token, user }) {
            if (user) {
                token.user = {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    profileURL: user.profileURL,
                    role: user.role,
                    account_type: user.account_type,
                    username:user.username,
                    verified:user.verified
                }
            }
            return token
        },
        // If we want to access our extra user info from sessions we have to pass it the token here to get them in sync:
        session: async ({ session, token }) => {
            if (token) {
                session.user = token.user
            }
            return session
        }
    },
    site: process.env.NEXTAUTH_URL,

    pages: {
        // Here you can define your own custom pages for login, recover password, etc.
        signIn: '/login', // Displays sign in buttons
        // signOut: '/auth/sign out',
        // error: '/auth/error',
        // verifyRequest: '/auth/verify-request',
        newUser: '/signup'
    },
}
export default NextAuth(authOptions)


