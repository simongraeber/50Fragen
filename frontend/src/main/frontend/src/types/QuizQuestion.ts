export type QuizQuestionType = "buzzerquestion" | "estimationquestion"

export type QuizQuestion = {
  id: string
  question: string
  answer: string
  quizId?: string
  type: QuizQuestionType
}