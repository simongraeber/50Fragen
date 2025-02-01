import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx"
import { useState } from "react"

function TextSubmission({ active }: { active: boolean }) {
  const [value, setValue] = useState("")

  const handleSubmit = () => {
    console.log("Submitted")
    console.log(value)
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