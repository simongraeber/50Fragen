import { QuizState } from "./types/quizState"
import { pool } from "./database"

export const quizStates: { [quizID: string]: QuizState } = {}

export function getQuizState(quizID: string, forOwner: boolean): QuizState | null {
  const quizState = quizStates[quizID];
  if (!quizState) {
    return null;
  }
  if (forOwner) {
    console.log("Returning quiz state for owner");
    return {
      ...quizState,
      textAnswers: quizState.textAnswersForOwnerOnly,
    };
  }
  return {
    ...quizState,
    textAnswersForOwnerOnly: [],
  }
}

export async function getCurrentQuizState(quizID: string): Promise<QuizState> {

    const query = 'SELECT name, user_id FROM quizzes WHERE id = $1';
    const result = await pool.query(query, [quizID]);

    if (result.rows.length > 0) {
      const { name, user_id } = result.rows[0];
      return {
        id: quizID,
        ownerID: user_id,
        name: name,
        currentQuestion: "",
        participantsScores: [],
        active: true,
        currentQuestionType: "buzzerquestion",
        textAnswers: [],
        textAnswersForOwnerOnly: [],
      };
    } else {
      throw new Error("Quiz not found");
    }
}