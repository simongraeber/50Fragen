import React, { createContext, useContext, useEffect, useReducer, useRef } from "react";
import { onEvent, offEvent } from "@/api/socket.ts";
import {
  buzz,
  switchedToActiveOrInactive,
  connectToGame,
  userScoreUpdated,
  onShowQuestion,
  onNewQuestion, onNewTextAnswers, onQuizState, userScoresUpdated, onQuestionExtension,
} from "@/api/quizGame.ts"
import { Buzz } from "@/types/gamePlay/buzz.ts";
import { QuizState } from "@/types/gamePlay/QuizState.ts";
import { GameState } from "@/types/gamePlay/gameState.ts";
import { QuizQuestionExtension } from "@/types/QuizQuestionExtension.ts"

interface GameStateData {
  buzzData: Buzz | null;
  quizState: QuizState | null;
  currentQuestionId: string | null;
  currentQuestionExtensions: QuizQuestionExtension[] | null;
}

const initialState: GameStateData = {
  buzzData: null,
  quizState: null,
  currentQuestionId: null,
  currentQuestionExtensions: null,
};

type Action =
  | { type: "SET_BUZZ_DATA"; payload: Buzz | null }
  | { type: "SET_QUIZ_STATE"; payload: QuizState | null }
  | { type: "SET_CURRENT_QUESTION_ID"; payload: string | null }
  | { type: "SET_CURRENT_QUESTION_EXTENSIONS"; payload: QuizQuestionExtension[] | null };

function gameReducer(state: GameStateData, action: Action): GameStateData {
  switch (action.type) {
    case "SET_BUZZ_DATA":
      return { ...state, buzzData: action.payload };
    case "SET_QUIZ_STATE":
      return { ...state, quizState: action.payload };
    case "SET_CURRENT_QUESTION_ID":
      return { ...state, currentQuestionId: action.payload };
    case "SET_CURRENT_QUESTION_EXTENSIONS":
      return { ...state, currentQuestionExtensions: action.payload };
    default:
      return state;
  }
}

interface GameContextType {
  state: GameStateData;
  dispatch: React.Dispatch<Action>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  quizId: string;
  children: React.ReactNode;
}

export const GameProvider = ({ quizId, children }: GameProviderProps) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // REF TO ALWAYS HAVE THE LATEST STATE
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    // Define the initialization function so we can use it both initially and on reconnection.
    const initializeGameState = async () => {
      const fetchedState = await connectToGame(quizId);
      console.log("Fetched game state:", fetchedState);
      dispatch({ type: "SET_QUIZ_STATE", payload: fetchedState });
    };

    // First time initialization.
    initializeGameState();

    // Reinitialize game state when socket reconnects.
    const handleSocketConnect = () => {
      initializeGameState();
    };

    // Start listening on reconnections.
    onEvent("connect", handleSocketConnect);

    // Listen for buzz events.
    buzz((data: Buzz) => {
      if (data.quizId === quizId) {
        dispatch({
          type: "SET_BUZZ_DATA",
          payload: {
            quizId: data.quizId,
            userId: data.userId,
          },
        });
      }
    });

    // Listen for player score updates.
    userScoreUpdated((data: { quizID: string; userID: string; score: number }) => {
      if (stateRef.current.quizState) {
        dispatch({
          type: "SET_QUIZ_STATE",
          payload: {
            ...stateRef.current.quizState,
            participantsScores: stateRef.current.quizState.participantsScores.map((player) => {
              if (player.user.id === data.userID) {
                return { ...player, score: data.score };
              }
              return player;
            }),
            id: stateRef.current.quizState.id,
          },
        });
      }
    });

    // multiple scores at once
    userScoresUpdated((data) => {
      if (stateRef.current.quizState) {
        dispatch({
          type: "SET_QUIZ_STATE",
          payload: {
            ...stateRef.current.quizState,
            participantsScores: stateRef.current.quizState.participantsScores.map((player) => {
              const updatedScore = data.users.find((user) => user.userID === player.user.id);
              if (updatedScore) {
                return { ...player, score: updatedScore.score };
              }
              return player;
            }),
            id: stateRef.current.quizState.id,
          },
        });
      }
    });

    // Listen for active/inactive game state changes.
    switchedToActiveOrInactive((data: GameState) => {
      dispatch({
        type: "SET_QUIZ_STATE",
        payload: {
          ...stateRef.current.quizState,
          active: data.active,
          id: stateRef.current.quizState?.id || "",
        } as QuizState,
      });
    });

    // if the question is shown to all users
    onShowQuestion((data) => {
      if (stateRef.current.quizState) {
        dispatch({
          type: "SET_QUIZ_STATE",
          payload: {
            ...stateRef.current.quizState,
            currentQuestion: data.question,
            id: stateRef.current.quizState.id,
          },
        });
      }
    });

    // on new question update the questionType
    onNewQuestion((data) => {
      if (stateRef.current.quizState) {
        dispatch({
          type: "SET_QUIZ_STATE",
          payload: {
            ...stateRef.current.quizState,
            currentQuestionType: data.questionType,
            currentQuestion: "",
            textAnswers: [],
            id: stateRef.current.quizState.id,
          },
        });
        dispatch(
          {
            type: "SET_CURRENT_QUESTION_EXTENSIONS",
            payload: null,
          }
        )
      }
    });

    // on new Text Answers update
    onNewTextAnswers((data) => {
      if (stateRef.current.quizState) {
        dispatch({
          type: "SET_QUIZ_STATE",
          payload: {
            ...stateRef.current.quizState,
            textAnswers: data.currentAnswers,
            id: stateRef.current.quizState.id,
          },
        });
      }
    });

    // update the entire quiz state
    onQuizState((data) => {
      dispatch({
        type: "SET_QUIZ_STATE",
        payload: data,
      });
    });

    // the game Master shows a new quizQuestionExtension
    onQuestionExtension((data) => {
      console.log("resefing Extention", data.extension);
      dispatch({
        type: "SET_CURRENT_QUESTION_EXTENSIONS",
        payload: stateRef.current.currentQuestionExtensions
          ? [data.extension, ...stateRef.current.currentQuestionExtensions]
          : [data.extension],
      });
    });

    // Clean up the event listener on unmount.
    return () => {
      offEvent("connect");
    };
  }, [quizId]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};