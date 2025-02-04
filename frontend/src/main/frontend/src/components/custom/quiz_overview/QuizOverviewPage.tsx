import { useEffect, useState } from "react"
import { Quiz } from "@/types/Quiz.ts"
import QuizOverviewTable from "./QuizOverviewTable.tsx"
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx"
import { getAllQuizzes } from "@/api/quizCalls.ts"

function QuizOverviewPage() {
  const [quizzes, setQuizzes] = useState<Quiz[] | null>(null)

  useEffect(() => {
    getAllQuizzes()
      .then((data) => setQuizzes(data))
      .then(() => console.log("Quizzes fetched" + quizzes))
      .catch((err) => {
        console.error(err)
        setQuizzes([])
      })
  }, [])

  return (
    <div className="flex-col h-full justify-center pb-32">
      <Card className="m-4">
        <CardHeader>
          <h1 className="mb-4 text-xl">Quiz Overview</h1>
        </CardHeader>
        <CardContent>
          {quizzes ?
            <QuizOverviewTable data={quizzes} />
            : <QuizOverviewTable data={[]} loading={true} />
          }
        </CardContent>
      </Card>
    </div>
  )
}

export default QuizOverviewPage