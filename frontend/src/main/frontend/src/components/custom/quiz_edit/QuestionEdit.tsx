import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

import { QuizQuestion } from "@/types/QuizQuestion"

import { MdEdit } from "react-icons/md"

import { updateQuestion, deleteQuestion } from "@/api/questionCalls.ts"

interface QuestionEditProps {
  question: QuizQuestion
  quizId: string
  updateQuestion: (updatedQuestion: QuizQuestion) => void
  removeQuestion: (questionId: string) => void
}
import { useTranslation } from "react-i18next"

export function QuestionEdit(input: QuestionEditProps) {

  const [editedAnswer, setEditedAnswer] = useState<string>(input.question.answer)
  const [editedType, setEditedType] = useState<QuizQuestion["type"]>(input.question.type)
  const [loading, setLoading] = useState(false)
  const [editedQuestion, setEditedQuestion] = useState<string>(input.question.question)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { t } = useTranslation();

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Combine the updated fields into the question object
      const updatedQuestion = {
        ...input.question,
        question: editedQuestion,
        answer: editedAnswer,
        type: editedType,
        quizId: input.quizId,
      }
      const new_question = await updateQuestion(updatedQuestion)
      input.updateQuestion(new_question)
      setDialogOpen(false)
    } catch (error) {
      console.error("Error updating question:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm(t("e_check_delete"))) {
      setLoading(true)
      try {
        await deleteQuestion({ id: input.question.id, quizId: input.question.quizId })
        input.removeQuestion(input.question.id)
        setDialogOpen(false)
      } catch (error) {
        console.error("Error deleting question:", error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div>
        <span>
          {input.question.question}
        </span>
      <Badge className="ml-2 mr-2">
        {t(input.question.type)}
      </Badge>
      <Dialog open={dialogOpen}
              onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <MdEdit className="mr-2" />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Question</DialogTitle>
            <DialogDescription>
              {t("e_update_t")}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdate}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="question" className="text-right">
                  {t("question")}
                </Label>
                <Input
                  id="question"
                  value={editedQuestion}
                  onChange={(e) => setEditedQuestion(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="answer" className="text-right">
                  {t("answer")}
                </Label>
                <Input
                  id="answer"
                  value={editedAnswer}
                  onChange={(e) => setEditedAnswer(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  {t("type")}
                </Label>
                <div
                  className="col-span-3"
                >
                  <Select
                    value={editedType}
                    onValueChange={(value) => setEditedType(value as QuizQuestion["type"])}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select question type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>
                          {t("q_type")}
                        </SelectLabel>
                        <SelectItem value="buzzerquestion">
                          {t("buzzerquestion")}
                        </SelectItem>
                        <SelectItem value="estimationquestion">
                          {t("estimationquestion")}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-between">
              <Button
                variant="destructive"
                type="button"
                onClick={handleDelete}
                disabled={loading}
              >
                {t("delete")}
              </Button>
              <Button type="submit" disabled={loading}>
                {t("save")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default QuestionEdit