import { QuizState } from "./types/quizState"
import { pool } from "./database"

export const quizStates: { [quizID: string]: QuizState } = {}

export async function getCurrentQuizState(quizID: string): Promise<QuizState> {
  try {
    const query = 'SELECT name, user_id FROM quizzes WHERE id = $1';
    const result = await pool.query(query, [quizID]);

    if (result.rows.length > 0) {
      const { name, userId } = result.rows[0];
      return {
        id: quizID,
        ownerID: userId,
        name: name,
        currentQuestion: "",
        participantsScores: [],
        active: true,
        currentQuestionType: "buzzerquestion",
        textAnswers: [],
      };
    }
    console.error("Quiz not found in DB");
    return getEmptyQuizState(quizID);
  } catch (error) {
    console.error("Error retrieving quiz from DB: ", error);
    return getEmptyQuizState(quizID);
  }
}

export function getEmptyQuizState(quizID: string): QuizState {
  return {
    id: quizID,
    ownerID: "",
    name: `Quiz placeholder ${quizID}`,
    currentQuestion: "",
    participantsScores: [
    ],
    active: true,
    currentQuestionType: "buzzerquestion",
    textAnswers: [],
  }
}