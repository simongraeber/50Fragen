import { Button } from "@/components/ui/button"
import { QuizQuestion } from "@/types/QuizQuestion"

interface QuestionEditProps {
  question: QuizQuestion;
}

function QuestionEdit({ question }: QuestionEditProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <input
          type="text"
          value={question.question}
          className="ml-2"
        />
        <Button>Edit</Button>
        <Button
          variant="destructive">Delete</Button>
      </div>
    </div>
  )
}

export default QuestionEdit