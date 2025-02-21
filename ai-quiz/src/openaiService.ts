import OpenAI from "openai";
const openai = new OpenAI();
import { string, z } from "zod"
import { zodResponseFormat } from "openai/helpers/zod";
import { QuizQuestionType } from "./types/QuizQuestion"


const quizQuestion = z.object({
  question: z.string(),
  answer: z.string()
})

export const generateQuestion = async (category: string, language: string, questionType: QuizQuestionType) => {
  let prompt: string;
  if (questionType === "estimationquestion") {
    prompt = "Generate a estimation question for the category " + category + "." +
      "The question should be in " + language + " and the answer should be a number eg in kg, km, a year etc.";
 } else {
    prompt = "Generate a quiz question for the category " + category + "." +
      "The question should be in " + language + ".";
  }
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    response_format: zodResponseFormat(quizQuestion, "question"),
  });

  return completion.choices[0].message.content
}