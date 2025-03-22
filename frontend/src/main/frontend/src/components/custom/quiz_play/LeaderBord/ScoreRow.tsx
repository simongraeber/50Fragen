import React, { useState, useEffect } from "react";
import { TableRow, TableCell } from "@/components/ui/table.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { Score } from "@/types/gamePlay/Score.ts";
import EditScorePopover from "./EditScorePopover";
import "@/styles/leaderBord.css";

interface ScoreRowProps {
  userScore: Score;
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
      // Trigger reflow for delta animation
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
        <div style={{ position: "relative", display: "inline-block" }}>
          <span>{userScore.score}</span>
          {delta !== null && showDelta && (
            <span
              key={`delta-${prevScore}-${userScore.score}`}
              onAnimationEnd={() => setShowDelta(false)}
              className={`delta ${delta > 0 ? "slide-up" : "slide-down"}`}
              style={{
                position: "absolute",
                left: "-100%",
                top: delta > 0 ? "50%" : "-50%",
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

export default ScoreRow;