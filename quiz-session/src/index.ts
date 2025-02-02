import express, { Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { Eureka } from "eureka-js-client";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // TODO change this later
        methods: ["GET", "POST"],
    },
});
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

const eurekaClient = new Eureka({
    instance: {
        app: "quiz-session",
        instanceId: `quiz-session:${PORT}`,
        hostName: "localhost",
        ipAddr: "127.0.0.1",
        statusPageUrl: `http://localhost:${PORT}`,
        port: {
            $: PORT,
            "@enabled": true,
        },
        vipAddress: "quiz-session",
        dataCenterInfo: {
            "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
            name: "MyOwn",
        },
    },
    eureka: {
        host: process.env.EUREKA_HOST || "localhost",
        port: process.env.EUREKA_PORT ? parseInt(process.env.EUREKA_PORT, 10) : 8761,
        servicePath: "/eureka/apps/",
    },
});

eurekaClient.start((error: Error) => {
    if (error) {
        console.error("Failed to register with Eureka:", error);
    } else {
        console.log("Successfully registered with Eureka.");
    }
});

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Session Service is Running! 🚀 \n"
        + "Eureka configuration: \n"
        + `Eureka host: ${process.env.EUREKA_HOST || "localhost"} \n`
        + `Eureka port: ${process.env.EUREKA_PORT || 8761} \n`
        + `Session service port: ${PORT}`);
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join-session", (sessionId: string) => {
        console.log(`User ${socket.id} joined session: ${sessionId}`);
        socket.join(sessionId);

        socket.to(sessionId).emit("user-joined", { userId: socket.id });
    });

    socket.on("send-message", (data: { sessionId: string; message: string }) => {
        const { sessionId, message } = data;
        console.log(`Message from ${socket.id} in session ${sessionId}: ${message}`);
        socket.to(sessionId).emit("receive-message", { userId: socket.id, message });
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

server.listen(PORT, () => {
    console.log(`Session service running on http://localhost:${PORT}`);
});
