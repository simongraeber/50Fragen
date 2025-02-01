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

function QuizEditPage() {
  const quizId = useQuizIdFromUrl()
  const [loading, setLoading] = useState(true)
  const [addQuestionLoading, setAddQuestionLoading] = useState(false)
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [error, setError] = useState<Error | null>(null)

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
      title: "Question order updated",
      description: "Question order updated",
    })
  }

  const updateQuizName = async (name: string) => {
    if (!quiz) return
    const updatedQuiz = { ...quiz, name }
    await updateQuiz(updatedQuiz)
    toast({
      title: "Quiz name updated",
      description: `Quiz name updated to: ${name}`,
    })
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

  const addQuestion = () => {
    const newQuestion: Partial<QuizQuestion> = {
      question: "New question",
      answer: "New answer",
      type: "buzzerquestion",
      quizId: quizId,
    }
    setAddQuestionLoading(true)
    createQuestion(newQuestion)
      .then((newQuestion) => {
        setQuestions([...questions, newQuestion])
        setAddQuestionLoading(false)
      })
      .catch((err) => {
        console.error("Error adding question:", err)
        setAddQuestionLoading(false)
      })

  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="h-full pb-32 p-4">
      <p>Edit page for quiz ID: {quizId}</p>
      <Card>
        <CardTitle className="p-4">
          Quiz Name
          <Input
            placeholder="Enter quiz name"
            defaultValue={quiz?.name}
            className="mt-2"
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
                        className="flex bg-card center justify-between p-1 mt-2 ml-2 mr-2 border rounded-lg"
                      >
                        <div
                          {...provided.dragHandleProps}
                          className="cursor-pointer text-lg mt-1 ml-2"
                        >
                          &#x2630;
                        </div>
                        <QuestionEdit
                          updateQuestion={updateQuestion}
                          removeQuestion={removeQuestion}
                          question={question} quizId={quiz?.id || ""} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <CardFooter className="flex justify-end pt-2">
          <LoadingButton
            onClick={addQuestion}
            loading={addQuestionLoading}
          >
            Add Question
          </LoadingButton>
        </CardFooter>
      </Card>
    </div>
  )
}

export default QuizEditPage