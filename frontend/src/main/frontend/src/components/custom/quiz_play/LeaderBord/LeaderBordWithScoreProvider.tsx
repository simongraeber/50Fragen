import React from "react";
import { ScoreProvider } from "./ScoreContext";
import LeaderBord from "./LeaderBord";

interface LeaderBordProps {
  canEdit: boolean;
}

const LeaderBordWithScoreProvider: React.FC<LeaderBordProps> = ({ canEdit }) => {
  return (
    <ScoreProvider>
      <LeaderBord canEdit={canEdit} />
    </ScoreProvider>
  );
};

export default LeaderBordWithScoreProvider;