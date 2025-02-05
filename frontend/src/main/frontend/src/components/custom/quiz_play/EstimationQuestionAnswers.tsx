import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Button } from "@/components/ui/button.tsx";
import { updateUserScores } from "@/api/quizGame.ts"
import { useGame } from "@/providers/GameProvider.tsx";
import { useState, useEffect } from "react";
import { UserScore } from "@/components/custom/quiz_play/LeaderBord.tsx";
import { TextAnswer } from "@/types/gamePlay/TextAnswer.ts"


interface EstimationQuestionAnswersProps {
  answers: TextAnswer[];
  canEdit?: boolean;
  quizId: string;
}

function EstimationQuestionAnswers({ answers, canEdit, quizId }: EstimationQuestionAnswersProps) {
  const { state } = useGame();
  const [scores, setScores] = useState<UserScore[]>(state.quizState?.participantsScores ?? []);
  const [correctUsers, setCorrectUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    setScores(state.quizState?.participantsScores ?? []);
  }, [state.quizState?.participantsScores]);

  const handleCorrectChange = (userId: string) => {
    setCorrectUsers((prev) => {
      const updated = new Set(prev);
      if (updated.has(userId)) {
        updated.delete(userId);
      } else {
        updated.add(userId);
      }
      return updated;
    });
  };

  const onGivePoints = () => {
    console.log("give points: " + quizId);
    if (!quizId) return;

    const updates = scores
      .filter((score) => correctUsers.has(score.user.id))
      .map((score) => ({
        quizID: quizId || "",
        userID: score.user.id,
        score: score.score + scores.length - 1,
      }));
    console.log("update Points: " + updates);
    updateUserScores(updates);
  };

  const findUserInfo = (userId: string) => {
    const userScore = scores.find((score) => score.user.id === userId);
    return userScore ? userScore.user : { name: "Unknown", image: "" };
  };

  return (
    <Card>
      <CardContent>
        <Table className="mt-5">
          <TableHeader>
            <TableHead></TableHead>
            <TableHead>User</TableHead>
            <TableHead>Answer</TableHead>
            {canEdit && <TableHead>Correct?</TableHead>}
          </TableHeader>
          <TableBody>
            {answers.map((userAnswers) => {
              const userInfo = findUserInfo(userAnswers.userID);
              return (
                <TableRow key={userAnswers.userID}>
                  <TableCell>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={userInfo.image} alt={userInfo.name} />
                      <AvatarFallback>
                        {userInfo.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{userInfo.name}</TableCell>
                  <TableCell className="text-sm bold">{userAnswers.text}</TableCell>
                  {canEdit && (
                    <TableCell>
                      <Checkbox
                        checked={correctUsers.has(userAnswers.userID)}
                        onClick={() => handleCorrectChange(userAnswers.userID)}
                      />
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
      {canEdit && (
        <CardFooter>
          <Button className="mr-2" variant="outline" onClick={() => console.log("Show Answers")}>
            Show Answers
          </Button>
          <Button className="ml-auto" onClick={onGivePoints}>
            Give Points
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

export default EstimationQuestionAnswers;