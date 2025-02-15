import { useEffect, useState } from "react"
import useQuizIdFromUrl from "@/hooks/useQuizIdFromUrl"
import Round3DButton from "@/components/custom/quiz_play/BuzzerButton.tsx"
import LeaderBordWithScoreProvider from "@/components/custom/quiz_play/LeaderBord/LeaderBordWithScoreProvider"
import TextSubmission from "@/components/custom/quiz_play/TextSubmission.tsx"
import ButtonClickedDialog from "@/components/custom/quiz_play/ButtonClickedDialog.tsx"
import GameMasterControls from "@/components/custom/quiz_play/GameMasterControls.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import EstimationQuestionAnswers from "@/components/custom/quiz_play/EstimationQuestionAnswers.tsx"
import { RootState } from "@/lib/store.ts"
import { useSelector } from "react-redux"
import { hitBuzz, setGameActive, setGameInactive } from "@/api/quizGame.ts"
import { useGame } from "@/providers/GameProvider.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Quiz } from "@/types/Quiz.ts"
import { getQuizOrNull } from "@/api/quizCalls.ts"
import { Link } from "react-router-dom"
import Page from "@/components/shared/Layout/Page.tsx"

function QuizPlayPage() {
  const quizId = useQuizIdFromUrl()
  const [dialogOpen, setDialogOpen] = useState(false)
  const isOnline = useSelector((state: RootState) => state.onlineStatus.isOnline)
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [buzzUserId, setBuzzUserId] = useState<string | null>(null)

  // Consume global game state here.
  const { state } = useGame()
  const { buzzData, quizState } = state

  // Try to load the quiz.
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

  // When the game becomes active, close the dialog.
  useEffect(() => {
    if (quizState && quizState.active) {
      setDialogOpen(false)
    }
  }, [quizState])

  return (
    <Page>
      <header className="w-full mb-2">
        <div className="flex justify-between items-center">
          <Badge className={isOnline ? "bg-green-500" : "bg-red-500"}>
            {isOnline ? "Online" : "Offline"}
          </Badge>
          {quiz && (
            <Button onClick={() => {
              quizState?.active ? setGameInactive(quizId) : setGameActive(quizId)
            }}>
              Set {quizState?.active ? "inactive" : "active"}
            </Button>
          )}
        </div>
      </header>

      <h1 className="w-full text-center text-4xl md:text-5xl font-extrabold mb-2
                     bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500
                     bg-clip-text text-transparent">
        {state.quizState ? state.quizState.name : "Loading..."}
      </h1>

      {state.quizState && (
        <>
          <section className="w-full my-2 h-24">
            {state.quizState?.currentQuestion && (
              <Card className="h-24">
                <CardHeader>
                  <CardTitle>Question</CardTitle>
                </CardHeader>
                <CardContent>{state.quizState.currentQuestion}</CardContent>
              </Card>
            )}
          </section>

          <main className="w-full flex flex-col lg:flex-row gap-2 flex-1">
            {/* Left Aside: Text answers */}
            <aside className="flex-1 lg:mx-2 min-w-0 lg:basis-1/4 flex flex-col gap-2">
              {quizState?.textAnswers && quizState.textAnswers.length > 0 && (
                <div className="pt-2 pb-2">
                  <EstimationQuestionAnswers
                    answers={quizState.textAnswers}
                    canEdit={!!quiz}
                    quizId={quizId}
                  />
                </div>
              )}
            </aside>

            <div className="flex-1 lg:mx-2 min-w-0 lg:basis-1/3">
              {quiz ? (
                <div className="mb-2">
                  {quiz.questions.length > 0 ? (
                    <div className="lg:px-1">
                      <GameMasterControls quiz={quiz} />
                    </div>
                  ) : (
                    <Card className="pt-2 pb-2 text-center">
                      ⚠️ This quiz has no questions yet. <br />
                      <Link to={`/editor/${quizId}`} className="text-blue-500 hover:underline">
                        Add a question
                      </Link>
                    </Card>
                  )}
                </div>
              ) : (
                <div className="lg:px-1 flex justify-center h-52">
                  {state.quizState?.currentQuestionType === "estimationquestion" ? (
                    <div className="mb-auto">
                      <TextSubmission active={quizState?.active || false} quizId={quizId} />
                    </div>
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
            <aside className="flex-1 lg:mx-2 min-w-0 lg:basis-1/4 flex flex-col gap-2">
              <div className="lg:px-1">
                <LeaderBordWithScoreProvider canEdit={!!quiz} />
              </div>
            </aside>
          </main>

          <ButtonClickedDialog
            open={dialogOpen}
            canEdit={!!quiz}
            user={{
              id: buzzUserId || "1",
              name:
                quizState?.participantsScores.find((player) => player.user.id === buzzUserId)?.user
                  .name || "Unknown",
              image:
                quizState?.participantsScores.find((player) => player.user.id === buzzUserId)?.user
                  .image || "",
            }}
          />
        </>
      )}
    </Page>
  )
}

export default QuizPlayPage