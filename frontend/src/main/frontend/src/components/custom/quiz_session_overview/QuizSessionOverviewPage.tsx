import { useEffect, useState } from "react"
import { QuizQuestionSession } from "@/types/QuizQuestionSession"
import QuizSessionOverviewTable from "./QuizSessionOverviewTable"
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx"

async function getSessions(): Promise<QuizQuestionSession[]> {
  // Placeholder data — in a real app you'd fetch from your backend or similar
  return [
    {
      id: "session1",
      name: "Sample Session 1",
      questions: [],
      lastModified: new Date("2024-01-01T10:00:00Z"),
    },
    {
      id: "session2",
      name: "Sample Session 2",
      questions: [],
      lastModified: new Date("2023-07-15T15:30:00Z"),
    },
    {
      id: "session3",
      name: "Sample Session 3",
      questions: [],
      lastModified: new Date("2025-12-25T09:00:00Z"),
    },
  ]
}

function QuizSessionOverviewPage() {
  const [sessions, setSessions] = useState<QuizQuestionSession[] | null>(null)

  useEffect(() => {
    getSessions()
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