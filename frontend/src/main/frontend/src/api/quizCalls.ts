import { Quiz } from "@/types/Quiz.ts"
import { GET, PUT } from "@/lib/http"

/**
 * returns the quiz with the given id
 * including all questions
 * @param quizId the id of the quiz
 */
export const getQuiz = async (quizId: string) => {
  return await GET<Quiz>(`/quiz/${quizId}`)
}

/**
 * returns all quizzes
 * without the questions
 * @returns all quizzes
 */
export const getAllQuizzes = async () => {
  return [
    {
      id: "session1",
      name: "Sample Session 1",
      questions: [],
      lastModified: new Date("2024-01-01T10:00:00Z"),
    },
    {
      id: "session2",
      name: "Sample Session 2",
      questions: [],
      lastModified: new Date("2023-07-15T15:30:00Z"),
    },
    {
      id: "session3",
      name: "Sample Session 3",
      questions: [],
      lastModified: new Date("2025-12-25T09:00:00Z"),
    },
  ]
  return await GET<Quiz[]>("/quiz")
}

/**
 * creates a new empty quiz
 * @returns the newly created quiz
 */
export const createQuiz = async () => {
  return await PUT<Quiz, undefined>("/quiz", undefined)
}

/**
 * updates the quiz with the given id
 * @param quiz the updated quiz
 */
export const updateQuiz = async (quiz: Partial<Quiz>) => {
  return await PUT<Quiz, Partial<Quiz>>(`/quiz/${quiz.id}`, quiz)
}


