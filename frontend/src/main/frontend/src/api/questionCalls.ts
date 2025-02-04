import { QuizQuestion } from "@/types/QuizQuestion.ts"
import { PUT, POST, DELETE } from "@/lib/http"
import { quizBasePath } from "@/api/quizCalls"

/**
 * creates a new question for a quiz
 * @param question the question to be created
 * @returns the newly created question with id
 */
export const createQuestion = async (question: Partial<QuizQuestion>) => {
  return await POST<QuizQuestion, Partial<QuizQuestion>>(`${quizBasePath}/${question.quizId}/questions`, question)
}

/**
 * updates an existing question
 * @param question the updated question object
 * @returns the updated question
 */
export const updateQuestion = async (question: Partial<QuizQuestion>) => {
  return await PUT<QuizQuestion, Partial<QuizQuestion>>(`${quizBasePath}/${question.quizId}/questions/${question.id}`, question)
}

/**
 * deletes a question with the given id
 * @param question the question to be deleted
 */
export const deleteQuestion = async (question: Partial<QuizQuestion>) => {
  return await DELETE(`${quizBasePath}/${question.quizId}/questions/${question.id}`)
}