import OpenAI from "openai";
const openai = new OpenAI();
import { z } from "zod"
import { zodTextFormat } from "openai/helpers/zod";
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
      "The question should be in " + language + ". The answer should be a single word or a short phrase.";
  }
  const response = await openai.responses.create({
    model: "gpt-6-luna",
    service_tier: "default",
    input: [
      {
        role: "user",
        content: prompt
      }
    ],
    text: {
      format: zodTextFormat(quizQuestion, "question"),
    },
    reasoning: {
      effort: "low",
      mode: "standard",
      summary: "auto",
    },
  });

  if (response.status !== "completed") {
    throw new Error(response.error?.message ??
      `Question generation did not complete: ${response.incomplete_details?.reason ?? response.status}`);
  }
  if (!response.output_text) {
    throw new Error("Question generation returned no text");
  }

  return response.output_text
}