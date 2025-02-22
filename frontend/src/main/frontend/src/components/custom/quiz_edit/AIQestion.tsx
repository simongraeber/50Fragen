import {
  Dialog, DialogHeader,
  DialogTrigger, DialogContent,
  DialogDescription, DialogTitle,
} from "@/components/ui/dialog.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { generateAiQuestion } from "@/api/aiQuiz.ts"
import { useState } from "react"
import { QuizQuestion } from "@/types/QuizQuestion.ts"
import { Separator } from "@/components/ui/separator.tsx"
import QuestionTypeSelect from "@/components/custom/quiz_edit/QuestionTypeSelect.tsx"
import QuestionCard from "@/components/custom/quiz_play/QuestionCard.tsx"
import { WiStars } from "react-icons/wi"
import LoadingButton from "@/components/ui/LoadingButton.tsx"
import { useTranslation } from "react-i18next"
import { CardDescription } from "@/components/ui/card.tsx"

function AIQuestion({ addQuestion }: { addQuestion: (question: Partial<QuizQuestion>) => Promise<void> }) {
  const [currentQuestion, setCurrentQuestion] = useState<Partial<QuizQuestion> | null>(null)
  const [category, setCategory] = useState<string>("")
  const [questionType, setQuestionType] = useState<QuizQuestion["type"]>("buzzerquestion")
  const [loadingAiQuestion, setLoadingAiQuestion] = useState(false)
  const [loadingAddQuestion, setLoadingAddQuestion] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { t } = useTranslation()

  const onGenerateQuestion = async (category: string) => {
    setLoadingAiQuestion(true)
    const question = await generateAiQuestion(category, t("displayed_language"), questionType)
    question.type = questionType
    setCurrentQuestion(question)
    setLoadingAiQuestion(false)
  }

  const onAddQuestion = async () => {
    setLoadingAddQuestion(true)
    const newQuestion: Partial<QuizQuestion> = {
      question: currentQuestion?.question ?? "",
      answer: currentQuestion?.answer ?? "",
      type: currentQuestion?.type ?? "buzzerquestion",
    }
    await addQuestion(newQuestion)
    setLoadingAddQuestion(false)
    setCurrentQuestion(null)
    setCategory("")
    setIsDialogOpen(false)
  }

  const onTypeChange = (type: QuizQuestion["type"]) => {
    console.log("type", type)
    console.log("currentQuestion", currentQuestion)
    if (currentQuestion) {
      setCurrentQuestion({ ...currentQuestion, type })
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <Button>
          <WiStars />
          {t("e_ai_q")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("e_ai_q")}</DialogTitle>
          <DialogDescription>
            {t("e_ai_q_t")}
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input
            className="my-2"
            id="category"
            placeholder={t("e_category")}
            value={category}
            onChange={(e) => setCategory(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onGenerateQuestion(category)
              }
            }}
          />
          <QuestionTypeSelect
            value={questionType}
            onValueChange={value => setQuestionType(value)} />
          <LoadingButton
            className="my-2"
            loading={loadingAiQuestion}
            onClick={() => onGenerateQuestion(category)}
          >
            {t("e_gen_q")}
          </LoadingButton>
          {currentQuestion && (
            <>
              <Separator />
              <div className="py-4">
                <QuestionCard
                  onTypeChange={onTypeChange}
                  question={currentQuestion} />
              </div>
              <CardDescription className="mb-2">
                {t("e_ai_disclaimer")}
              </CardDescription>
              <LoadingButton
                loading={loadingAddQuestion}
                onClick={onAddQuestion}
              >
                {t("e_add_q")}
              </LoadingButton>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AIQuestion