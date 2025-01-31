import { QuizQuestion } from "@/types/QuizQuestion"

export type QuizQuestionSession = {
  id: string
  name: string
  questions: QuizQuestion[]
  lastModified: Date
}
