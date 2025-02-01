import { Quiz } from "@/types/Quiz.ts"
import { GET, PUT, DELETE} from "@/lib/http"

/**
 * returns the quiz with the given id
 * including all questions
 * @param quizId the id of the quiz
 */
export const getQuiz = async (quizId: string) => {
  await new Promise(resolve => setTimeout(resolve, 3000))
  if (quizId === "new-quiz") {
    return {
      id: "new-quiz",
      name: "New Quiz",
      questions: [
        {
          id: "question1",
          question: "What is the capital of Germany?",
          answer: "Berlin",
          type: "estimationquestion",
        },
        {
          id: "question2",
          question: "What is the capital of France?",
          answer: "Paris",
          type: "estimationquestion",
        },
      ],
      lastModified: new Date(),
    }
  }
  return await GET<Quiz>(`/quiz/${quizId}`)
}

/**
 * returns all quizzes
 * without the questions
 * @returns all quizzes
 */
export const getAllQuizzes = async () => {
  await new Promise(resolve => setTimeout(resolve, 3000))
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
 * @returns the newly created quiz with id
 */
export const createQuiz = async () => {
  await new Promise(resolve => setTimeout(resolve, 3000))
  return {
    id: "new-quiz",
    name: "New Quiz",
  }
  return await PUT<Partial<Quiz>, undefined>("/quiz", undefined)
}

/**
 * updates the quiz with the given id
 * @param quiz the updated quiz
 */
export const updateQuiz = async (quiz: Partial<Quiz>) => {
  return await PUT<Quiz, Partial<Quiz>>(`/quiz/${quiz.id}`, quiz)
}

/**
 * deletes the quiz with the given id
 * @param quizId the id of the quiz
 */
export const deleteQuiz = async (quizId: string) => {
  return await DELETE(`/quiz/${quizId}`)
}


