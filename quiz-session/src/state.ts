import { QuizState } from "./types/quizState"

export const quizStates: { [quizID: string]: QuizState } = {}

export function getDefaultQuizState(quizID: string): QuizState {
  return {
    id: quizID,
    name: `Quiz placeholder ${quizID}`,
    currentQuestion: "",
    participantsScores: [
      {
        user: {
          id: "1",
          name: "Nico",
          image:
            "https://cdn.discordapp.com/avatars/265637593172017162/4e8142aa1e1b1b24cdca93b87fbff331.png?size=64",
        },
        score: 100,
      },
      {
        user: {
          id: "2",
          name: "Lucas",
          image:
            "https://cdn.discordapp.com/avatars/631929224197963786/5a68849ba4b1cf76e899e1f49db44bc7.png?size=64",
        },
        score: 200,
      },
    ],
    active: true,
    currentQuestionType: "buzzerquestion",
    textAnswers: [],
  }
}