import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/User.ts";
import { useGame } from "@/providers/GameProvider.tsx";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUserScore } from "@/api/quizGame.ts"
import "@/styles/leaderBord.css";

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
  // Initialize the scores array from the quiz state.
  const [scores, setScores] = useState<UserScore[]>(state.quizState?.participantsScores ?? []);

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

// ScoreRow renders a single row in the leaderboard.
// The score number is wrapped in a relative container so the animated delta can be positioned absolutely.
interface ScoreRowProps {
  userScore: UserScore;
  canEdit: boolean;
}

const ScoreRow: React.FC<ScoreRowProps> = ({ userScore, canEdit }) => {
  const [prevScore, setPrevScore] = useState(userScore.score);
  const [delta, setDelta] = useState<number | null>(null);
  const [showDelta, setShowDelta] = useState(false);

  useEffect(() => {
    if (userScore.score !== prevScore) {
      const diff = userScore.score - prevScore;
      setDelta(diff);
      setPrevScore(userScore.score);
      setShowDelta(false);
      console.log(`Delta: ${diff}`);
      requestAnimationFrame(() => {
        setShowDelta(true);
      });
    }
  }, [userScore.score, prevScore]);

  return (
    <TableRow key={userScore.user.id}>
      <TableCell>
        <Avatar className="h-10 w-10">
          <AvatarImage src={userScore.user.image} alt={userScore.user.name} />
          <AvatarFallback>
            {userScore.user.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell className="font-medium">{userScore.user.name}</TableCell>
      <TableCell className="text-right text-xl bold">
        {/* Wrap the score in a relatively positioned container */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <span>{userScore.score}</span>
          {delta !== null && showDelta && (
            console.log(`delta-${prevScore}-${delta}`),
            <span
              key={`delta-${prevScore}-${userScore.score}`}
              onAnimationEnd={() => setShowDelta(false)}
              className={`delta ${delta > 0 ? "slide-up" : "slide-down"}`}
              style={{
                position: "absolute",
                left: "-100%",
                top: "50%",
                transform: "translateY(-50%)",
                marginRight: "0.5rem",
                color: delta > 0 ? "green" : "red",
              }}
            >
              {delta > 0 ? `+${delta}` : `${delta}`}
            </span>
          )}
        </div>
      </TableCell>
      {canEdit && (
        <TableCell>
          <EditScorePopover userScore={userScore} />
        </TableCell>
      )}
    </TableRow>
  );
};

const EditScorePopover: React.FC<{ userScore: UserScore }> = ({ userScore }) => {
  const [inputValue, setInputValue] = useState(String(userScore.score));
  const [isOpen, setIsOpen] = useState(false);
  const { updateScore } = useScore();

  const handleSave = () => {
    const newScore = Number(inputValue);
    if (!isNaN(newScore)) {
      updateScore(userScore.user.id, newScore);
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
        >
          Edit
        </Button>
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
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
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
              <ScoreRow key={userScore.user.id} userScore={userScore} canEdit={canEdit} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const LeaderBordWithScoreProvider: React.FC<{ canEdit: boolean }> = ({ canEdit }) => {
  return (
    <ScoreProvider>
      <LeaderBord canEdit={canEdit} />
    </ScoreProvider>
  );
};

export default LeaderBordWithScoreProvider;