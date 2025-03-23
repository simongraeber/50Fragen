import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Table, TableBody } from "@/components/ui/table.tsx";
import ScoreRow from "./ScoreRow";
import { useScore } from "./ScoreContext";
import { Button } from "@/components/ui/button.tsx"
import { useToast } from "@/hooks/use-toast.ts"
import { useTranslation } from "react-i18next"

interface LeaderBordProps {
  canEdit: boolean;
}

const LeaderBord: React.FC<LeaderBordProps> = ({ canEdit }) => {
  const { scores } = useScore();
  const { toast } = useToast();
  const { t } = useTranslation();

  const inviteFriends = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: t("p_link_copied"),
      variant: "success",
      }
    )
  }

  return (
    <Card>
      <CardContent>
        <Table className="mt-5">
          <TableBody>
            {scores.map((userScore) => (
              <ScoreRow key={userScore.user.id} userScore={userScore} canEdit={canEdit} />
            ))}
            {scores.length === 0 && (
              <Card className="flex flex-col items-center justify-center text-center">
                <CardHeader>
                  <CardTitle>
                    {t("p_invite")}
                  </CardTitle>
                </CardHeader>
              <CardContent
                className="-mt-3">
                <Button className="mt-4" onClick={inviteFriends}>
                  {t("p_copy_link")}
                </Button>
              </CardContent>
              </Card>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LeaderBord;