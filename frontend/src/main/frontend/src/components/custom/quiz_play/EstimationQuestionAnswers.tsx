import { User } from "@/types/User.ts";

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

interface Answer {
  user: User;
  answer: string;
}
interface EstimationQuestionAnswersProps {
  answers: Answer[];
  canEdit?: boolean;
  quizId: string;
}

function EstimationQuestionAnswers({ answers, canEdit, quizId}: EstimationQuestionAnswersProps) {
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

  const onGivePoints =  () => {
    console.log("give points: " + quizId)
    if (!quizId) return;

    const updates = scores
      .filter((score) => correctUsers.has(score.user.id))
      .map((score) => ({
        quizID: quizId || "",
        userID: score.user.id,
        score: score.score + scores.length - 1
      }));
    console.log("update Points: "+ updates)
    updateUserScores(updates);
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
            {answers.map((userAnswers) => (
              <TableRow key={userAnswers.user.id}>
                <TableCell>
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={userAnswers.user.image}
                      alt={userAnswers.user.name}
                    />
                    <AvatarFallback>
                      {userAnswers.user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{userAnswers.user.name}</TableCell>
                <TableCell className="text-sm bold">
                  {userAnswers.answer}
                </TableCell>
                {canEdit && (
                  <TableCell>
                    <Checkbox
                      checked={correctUsers.has(userAnswers.user.id)}
                      onClick={() => handleCorrectChange(userAnswers.user.id)}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {canEdit && (
        <CardFooter>
          <Button className="mr-2" variant="outline"
          onClick={() => console.log("Show Answers")}
          >
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