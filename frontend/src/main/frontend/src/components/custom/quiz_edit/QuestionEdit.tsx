import React, { useState } from "react"
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
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useTranslation } from "react-i18next"
import QuestionTypeSelect from "@/components/custom/quiz_edit/QuestionTypeSelect.tsx"
import {
  QuizQuestionExtensionFactory
} from "@/components/custom/QuizQuestionExtension/QuizQuestionExtensionFactory.tsx"
import { QuizQuestionExtension } from "@/types/QuizQuestionExtension.ts"
import {
  QuizQuestionExtensionDropdown
} from "@/components/custom/QuizQuestionExtension/QuizQuestionExtensionDropdown.tsx"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card.tsx"
import { QuizQuestion } from "@/types/QuizQuestion"
import { MdEdit } from "react-icons/md"
import { updateQuestion, deleteQuestion } from "@/api/questionCalls.ts"

interface QuestionEditProps {
  question: QuizQuestion
  quizId: string
  updateQuestion: (updatedQuestion: QuizQuestion) => void
  removeQuestion: (questionId: string) => void
}

export function QuestionEdit(input: QuestionEditProps) {
  const [editedAnswer, setEditedAnswer] = useState<string>(input.question.answer)
  const [editedType, setEditedType] = useState<QuizQuestion["type"]>(input.question.type)
  const [loading, setLoading] = useState(false)
  const [editedQuestion, setEditedQuestion] = useState<string>(input.question.question)
  const [questionExtensions, setQuestionExtensions] = useState<QuizQuestionExtension[]>(input.question.extensions || [])
  const [dialogOpen, setDialogOpen] = useState(false)
  const { t } = useTranslation()

  const handleExtensionChange = (updatedExtension: QuizQuestionExtension) => {
    setQuestionExtensions((prevExtensions) =>
      prevExtensions.map((ext) =>
        ext.id === updatedExtension.id ? updatedExtension : ext
      )
    );
  };

  const addExtension = (extension: QuizQuestionExtension) => {
    setQuestionExtensions((prevExtensions) => [...prevExtensions, extension])
  }

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
        extensions: questionExtensions,
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
    <div className="flex items-center justify-between">
      <span className="w-0 flex-1 min-w-0 inline-block truncate">
        {input.question.question}
      </span>

      <div className="flex items-center">
        <Badge className="ml-2 mr-2">
          {t(input.question.type)}
        </Badge>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <MdEdit className="xs:mr-2" />
              <span className="hidden xs:inline w-0 xs:w-auto overflow-hidden">
                {t("edit")}
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] overflow-auto max-h-screen">
            <DialogHeader>
              <DialogTitle>{t("e_e_q")}</DialogTitle>
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
                  <div className="col-span-3">
                    <QuestionTypeSelect value={editedType} onValueChange={setEditedType} />
                  </div>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="advanced-options">
                    <AccordionTrigger>{t("e_question_extensions")}</AccordionTrigger>
                    <AccordionContent>
                      <QuizQuestionExtensionDropdown
                        onAddExtension={addExtension} />
                      <div className="grid grid-cols-1 gap-4 w-full pt-2">
                        {questionExtensions.map((ext) => (
                          <Card className="w-full" key={ext.id}>
                            <CardContent>
                              <CardHeader>
                                {t(ext.extensionType)}
                              </CardHeader>
                              <QuizQuestionExtensionFactory
                                extension={ext}
                                displayType={"edit"}
                                onExtensionChange={handleExtensionChange}
                              />
                            </CardContent>
                            <CardFooter>
                              <Button
                                variant="destructive"
                                onClick={() => {
                                  setQuestionExtensions((prevExtensions) =>
                                    prevExtensions.filter((e) => e.id !== ext.id)
                                  )
                                }}
                              >
                                {t("delete")}
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <DialogFooter className="flex justify-between">
                <Button
                  variant="destructive"
                  type="button"
                  className="mt-2 sm:mt-0"
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
    </div>
  )
}

export default QuestionEdit