import { useEffect, useState } from "react"
import { Quiz } from "@/types/Quiz.ts"
import QuizSessionOverviewTable from "./QuizSessionOverviewTable"
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx"
import { getAllQuizzes } from "@/api/quizCalls.ts"

function QuizSessionOverviewPage() {
  const [sessions, setSessions] = useState<Quiz[] | null>(null)

  useEffect(() => {
    getAllQuizzes()
      .then((data) => setSessions(data))
      .catch((err) => {
        console.error(err)
        setSessions([])
      })
  }, [])

  if (!sessions) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex-col h-full justify-center pb-32">
      <Card className="m-4">
        <CardHeader>
          <h1 className="mb-4 text-xl">Quiz Overview</h1>
        </CardHeader>
        <CardContent>
          <QuizSessionOverviewTable data={sessions} />
        </CardContent>
      </Card>
    </div>
  )
}

export default QuizSessionOverviewPage