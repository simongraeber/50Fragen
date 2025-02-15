import express, { Request, Response } from "express"
import http from "http"
import dotenv from "dotenv"
import cors from "cors"
import { startEurekaClient } from "./eurekaConnection"
import { quizStates, getCurrentQuizState, getQuizState } from "./state"

dotenv.config()

export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000

const app = express()
export const server = http.createServer(app)

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
app.get("/quiz-session/quiz/:quizID", async (req: Request, res: Response) => {
  const quizID = req.params.quizID
  // Get the user form the headers
  const user = {
    id: req.headers["x-user-id"] as string,
    name: req.headers["x-user-name"] as string,
    image: req.headers["x-user-image"] as string,
  }
  if (!quizStates[quizID]) {
    console.log("Fetching quiz state")
    quizStates[quizID] = await getCurrentQuizState(quizID)
  }

  if (quizStates[quizID].ownerID != user.id &&
    !quizStates[quizID].participantsScores.find(s => s.user.id === user.id)) {
    console.log("Adding user to participants")
    quizStates[quizID].participantsScores.push({
      user,
      score: 0
    })
  }
  res.json(getQuizState(quizID, user.id === quizStates[quizID].ownerID))
})

server.listen(PORT, () => {
  console.log(`Session service running on http://localhost:${PORT}`)
})