import { Score } from "@/types/gamePlay/Score.ts"
import { TextAnswer } from "@/types/gamePlay/TextAnswer.ts"


export type QuizState = {
  id: string;
  name: string;
  participantsScores: Score[];
  active: boolean;
  currentQuestion?: string;
  textAnswers?: TextAnswer[];
  currentQuestionType?: string;
};