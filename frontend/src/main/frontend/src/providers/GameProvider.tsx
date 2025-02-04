import React, { createContext, useContext, useEffect, useReducer, useRef } from "react";
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
  | { type: "SET_QUIZ_STATE"; payload: QuizState | null };

function gameReducer(state: GameStateData, action: Action): GameStateData {
  switch (action.type) {
    case "SET_BUZZ_DATA":
      return { ...state, buzzData: action.payload };
    case "SET_QUIZ_STATE":
      return { ...state, quizState: action.payload };
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
    // Initialize socket connection on mount.
    initializeSocket();

    // Listen for buzz events.
    buzz((data: Buzz) => {
      if (data.quizId === quizId) {
        console.log("Buzz event received:", data);
        dispatch({ type: "SET_BUZZ_DATA", payload: {
          quizId: data.quizId,
            userId: data.userId,
          } });
      }
    });

    // Listen for player score updates.
    playerScoreUpdated((data: { quizID: string; playerID: string; score: number }) => {
      console.log("Player score update received:", data);
      // Use stateRef.current to get the latest quizState:
      if (stateRef.current.quizState) {
        dispatch({
          type: "SET_QUIZ_STATE",
          payload: {
            ...stateRef.current.quizState,
            participantsScores: stateRef.current.quizState.participantsScores.map((player) => {
              if (player.user.id === data.playerID) {
                return { ...player, score: data.score };
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
      console.log("Game state update received:", data);
      dispatch({ type: "SET_QUIZ_STATE", payload: {
          ...stateRef.current.quizState,
          active: data.active,
          id: stateRef.current.quizState?.id || "",
        } as QuizState
      });
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