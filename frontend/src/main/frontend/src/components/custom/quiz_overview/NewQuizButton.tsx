import { useState } from "react"
import { createQuiz } from "@/api/quizCalls.ts"
import { useNavigate } from "react-router-dom"
import LoadingButton from "@/components/ui/LoadingButton.tsx"
import { useTranslation } from "react-i18next"


function NewQuizButton() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation();

  const create_new = async () => {
    setLoading(true)
    try {
      const new_quiz = await createQuiz(
        { name: t("o_new_q") }
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
      {t("o_new_q")}
    </LoadingButton>
  )
}

export default NewQuizButton