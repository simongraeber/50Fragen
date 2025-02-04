import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/User.ts";
import { useGame } from "@/providers/GameProvider.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updatePlayerScore } from "@/api/quizGame.ts";

export interface UserScore {
  user: User;
  score: number;
}

interface ScoreContextType {
  scores: UserScore[];
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

const ScoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state } = useGame();
  // Initialize scores using the current quizState.
  const [scores, setScores] = useState<UserScore[]>(state.quizState?.participantsScores ?? []);

  useEffect(() => {
    if (state.quizState?.participantsScores) {
      // Create a new array to trigger re-render.
      setScores([...state.quizState.participantsScores]);
    } else {
      setScores([]);
    }
  }, [state.quizState]);

  const updateScore = (userId: string, newScore: number) => {
    // Update the local score state.
    setScores((prevScores) =>
      prevScores.map((score) =>
        score.user.id === userId ? { ...score, score: newScore } : score
      )
    );
    // Also update on the backend.
    if (state.quizState?.id) {
      updatePlayerScore(state.quizState.id, userId, newScore);
      console.log(`Score update sent for user ${userId}: ${newScore}`);
    }
  };

  return (
    <ScoreContext.Provider value={{ scores, updateScore }}>
      {children}
    </ScoreContext.Provider>
  );
};

const EditScorePopover: React.FC<{ userScore: UserScore }> = ({ userScore }) => {
  const [inputValue, setInputValue] = useState(String(userScore.score));
  const { updateScore } = useScore();

  const handleSave = () => {
    const newScore = Number(inputValue);
    if (!isNaN(newScore)) {
      updateScore(userScore.user.id, newScore);
      console.log(`Score updated for ${userScore.user.name}: ${newScore}`);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Edit</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Edit Score</h4>
            <p className="text-sm text-muted-foreground">
              Update the score for {userScore.user.name}.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="score-input">Score</Label>
              <Input
                id="score-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="col-span-2 h-8"
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const LeaderBord: React.FC<{ canEdit: boolean }> = ({ canEdit }) => {
  const { scores } = useScore();
  return (
    <Card>
      <CardContent>
        <Table className="mt-5">
          <TableBody>
            {scores.map((userScore) => (
              <TableRow key={userScore.user.id}>
                <TableCell>
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={userScore.user.image}
                      alt={userScore.user.name}
                    />
                    <AvatarFallback>
                      {userScore.user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">
                  {userScore.user.name}
                </TableCell>
                <TableCell className="text-right text-xl bold">
                  {userScore.score}
                </TableCell>
                {canEdit && (
                  <TableCell>
                    <EditScorePopover userScore={userScore} />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// Wrap the LeaderBord with ScoreProvider so that all children get live score updates.
const LeaderBordWithScoreProvider: React.FC<{ canEdit: boolean }> = ({ canEdit }) => {
  return (
    <ScoreProvider>
      <LeaderBord canEdit={canEdit} />
    </ScoreProvider>
  );
};

export default LeaderBordWithScoreProvider;