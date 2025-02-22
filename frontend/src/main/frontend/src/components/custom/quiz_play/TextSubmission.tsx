import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx"
import { useState } from "react"
import { newTextAnswer } from "@/api/quizGame.ts"
import { useTranslation } from "react-i18next"
import { useToast } from "@/hooks/use-toast.ts"

function TextSubmission({ active, quizId }: { active: boolean, quizId: string }) {
  const [value, setValue] = useState("")
  const { t } = useTranslation();
  const { toast } = useToast()

  const handleSubmit = () => {
    newTextAnswer(quizId, value)
    toast({
      title: t("p_gess_send"),
      description: value,
      variant: "success"
    })
  }
  return (
    <Card
      className={`${active ? "" : "bg-gray-200"}`}
      >
      <CardHeader>
        <h1 className="text-xl">{t("p_what_gess")}</h1>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <Input
            placeholder={t("p_what_gess_placeholder")}
            className="mr-2"
            value={value}
            disabled={!active}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit()
              }
            }}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            disabled={!active}
          >
            {t("submit")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default TextSubmission