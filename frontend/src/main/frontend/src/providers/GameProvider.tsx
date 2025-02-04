import React, { createContext, useContext, useEffect, useReducer } from "react";
import { initializeSocket } from "@/api/socket.ts";
import { buzz, switchedToActiveOrInactive, connectToGame, playerScoreUpdated } from "@/api/quizGame.ts";
import { Buzz } from "@/types/gamePlay/buzz.ts";
import { QuizState } from "@/types/gamePlay/QuizState.ts";
import { GameState } from "@/types/gamePlay/gameState.ts";

interface GameStateData {
  buzzData: Buzz | null;
  quizState: QuizState | null;
}

const initialState: GameStateData = {
  buzzData: null,
  quizState: null,
};

type Action =
  | { type: "SET_BUZZ_DATA"; payload: Buzz | null }
  | { type: "SET_QUIZ_STATE"; payload: QuizState | null }
  | { type: "UPDATE_PLAYER_SCORE"; payload: { quizID: string; playerID: string; score: number } };

function gameReducer(state: GameStateData, action: Action): GameStateData {
  switch (action.type) {
    case "SET_BUZZ_DATA":
      return { ...state, buzzData: action.payload };
    case "SET_QUIZ_STATE":
      return { ...state, quizState: action.payload };
    case "UPDATE_PLAYER_SCORE":
      if (!state.quizState) return state;
      return {
        ...state,
        quizState: {
          ...state.quizState,
          participantsScores: state.quizState.participantsScores.map(player => {
            if (player.user.id === action.payload.playerID) {
              return { ...player, score: action.payload.score };
            }
            return player;
          }),
          id: state.quizState.id,
        },
      };
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

  useEffect(() => {
    // Initialize socket connection once on mount.
    initializeSocket();

    // Listen for buzz events and update state if they are meant for our quiz.
    buzz((data: Buzz) => {
      if (data.quizId === quizId) {
        console.log("Buzz event received:", data);
        dispatch({ type: "SET_BUZZ_DATA", payload: data });
      }
    });

    // Listen to player score updates.
    playerScoreUpdated((data: { quizID: string; playerID: string; score: number }) => {
      console.log("Player score update received:", data);
      // Dispatch an action that updates the player score without relying on stale state.
      dispatch({ type: "UPDATE_PLAYER_SCORE", payload: data });
    });

    // Listen for active/inactive game state changes.
    switchedToActiveOrInactive((data: GameState) => {
      console.log("Game state update received:", data);
      dispatch({ type: "SET_QUIZ_STATE", payload: data });
    });

    // Get the initial state from the server.
    const initializeGameState = async () => {
      const fetchedState = await connectToGame(quizId);
      dispatch({ type: "SET_QUIZ_STATE", payload: fetchedState });
    };

    initializeGameState();
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