export type QuizQuestionType = "buzzerquestion" | "estimationquestion"

export type QuizQuestion = {
  id: string
  question: string
  type: QuizQuestionType
}