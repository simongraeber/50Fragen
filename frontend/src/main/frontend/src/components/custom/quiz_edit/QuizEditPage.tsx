import { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"

import { Card, CardFooter, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input.tsx"
import { Separator } from "@/components/ui/separator.tsx"

import useQuizIdFromUrl from "@/hooks/useQuizIdFromUrl"
import { getQuiz } from "@/api/quizCalls.ts"
import { createQuestion } from "@/api/questionCalls.ts"
import { Quiz } from "@/types/Quiz.ts"
import { QuizQuestion, QuizQuestionType } from "@/types/QuizQuestion.ts"
import QuestionEdit from "@/components/custom/quiz_edit/QuestionEdit.tsx"
import LoadingButton from "@/components/ui/LoadingButton.tsx"

function QuizEditPage() {
  const quizId = useQuizIdFromUrl()
  const [loading, setLoading] = useState(true)
  const [addQuestionLoading, setAddQuestionLoading] = useState(false)
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  // State for questions of type QuizQuestion[]
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    getQuiz(quizId)
      .then((data) => {
        // Transform questions from the API response so that the type field matches QuizQuestionType.
        const mappedQuestions = data.questions.map((q) => ({
          ...q,
          // Explicitly cast the type, or perform any conversion if necessary.
          type: q.type as QuizQuestionType,
        }))
        // Create a new Quiz object that conforms to the expected interface.
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
  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) return
    const reordered = Array.from(questions)
    // Remove the dragged item from its source index.
    const [movedItem] = reordered.splice(result.source.index, 1)
    // Insert the dragged item at its destination index.
    reordered.splice(result.destination.index, 0, movedItem)
    setQuestions(reordered)
    // TODO save the new order to the API
  }

  const addQuestion = () => {
    const newQuestion: Partial<QuizQuestion> = {
      question: "New question",
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
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "8px",
                          marginBottom: "4px",
                          background: "#f8f9fa",
                          borderRadius: "4px",
                          ...provided.draggableProps.style,
                        }}
                      >
                        {/* Drag handle: Only this area initiates the drag */}
                        <div
                          {...provided.dragHandleProps}
                          style={{ cursor: "grab", padding: "0 8px" }}
                        >
                          &#x2630;
                        </div>
                        {/* Custom component; button clicks inside here will not trigger drags */}
                        <QuestionEdit question={question} />
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