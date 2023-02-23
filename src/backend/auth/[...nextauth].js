import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@libs/mongodb"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import axios from "axios"

export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.NEXT_AUTH_SECRET,
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Enter email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter Password",
                },
            },

            async authorize(credentials, req) {
                const { email, password } = credentials;
                const res = await axios(`${process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.WEBSITE_URL}/api/auth/login`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        data: JSON.stringify({ email, password })
                    })

                const user = await res.json();
                if (res.ok && user) {
                    return user;
                } else return null;
            },
        }),
        // ...add more providers here
    ],
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken
            return session
        }
    },
    pages: {
        signIn: '/admin/login',
    }
}
export default NextAuth(authOptions)