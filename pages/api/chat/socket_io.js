import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req, res) => {
    if (!res.socket.server.io) {
        console.log("New Socket.io server...");
        // adapt Next's net Server to http Server
        const httpServer = res.socket.server;
        const io = new ServerIO(httpServer, {
            path: "/api/chat/socket_io",
        });
        // append SocketIO server to Next.js socket server response
        res.socket.server.io = io;
    }
    res.end();
};
