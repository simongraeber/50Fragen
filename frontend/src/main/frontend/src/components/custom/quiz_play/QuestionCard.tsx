import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { QuizQuestion } from "@/types/QuizQuestion.ts"
import { Badge } from "@/components/ui/badge.tsx"

interface QuestionCardProps {
  question: QuizQuestion
}

function QuestionCard({ question }: QuestionCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-3">
          <span className="block font-bold">Question:</span>
          <p>{question.question}</p>
        </div>
        <div>
          <span className="block font-bold">Answer:</span>
          <p>{question.answer}</p>
        </div>
      </CardContent>
      <CardFooter className="text-right">
        <Badge className="inline-block ml-auto">
          {question.type}
        </Badge>
      </CardFooter>
    </Card>
  );
}

export default QuestionCard;