import { emitEvent, onEvent, socketServerURL } from "@/api/socket.ts"
import { GET } from "@/lib/http.ts"
import { QuizState } from "@/types/gamePlay/QuizState.ts"
import { GameState } from "@/types/gamePlay/gameState.ts"
import { Buzz } from "@/types/gamePlay/buzz.ts"

/**
 * Joins a quiz room.
 * @param {string} quizID - The quiz identifier.
 */
const _joinQuizRoom = (quizID: string): void => {
  emitEvent<string>("joinGame", quizID)
}

/**
 * Connects to a quiz room.
 * @param {string} quizID - The quiz identifier.
 * @example
 * const quizState: QuizState = await connectToGame("quiz-1");
 */
export const connectToGame = async (quizID: string): Promise<QuizState> => {
  _joinQuizRoom(quizID)
  return await GET<QuizState>(`${socketServerURL}/quiz/${quizID}`)
}

/**
 * Hits the buzz button. The user trying to buzz in is identified by the userID.
 * @param {string} quizID
 * @example
 * hitBuzz("quiz-1", "user-1");
 */
export const hitBuzz = (quizID: string): void => {
  emitEvent<{ quizID: string }>("buzz", { quizID })
}

/**
 * Sets up a listener for receiving buzz events from the server.
 * @param {(buzz: Buzz) => void} callback - The callback function to handle the buzz event.
 * @example
 * buzz((buzz) => {
 *   console.log("User buzzed in:", buzz);
 * });
 */
export const buzz = (callback: (buzz: Buzz) => void): void => {
  onEvent("buzz", (buzz: Buzz) => {
    callback(buzz)
  })
}

/**
 * Set the game to active for all users (e.g., after giving points to the last user).
 * @param {string} quizID
 * @example
 * setGameActive("quiz-1");
 */
export const setGameActive = (quizID: string): void => {
  emitEvent<string>("setGameActive", quizID)
}

/**
 * Set the game to inactive for all users (e.g., no more answers are accepted).
 * @param {string} quizID
 * @example
 * setGameInactive("quiz-1");
 */
export const setGameInactive = (quizID: string): void => {
  emitEvent<string>("setGameInactive", quizID)
}

/**
 * Updates the user's score.
 * @param {string} quizID
 * @param {string} userID
 * @param {number} score
 * @example
 * updateUserScore("quiz-1", "user-1", 10);
 */
export const updateUserScore = (quizID: string, userID: string, score: number): void => {
  emitEvent<{ quizID: string; userID: string; score: number }>("updateUserScore", { quizID, userID, score })
}

/**
 * Updates the scores of multiple users.
 * @param {{quizID: string, userID: string; score: number }[]} scores - An array of objects containing the quizID, userID, and score.
 * @example
 * updateUserScores([
 *  { quizID: "quiz-1", userID: "user-1", score: 10 },
 *  { quizID: "quiz-1", userID: "user-2", score: 20 },
 *  ]);
 */
export const updateUserScores = (scores: {quizID: string, userID: string; score: number }[]): void => {
  emitEvent<{ quizID: string; userID: string; score: number }[]>("updateUserScores", scores)
}

/**
 * Sets up a listener for receiving user score update events from the server.
 * @param {(data: { quizID: string; userID: string; score: number }) => void} callback - The callback function to handle the score update event.
 * @example
 * userScoreUpdated((data) => {
 *   console.log("Received user score update:", data);
 * });
 */
export const userScoreUpdated = (
  callback: (data: { quizID: string; userID: string; score: number }) => void
): void => {
  onEvent("userScoreUpdated", (data: { quizID: string; userID: string; score: number }) => {
    callback(data)
  })
}

/**
 * Sets up a listener for when the game is switched to active or inactive.
 * @param {(data: GameState) => void} callback - The callback function to handle the game state change.
 * @example
 * switchedToActiveOrInactive((gameState) => {
 *   console.log("Game state updated:", gameState);
 * });
 */
export const switchedToActiveOrInactive = (
  callback: (data: GameState) => void
): void => {
  onEvent("switchedToActiveOrInactive", (gameState: GameState) => {
    callback(gameState)
  })
}

/**
 * Shows a question to all users.
 * @param {string} quizID
 * @param {string} question
 * @example
 * showQuestion("quiz-1", "What is the capital of France?");
 */
export const showQuestion = (quizID: string, question: string): void => {
  emitEvent<{ quizID: string; question: string }>("showQuestion", { quizID, question })
}

/**
 * Sets up a listener for when a question is shown to all users.
 * @param {(data: { quizID: string; question: string }) => void} callback - The callback function to handle the question event.
 * @example
 * onShowQuestion((data) => {
 *  console.log("Received question:", data);
 *  });
 */
export const onShowQuestion = (callback: (data: { quizID: string; question: string }) => void): void => {
  onEvent("questionShown", (data: { quizID: string; question: string }) => {
    callback(data)
  })
}

export const newQuestion = (quizID: string, questionType: string): void => {
  emitEvent<{ quizID: string; questionType: string }>("newQuestion", { quizID, questionType })
}

export const onNewQuestion = (callback: (data: { quizID: string; questionType: string }) => void): void => {
  onEvent("newQuestion", (data: { quizID: string; questionType: string }) => {
    callback(data)
  })
}

export const newTextAnswer = (quizID: string, answer: string): void => {
  emitEvent<{ quizID: string; answer: string }>("newTextAnswer", { quizID, answer })
}

export const onNewTextAnswers = (callback: (data: { quizID: string; currentAnswers: { userID: string; text: string }[] }) => void): void => {
  onEvent("newTextAnswers", (data: { quizID: string; currentAnswers: { userID: string; text: string }[] }) => {
    callback(data)
  })
}

export const showTextAnswers = (quizID: string): void => {
  emitEvent<string>("showTextAnswers", quizID)
}

export const onQuizState = (callback: (data: QuizState) => void): void => {
  onEvent("quizState", (data: QuizState) => {
    callback(data)
  })
}