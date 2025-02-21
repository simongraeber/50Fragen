import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { QuizQuestion } from "@/types/QuizQuestion.ts"
import { Badge } from "@/components/ui/badge.tsx"
import { useTranslation } from "react-i18next"

interface QuestionCardProps {
  question: Partial<QuizQuestion>
}

function QuestionCard({ question }: QuestionCardProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-3">
          <span className="block font-bold">{t("question")}:</span>
          <p>{question.question}</p>
        </div>
        <div>
          <span className="block font-bold">{t("answer")}:</span>
          <p>{question.answer}</p>
        </div>
      </CardContent>
      <CardFooter className="text-right">
        <Badge className="inline-block ml-auto">
          {t(question.type ?? "buzzerquestion")}
        </Badge>
      </CardFooter>
    </Card>
  );
}

export default QuestionCard;