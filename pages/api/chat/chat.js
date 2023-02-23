import clientPromise from "@libs/mongodb";

import { Server } from "socket.io";
import messageHandler from "@utils/socket";



export default async function handler(req, res) {
    const client = await clientPromise;
    const db = await client.db("kkupgrader");
    const chats = await db.collection('chats');

    const { method } = req;
    const { email } = req.body;
    try {
        if (res.socket.server.io) {
            console.log("Already set up");
            res.end();
            return;
        }

        const io = new Server(res.socket.server);
        res.socket.server.io = io;

        const onConnection = (socket) => {
            messageHandler(io, socket);
        };

        // Define actions inside
        io.on("connection", onConnection);

        console.log("Setting up socket");
        res.end();
        if (method === "POST") {
            const message = req.body;
            chats.save({ userId: email, ...message });

            // dispatch to channel "message"
            res?.socket?.server?.io?.emit("message", message);

            // return message
            res.status(201).json(message);
        }


    }
    catch (err) {
        console.log(err);
    }
}