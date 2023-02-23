import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
// import Providers from 'next-auth/providers';
import clientPromise from "@/libs/mongodb";
// import { compare } from 'bcryptjs';

export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),

    //Configure JWT
    session: {
        jwt: true,
    },
    //Specify Provider
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),

    ],
    secret: process.env.NEXT_AUTH_SECRET,
    // Providers.Credentials({
    //     async authorize(credentials) {
    //         //Connect to DB
    //         const client = await clientPromise;
    //         const users = await client.db("kkupgrader").collection('users');

    //         //Find user with the email  
    //         const result = await users.findOne({
    //             email: credentials.email,
    //         });
    //         //Not found - send error res
    //         if (!result) {
    //             client.close();
    //             throw new Error('No user found with the email');
    //         }
    //         const checkPassword = await compare(credentials.password, result.password);
    //         //Incorrect password - send response
    //         if (!checkPassword) {
    //             client.close();
    //             throw new Error(`Password doesn't match`);
    //         }
    //         //Else send success response
    //         client.close();
    //         return { email: result.email };
    //     },
    // }),
});