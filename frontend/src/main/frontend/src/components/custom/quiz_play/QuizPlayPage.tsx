import { useEffect, useState } from "react"
import useQuizIdFromUrl from "@/hooks/useQuizIdFromUrl"
import Round3DButton from "@/components/custom/quiz_play/BuzzerButton.tsx"
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
    <div className="min-h-screen p-4 flex flex-col">
      <header className="mb-4">
        <div className="flex justify-between items-center">
          <Badge className={isOnline ? "bg-green-500" : "bg-red-500"}>
            {isOnline ? "Online" : "Offline"}
          </Badge>
          {quiz && (
            <Button
              onClick={() => {
                quizState?.active ? setGameInactive(quizId) : setGameActive(quizId)
              }}
            >
              Set {quizState?.active ? "inactive" : "active"}
            </Button>
          )}
        </div>
      </header>

      <h1 className="text-3xl font-bold mb-4">
        {state.quizState ? state.quizState.name : "Loading..."}
      </h1>

      {state.quizState && (
        <>
          <section className="mb-4 h-24">
            {state.quizState?.currentQuestion && (
              <Card className="h-24">
                <CardHeader>
                  <CardTitle>Question</CardTitle>
                </CardHeader>
                <CardContent>
                  {state.quizState.currentQuestion}
                </CardContent>
              </Card>
            )}
          </section>

          <main className="flex flex-col lg:flex-row gap-4 flex-1">
            {/* Left Aside: For text answers */}
            <aside className="flex-1 min-w-0 lg:basis-1/4 flex flex-col gap-4">
              {quizState?.textAnswers && quizState.textAnswers.length > 0 && (
                <div className="p-4">
                  <EstimationQuestionAnswers
                    answers={quizState.textAnswers}
                    canEdit={!!quiz}
                    quizId={quizId}
                  />
                </div>
              )}
            </aside>

            <div className="flex-1 min-w-0 lg:basis-1/3">
              {quiz ? (
                <div className="mb-4">
                  {quiz.questions.length > 0 ? (
                    <div className="p-4">
                      <GameMasterControls quiz={quiz} />
                    </div>
                  ) : (
                    <Card className="p-4 text-center">
                      ⚠️ This quiz has no questions yet. <br />
                      <Link to={`/editor/${quizId}`} className="text-blue-500 hover:underline">
                        Add a question
                      </Link>
                    </Card>
                  )}
                </div>
              ) : (
                <div className="p-4 flex justify-center">
                  {state.quizState?.currentQuestionType === "estimationquestion" ? (
                    <TextSubmission active={quizState?.active || false} quizId={quizId} />
                  ) : (
                    <Round3DButton
                      isActiv={quizState?.active || false}
                      onClick={() => hitBuzz(quizId)}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Right Aside: Leaderboard */}
            <aside className="flex-1 min-w-0 lg:basis-1/4 flex flex-col gap-4">
              <div className="p-4">
                <LeaderBord canEdit={!!quiz} />
              </div>
            </aside>
          </main>

          <ButtonClickedDialog
            open={dialogOpen}
            canEdit={!!quiz}
            user={{
              id: buzzUserId || "1",
              name:
                quizState?.participantsScores.find(
                  (player) => player.user.id === buzzUserId,
                )?.user.name || "Unknown",
              image:
                quizState?.participantsScores.find(
                  (player) => player.user.id === buzzUserId,
                )?.user.image || "",
            }}
          />

        </>)}
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