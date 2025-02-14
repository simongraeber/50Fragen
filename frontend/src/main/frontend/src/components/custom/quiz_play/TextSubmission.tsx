import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx"
import { useState } from "react"
import { newTextAnswer } from "@/api/quizGame.ts"

function TextSubmission({ active, quizId }: { active: boolean, quizId: string }) {
  const [value, setValue] = useState("")

  const handleSubmit = () => {
    newTextAnswer(quizId, value)
    setValue("")
  }
  return (
    <Card
      className={`${active ? "" : "bg-gray-200"}`}
      >
      <CardHeader>
        <h1 className="text-xl">What is your guess?</h1>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <Input
            placeholder="Enter your answer here"
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
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default TextSubmission