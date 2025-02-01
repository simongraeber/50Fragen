import { User } from "@/types/User.ts";

import {
  Table,
  TableBody,
  TableCell, TableHead, TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx"
import { Checkbox } from "@/components/ui/checkbox.tsx"
import { Button } from "@/components/ui/button.tsx"

interface Answer {
  user: User;
  answer: string;
}
interface EstimationQuestionAnswersProps {
  answers: Answer[];
  canEdit?: boolean;
}


function EstimationQuestionAnswers({ answers, canEdit }: EstimationQuestionAnswersProps) {
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
                    <AvatarImage src={userAnswers.user.image} alt={userAnswers.user.name} />
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
                    <Checkbox />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {canEdit && (
        <CardFooter>
          <Button className="mr-2"
            variant="outline">
            Show Answers for Everyone
          </Button>
          <Button className="ml-auto">
            Give Points
          </Button>
        </CardFooter>
      )
      }
    </Card>
  );
}

export default EstimationQuestionAnswers;