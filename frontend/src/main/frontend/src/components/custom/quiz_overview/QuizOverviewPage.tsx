import { useEffect, useState } from "react"
import { Quiz } from "@/types/Quiz.ts"
import QuizOverviewTable from "./QuizOverviewTable.tsx"
import { Card, CardContent } from "@/components/ui/card.tsx"
import { getAllQuizzes } from "@/api/quizCalls.ts"
import Page from "@/components/shared/Layout/Page.tsx"

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
    <Page>
      <h1 className="w-full text-center text-4xl md:text-5xl font-extrabold mb-2
                     bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500
                     bg-clip-text text-transparent">
        Your Quizzes
      </h1>
      <Card className="m-4">
        <CardContent>
          {quizzes ?
            <QuizOverviewTable data={quizzes} />
            : <QuizOverviewTable data={[]} loading={true} />
          }
        </CardContent>
      </Card>
    </Page>
  )
}

export default QuizOverviewPage