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
 * quizState: QuizState = await connectToQuiz("quiz-1");
 */
export const connectToGame = async (quizID: string): Promise<QuizState> => {
  _joinQuizRoom(quizID)
  // TODO replace
  try {
    const response = await fetch(`http://localhost:4000/quiz/${quizID}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json() as QuizState
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
  return await GET<QuizState>(`${socketServerURL}/quiz/${quizID}`)
}

/**
 * Hits the buzz button. The player trying to buzz in is identified by the playerID.
 * @param {string} quizID
 * @param {string} playerID
 * @example
 * hitBuzz("quiz-1", "player-1");
 */
export const hitBuzz = (quizID: string, playerID: string): void => {
  emitEvent<{ quizID: string; playerID: string }>("buzz", { "quizID": quizID, "playerID": playerID })
}


/**
 * Sets up a listener for receiving buzz events from the server.
 * @param {(playerID: string) => void} callback - The callback function to handle the buzz event.
 * @example
 * buzz((playerID) => {
 *   console.log("Player buzzed in: ", playerID);
 * });
 */
export const buzz = (
  callback: (buzzVale: Buzz) => void): void => {
  onEvent("buzz", (buzzVale: Buzz) => {
    callback(buzzVale)
  })
}

/**
 * Set the game to active for all players eg after giving points to the last player
 * @param {string} quizID
 * @example
 * setGameActive("quiz-1");
 */
export const setGameActive = (quizID: string): void => {
  emitEvent<string>("setGameActive", quizID)
}

/**
 * Set the game to inactive for all players eg no more answers are accepted
 * @param {string} quizID
 * @example
 * setGameInactive("quiz-1");
 */
export const setGameInactive = (quizID: string): void => {
  emitEvent<string>("setGameInactive", quizID)
}

export const updatePlayerScore = (quizID: string, playerID: string, score: number): void => {
  emitEvent<{ quizID: string; playerID: string; score: number }>("updatePlayerScore", { "quizID": quizID, "playerID": playerID, "score": score })
}

export const playerScoreUpdated = (
  callback: (data: { quizID: string; playerID: string; score: number }) => void): void => {
  onEvent("playerScoreUpdated", (data: { quizID: string; playerID: string; score: number }) => {
    console.log("Received player score update io:", data)
    callback(data)
  })
}

export const switchedToActiveOrInactive = (
  callback: (data: GameState) => void): void => {
  onEvent("switchedToActiveOrInactive", (gameState: GameState) => {
    console.log("Received game state change io:", gameState)
      callback(gameState)
    },
  )
}
