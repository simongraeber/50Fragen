import { Router, Request, Response } from "express"
import { generateQuestion } from "./openaiService"
import { QuizQuestionType } from "./types/QuizQuestion"

const router = Router()

router.get("/", (req: Request, res: Response) => {
  res.send("AI Quiz Service is Running! 🚀")
})

router.post("/generate-question", async (req: Request, res: Response) => {
  const category = req.body.category as string
  const language = req.body.language as string
  const questionType = req.body.type as QuizQuestionType
  const question = await generateQuestion(category, language, questionType)
  console.log(question)
  res.send(question)
})

export default router