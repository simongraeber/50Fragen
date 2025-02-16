import { useEffect, useState } from "react"
import { Quiz } from "@/types/Quiz.ts"
import QuizOverviewTable from "./QuizOverviewTable.tsx"
import { Card, CardContent } from "@/components/ui/card.tsx"
import { getAllQuizzes } from "@/api/quizCalls.ts"
import Page from "@/components/shared/Layout/Page.tsx"
import HeadLine from "@/components/shared/Layout/HeadLine.tsx"
import { motion } from "framer-motion"
import { scrollAnimation } from "@/components/shared/Layout/scrollAnimation.ts"

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
      <HeadLine>
        Your Quizzes
      </HeadLine>
      <motion.section
        className="w-full max-w-6xl px-4 mb-16"
        variants={scrollAnimation}
        initial="hidden"
        whileInView="visible"
        transition={{ delay: 0.0, duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Card>
          <CardContent>
            {quizzes ?
              <QuizOverviewTable data={quizzes} />
              : <QuizOverviewTable data={[]} loading={true} />
            }
          </CardContent>
        </Card>
      </motion.section>
    </Page>
  )
}

export default QuizOverviewPage