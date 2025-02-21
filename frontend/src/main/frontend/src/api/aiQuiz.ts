import { POST } from "@/lib/http.ts"
import { QuizQuestion, QuizQuestionType } from "@/types/QuizQuestion.ts"


export const aiQuizBasePath = '/ai-quiz'

export const generateAiQuestion =
  async (category: string, language: string, questionType: QuizQuestionType) => {
  return await POST<Partial<QuizQuestion>, {category: string, language: string, type: QuizQuestionType}>
  (`${aiQuizBasePath}/generate-question`,
    {category: category, language: language, type: questionType})
}