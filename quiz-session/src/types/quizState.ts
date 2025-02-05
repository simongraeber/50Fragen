import { UserScore } from "./user"
import { TextAnswer } from "./textAnswer"

export type QuizState = {
  id: string;
  name: string;
  ownerID?: string;
  participantsScores: UserScore[];
  active: boolean;
  currentQuestion?: string;
  textAnswers?: TextAnswer[];
  currentQuestionType?: string;
};