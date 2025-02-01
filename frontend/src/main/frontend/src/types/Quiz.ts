import { QuizQuestion } from "@/types/QuizQuestion"

export type Quiz = {
  id: string
  name: string
  questions: QuizQuestion[]
  lastModified: Date
}
