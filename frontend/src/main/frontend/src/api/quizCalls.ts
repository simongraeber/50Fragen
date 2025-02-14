import { Quiz } from "@/types/Quiz.ts"
import { GET, PUT, DELETE, POST } from "@/lib/http"

export const quizBasePath = '/quiz-database/quizzes'

/**
 * returns the quiz with the given id
 * including all questions
 * @param quizId the id of the quiz
 */
export const getQuiz = async (quizId: string) => {
  return await GET<Quiz>(`${quizBasePath}/${quizId}`)
}

/**
 * returns the quiz with the given id
 * including all questions if the user has access
 * @param quizId the id of the quiz
 */
export const getQuizOrNull = async (quizId: string) => {
  return await GET<Quiz | null>(`${quizBasePath}/${quizId}/access`)
}

/**
 * returns all quizzes
 * without the questions
 * @returns all quizzes
 */
export const getAllQuizzes = async () => {
  return await GET<Quiz[]>(quizBasePath)
}

/**
 * creates a new empty quiz
 * @returns the newly created quiz with id
 */
export const createQuiz = async (quiz: Partial<Quiz>) => {
  return await POST<Quiz, Partial<Quiz>>(quizBasePath, quiz)
}

/**
 * updates the quiz with the given id
 * @param quiz the updated quiz
 */
export const updateQuiz = async (quiz: Partial<Quiz>) => {
  console.log(quiz)
  return await PUT<Quiz, Partial<Quiz>>(`${quizBasePath}/${quiz.id}`, quiz)
}

/**
 * deletes the quiz with the given id
 * @param quizId the id of the quiz
 */
export const deleteQuiz = async (quizId: string) => {
  return await DELETE(`${quizBasePath}/${quizId}`)
}


