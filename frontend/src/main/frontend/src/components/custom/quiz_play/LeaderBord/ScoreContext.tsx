import React, { createContext, useContext, useState, useEffect } from "react";
import { useGame } from "@/providers/GameProvider.tsx";
import { updateUserScore } from "@/api/quizGame.ts";
import { Score } from "@/types/gamePlay/Score.ts";

interface ScoreContextType {
  scores: Score[];
  updateScore: (userId: string, newScore: number) => void;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const useScore = () => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error("useScore must be used within a ScoreProvider");
  }
  return context;
};

export const ScoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state } = useGame();
  const [scores, setScores] = useState<Score[]>(state.quizState?.participantsScores ?? []);

  useEffect(() => {
    setScores(state.quizState?.participantsScores ?? []);
  }, [state.quizState]);

  const updateScore = (userId: string, newScore: number) => {
    setScores((prevScores) =>
      prevScores.map((score) =>
        score.user.id === userId ? { ...score, score: newScore } : score
      )
    );
    if (state.quizState?.id) {
      updateUserScore(state.quizState.id, userId, newScore);
      console.log(`Score update sent for user ${userId}: ${newScore}`);
    }
  };

  return (
    <ScoreContext.Provider value={{ scores, updateScore }}>
      {children}
    </ScoreContext.Provider>
  );
};