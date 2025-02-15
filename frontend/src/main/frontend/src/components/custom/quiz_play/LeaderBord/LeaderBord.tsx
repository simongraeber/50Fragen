import React from "react";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Table, TableBody } from "@/components/ui/table.tsx";
import ScoreRow from "./ScoreRow";
import { useScore } from "./ScoreContext";

interface LeaderBordProps {
  canEdit: boolean;
}

const LeaderBord: React.FC<LeaderBordProps> = ({ canEdit }) => {
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

export default LeaderBord;