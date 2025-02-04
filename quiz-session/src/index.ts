import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";
import { startEurekaClient } from "./eurekaConnection";
import { quizStates, getDefaultQuizState } from "./state";

dotenv.config()

export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000

const app = express()
export const server = http.createServer(app)

// Import the Socket.IO server setup.
import "./io"

// TODO remove in production
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}))

app.use(express.json())

startEurekaClient()

app.get("/", (req: Request, res: Response) => {
  res.send("Quiz Session Service is Running! 🚀")
})

// GET endpoint to fetch the current quiz state.
app.get("/quiz/:quizID", (req: Request, res: Response) => {
  const quizID = req.params.quizID
  if (!quizStates[quizID]) {
    quizStates[quizID] = getDefaultQuizState(quizID)
  }
  console.log(`Sending quiz state for quiz ${quizID}: ${JSON.stringify(quizStates[quizID])}`)
  res.json(quizStates[quizID])
})

server.listen(PORT, () => {
  console.log(`Session service running on http://localhost:${PORT}`)
})