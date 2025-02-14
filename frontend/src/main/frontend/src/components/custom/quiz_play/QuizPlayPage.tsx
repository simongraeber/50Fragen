import { useEffect, useState } from "react"
import useQuizIdFromUrl from "@/hooks/useQuizIdFromUrl"
import Round3DButton from "@/components/custom/quiz_play/BuzzerButton.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import LeaderBord from "@/components/custom/quiz_play/LeaderBord.tsx"
import TextSubmission from "@/components/custom/quiz_play/TextSubmission.tsx"
import ButtonClickedDialog from "@/components/custom/quiz_play/ButtonClickedDialog.tsx"
import GameMasterControls from "@/components/custom/quiz_play/GameMasterControls.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import EstimationQuestionAnswers from "@/components/custom/quiz_play/EstimationQuestionAnswers.tsx"
import { RootState } from "@/lib/store.ts"
import { useSelector } from "react-redux"
import { hitBuzz, setGameActive, setGameInactive } from "@/api/quizGame.ts"
import { GameProvider, useGame } from "@/providers/GameProvider.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Quiz } from "@/types/Quiz.ts"
import { getQuizOrNull } from "@/api/quizCalls.ts"
import { Link } from "react-router-dom"

function QuizPlayContent() {
  const quizId = useQuizIdFromUrl()
  const [dialogOpen, setDialogOpen] = useState(false)
  const isOnline = useSelector((state: RootState) => state.onlineStatus.isOnline)
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [buzzUserId, setBuzzUserId] = useState<string | null>(null)

  // Consume global game state here.
  const { state } = useGame()
  const { buzzData, quizState } = state

  // try to load the quiz
  useEffect(() => {
    async function loadQuiz() {
      const quiz = await getQuizOrNull(quizId)
      if (quiz) {
        setQuiz(quiz)
      }
    }
    loadQuiz()
  }, [quizId])

  // When a buzz event is received, show the dialog.
  useEffect(() => {
    if (buzzData && buzzData.quizId === quizId) {
      setBuzzUserId(buzzData.userId)
      setDialogOpen(true)
    }
  }, [buzzData, quizId])

  // When the game becomes active, close the dialog, etc.
  useEffect(() => {
    if (quizState) {
      if (quizState.active) {
        setDialogOpen(false)
      }
    }
  }, [quizState])

  return (
    <div className="h-full pb-32 p-4">
      <Badge className={"p-4" + isOnline ? "bg-green-500" : "bg-red-500"}>
        {isOnline ? "Online" : "Offline"}
      </Badge>
        {state.quizState?.currentQuestion !== "" && (
          <Card>
            <CardHeader>
              <CardTitle>
                Question
              </CardTitle>
            </CardHeader>
            <CardContent>
              {state.quizState?.currentQuestion}
            </CardContent>
          </Card>
        )}
        <Separator />
      {!quiz &&
        <>
          {
            state.quizState?.currentQuestionType === "estimationquestion" ? (
              <div className="p-4 max-w-[400px]">
                <TextSubmission
                  active={quizState?.active || false}
                  quizId={quizId}
                />
              </div>
            ) : (
              <div className="p-4 pt-6 max-w-[400px]">
                <Round3DButton
                  isActiv={quizState?.active || false}
                  onClick={() => {
                    hitBuzz(quizId)
                  }}
                />
              </div>
            )

          }
          <Separator />
        </>
      }
        {quiz && (
          <div className="p-4">
            <Button
              onClick={() => {
                if (quizState?.active) {
                  setGameInactive(quizId)
                } else {
                  setGameActive(quizId)
                }
              }}>
              Set {quizState?.active ? "inactive" : "active"}
            </Button><Separator />
          </div>
        )}
        <div className="p-4 max-w-[400px]">
          <LeaderBord
            canEdit={!!quiz}
          />
        </div>
        <Separator />

        <ButtonClickedDialog
          open={dialogOpen}
          canEdit={!!quiz}
          user={{
                id: buzzUserId || "1",
                name: quizState?.participantsScores.find((player) => player.user.id === buzzUserId)?.user.name || "Unknown",
                image: quizState?.participantsScores.find((player) => player.user.id === buzzUserId)?.user.image || "",
              }}
        />
        <Separator />
        {quiz && (
          quiz.questions.length > 0 ? (
          <>
            <div className="p-4 max-w-[400px]">
              <GameMasterControls
                quiz={quiz} />
            </div>
            <Separator />
          </>
        ):
          <div className="p-4 max-w-[400px] text-center">
            This quiz has no questions yet.
            <Link
              to={`/editor/${quizId}`}
              className="text-blue-500 hover:underline">
              Add a question
            </Link>
          </div>
        )}
        {quizState?.textAnswers && quizState.textAnswers.length > 0 &&
          <div className="p-4 max-w-[400px]">
            <EstimationQuestionAnswers
              answers={
                quizState?.textAnswers || []
              }
              canEdit={!!quiz}
              quizId={quizId}
            />
          </div>
        }
    </div>
  )
}

export default function QuizPlayPage() {
  const quizId = useQuizIdFromUrl()

  return (
    <GameProvider quizId={quizId}>
      <QuizPlayContent />
    </GameProvider>
  )
}