import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { QuizQuestion, QuizQuestionType } from "@/types/QuizQuestion.ts"
import { Button } from "@/components/ui/button.tsx"
import { useTranslation } from "react-i18next"
import {
  TooltipProvider, Tooltip,
  TooltipTrigger, TooltipContent,
} from "@/components/ui/tooltip.tsx"
import { Badge } from "@/components/ui/badge.tsx"

interface QuestionCardProps {
  question: Partial<QuizQuestion>,
  onTypeChange: (type: QuizQuestionType) => void | null;
}

function QuestionCard({ question, onTypeChange }: QuestionCardProps) {
  const { t } = useTranslation()
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
      <CardFooter className="text-right pb-2">
        <TooltipProvider>
          {onTypeChange ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="link"
                  onClick={() => onTypeChange(
                    question.type === "buzzerquestion"
                      ? "estimationquestion" : "buzzerquestion")}
                  className="inline-block p-0 ml-auto">
                  <Badge>
                    {t(question.type ?? "buzzerquestion")}
                  </Badge>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("p_change_q_type")}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Badge>{t(question.type ?? "buzzerquestion")}</Badge>
          )}
        </TooltipProvider>
      </CardFooter>
    </Card>
  )
}

export default QuestionCard