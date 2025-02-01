import useQuizIdFromUrl from "@/hooks/useQuizIdFromUrl"
import Round3DButton from "@/components/custom/quiz_play/BuzzerButton.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import LeaderBord from "@/components/custom/quiz_play/LeaderBord.tsx"
import TextSubmission from "@/components/custom/quiz_play/TextSubmission.tsx"
import ButtonClickedDialog from "@/components/custom/quiz_play/ButtonClickedDialog.tsx"
import GameMasterControls from "@/components/custom/quiz_play/GameMasterControls.tsx"
import { Button } from "@/components/ui/button.tsx"
import { useState } from "react"
import EstimationQuestionAnswers from "@/components/custom/quiz_play/EstimationQuestionAnswers.tsx"

function QuizPlayPage() {
  const quizId = useQuizIdFromUrl()

  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="h-full pb-32 p-4">
      <p
        className="mb-4"
      >Play page for quiz ID: {quizId}</p>
      <Round3DButton
        onClick={function(): void {
          console.log("Clicked")
        }} />

      <Separator />
      <div className="p-4 w-1/4">
        <LeaderBord
          canEdit={true}
          scores={[
            {
              user: {
                id: "1",
                name: "Nico",
                image: "https://cdn.discordapp.com/avatars/265637593172017162/4e8142aa1e1b1b24cdca93b87fbff331.png?size=64",
              }, score: 100,
            },
            {
              user: {
                id: "2",
                name: "Lucas",
                image: "https://cdn.discordapp.com/avatars/631929224197963786/5a68849ba4b1cf76e899e1f49db44bc7.png?size=64",
              }, score: 100,
            },
          ]} />
      </div>

      <Separator />
      <div className="p-4 w-1/4">
        <TextSubmission active={true} />
      </div>

      <Separator />
      <Button
        onClick={() => setDialogOpen(true)}
      >
        Open Dialog
      </Button>
      <ButtonClickedDialog
        open={dialogOpen}
        canEdit={true}
        user={{
        id: "1",
        name: "Nico",
        image: "https://cdn.discordapp.com/avatars/265637593172017162/4e8142aa1e1b1b24cdca93b87fbff331.png?size=64",
      }} />

      <Separator />
      <div className="p-4 w-1/4">
        <GameMasterControls
          quiz={{
            id: "1",
            name: "Test quiz",
            lastModified: new Date(),
            questions: [
              {
                id: "1",
                question: "Test question",
                answer: "Test answer",
                type: "buzzerquestion",
              },
              {
                id: "2",
                question: "2 Test question",
                answer: "Test answer",
                type: "buzzerquestion",
              },
              {
                id: "3",
                question: "3 Test question",
                answer: "Test answer",
                type: "buzzerquestion",
              }
            ],
          }}
        />
      </div>
      <Separator />
      <div className="p-4 w-1/4">
        <EstimationQuestionAnswers answers={[
          {
            user: {
              id: "1",
              name: "Nico",
              image: "https://cdn.discordapp.com/avatars/265637593172017162/4e8142aa1e1b1b24cdca93b87fbff331.png?size=64",
            }, answer: "100",
          },
          {
            user: {
              id: "2",
              name: "Lucas",
              image: "https://cdn.discordapp.com/avatars/631929224197963786/5a68849ba4b1cf76e899e1f49db44bc7.png?size=64",
            }, answer: "200",
          }
        ]}
                                   canEdit={true}
        />
      </div>
    </div>
  )
}

export default QuizPlayPage