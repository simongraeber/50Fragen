import { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"

import { Card, CardFooter, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input.tsx"
import { Separator } from "@/components/ui/separator.tsx"

import useQuizIdFromUrl from "@/hooks/useQuizIdFromUrl"
import { getQuiz, updateQuiz } from "@/api/quizCalls.ts"
import { createQuestion } from "@/api/questionCalls.ts"
import { Quiz } from "@/types/Quiz.ts"
import { QuizQuestion, QuizQuestionType } from "@/types/QuizQuestion.ts"
import QuestionEdit from "@/components/custom/quiz_edit/QuestionEdit.tsx"
import LoadingButton from "@/components/ui/LoadingButton.tsx"
import { toast } from "@/hooks/use-toast.ts"
import { Button } from "@/components/ui/button.tsx"
import { useNavigate } from "react-router-dom"
import Page from "@/components/shared/Layout/Page.tsx"
import HeadLine from "@/components/shared/Layout/HeadLine.tsx"
import { scrollAnimation } from "@/components/shared/Layout/scrollAnimation.ts"
import { motion } from "framer-motion"
import { FaPlay } from "react-icons/fa"
import ErrorPage from "@/components/shared/ErrorPage.tsx"
import LoadingPage from "@/components/shared/LoadingPage.tsx"
import { useTranslation } from "react-i18next"
import AIQuestion from "@/components/custom/quiz_edit/AIQestion.tsx"

function QuizEditPage() {
  const quizId = useQuizIdFromUrl()
  const [loading, setLoading] = useState(true)
  const [addQuestionLoading, setAddQuestionLoading] = useState(false)
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [error, setError] = useState<Error | null>(null)

  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    getQuiz(quizId)
      .then((data) => {
        const mappedQuestions = data.questions.map((q) => ({
          ...q,
          type: q.type as QuizQuestionType,
        }))
        const quizData: Quiz = { ...data, questions: mappedQuestions }
        setQuiz(quizData)
        setQuestions(mappedQuestions)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError(err)
        setLoading(false)
      })
  }, [quizId])

  // Type the onDragEnd parameter as DropResult.
  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return
    const reordered = Array.from(questions)
    // Remove the dragged item from its source index.
    const [movedItem] = reordered.splice(result.source.index, 1)
    // Insert the dragged item at its destination index.
    reordered.splice(result.destination.index, 0, movedItem)
    setQuestions(reordered)
    await updateQuiz({ ...quiz, questions: reordered })
    toast({
      variant: "success",
      title: t("e_order_updated"),
    })
  }

  const updateQuizName = async (name: string) => {
    if (!quiz) return
    const updatedQuiz = { ...quiz, name, questions }
    await updateQuiz(updatedQuiz)
    toast({
      variant: "success",
      title: t("e_q_name_updated"),
      description: `${t("e_q_name_updated_to")} ${name}`,
    })
    setQuiz(updatedQuiz)
  }

  const updateQuestion = (updatedQuestion: QuizQuestion) => {
    const updatedQuestions = questions.map((q) => {
      if (q.id === updatedQuestion.id) {
        return updatedQuestion
      }
      return q
    })
    setQuestions(updatedQuestions)
  }

  const removeQuestion = (questionId: string) => {
    const updatedQuestions = questions.filter((q) => q.id !== questionId)
    setQuestions(updatedQuestions)
  }

  const placeholderQuestion: Partial<QuizQuestion> = {
    question: t("e_new_q"),
    answer: t("e_new_answer"),
    type: "buzzerquestion",
  }

  const addQuestion = async (newQuestion: Partial<QuizQuestion>) => {
    newQuestion.quizId = quizId
    setAddQuestionLoading(true)
    try {
      const newFullQuestion = await createQuestion(newQuestion)
      setQuestions([...questions, newFullQuestion])
      setAddQuestionLoading(false)
    } catch (err) {
      console.error("Error adding question:", err)
      toast({
        variant: "destructive",
        description: t("e_error_adding_q"),
      })
      setAddQuestionLoading(false)
    }

  }

  if (error) {
    return <ErrorPage error={error.message} />
  }

  if (loading) {
    return <LoadingPage />
  }

  return (
    <Page>
      <div className="flex justify-between w-full px-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/quizzes`)}
        >
          {t("e_back")}
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate(`/play/${quizId}`)}
        >
          <FaPlay className="mr-2" />
          {t("start")}
        </Button>
      </div>
      <HeadLine>
        {t("edit")} {quiz?.name}
      </HeadLine>
      <motion.section
        className="w-full max-w-6xl px-4 mb-16 pt-6"
        variants={scrollAnimation}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Card>
          <CardTitle className="p-4">
            {t("e_q_name")}
            <Input
              placeholder="Enter quiz name"
              defaultValue={quiz?.name}
              className="mt-2"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateQuizName(e.currentTarget.value)
                }
              }}
              onBlur={(e) => updateQuizName(e.target.value)}
            />
          </CardTitle>
          <Separator />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="questions">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {questions.map((question, index) => (
                    <Draggable key={question.id} draggableId={`${question.id}`} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="flex bg-card p-1 mt-2 ml-2 mr-2 border rounded-lg"
                        >
                          <div
                            {...provided.dragHandleProps}
                            className="cursor-pointer text-lg mt-1 ml-2 pr-2 flex items-center"
                          >
                            &#x2630;
                            <span className="text-lg font-bold ml-2 hidden sm:inline sm:w-10 text-secondary-foreground">
                              # {index + 1}
                            </span>
                          </div>
                          <div className="flex-grow">
                            <QuestionEdit
                              updateQuestion={updateQuestion}
                              removeQuestion={removeQuestion}
                              question={question} quizId={quiz?.id || ""} />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <CardFooter className="flex justify-between pt-6">
            <AIQuestion addQuestion={addQuestion} />
            <LoadingButton
              onClick={() => addQuestion(placeholderQuestion)}
              loading={addQuestionLoading}
            >
              {t("e_add_q")}
            </LoadingButton>
          </CardFooter>
        </Card>
      </motion.section>
    </Page>
  )
}

export default QuizEditPage