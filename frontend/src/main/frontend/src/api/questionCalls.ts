import { QuizQuestion } from "@/types/QuizQuestion.ts"
import { PUT, POST, DELETE } from "@/lib/http"

/**
 * creates a new question for a quiz
 * @param question the question to be created
 * @returns the newly created question with id
 */
export const createQuestion = async (question: Partial<QuizQuestion>) => {
  return await POST<QuizQuestion, Partial<QuizQuestion>>("/question", question)
}

/**
 * updates an existing question
 * @param question the updated question object
 * @returns the updated question
 */
export const updateQuestion = async (question: Partial<QuizQuestion>) => {
  return await PUT<QuizQuestion, Partial<QuizQuestion>>(`/question/${question.id}`, question)
}

/**
 * deletes a question with the given id
 * @param questionId the id of the question
 */
export const deleteQuestion = async (questionId: string) => {
  return await DELETE(`/question/${questionId}`)
}