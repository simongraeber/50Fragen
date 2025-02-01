import { useState } from "react"
import { createQuiz } from "@/api/quizCalls.ts"
import { useNavigate } from "react-router-dom"
import LoadingButton from "@/components/ui/LoadingButton.tsx"


function NewQuizButton() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const create_new = async () => {
    setLoading(true)
    try {
      const new_quiz = await createQuiz(
        { name: "New Quiz" }
      )
      navigate(`/editor/${new_quiz.id}`)
    } catch (error) {
      console.error("Quiz creation failed", error)
      setLoading(false)
    }
  }

  return (
    <LoadingButton
      loading={loading}
      onClick={create_new}
      className="ml-auto"
    >
      New Quiz
    </LoadingButton>
  )
}

export default NewQuizButton