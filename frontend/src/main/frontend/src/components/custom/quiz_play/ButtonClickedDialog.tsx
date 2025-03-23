import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import { User } from "@/types/User"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"

import { FaCheck } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import { FaUndoAlt } from "react-icons/fa"
import { setGameActive, updateUserScore, updateUserScores } from "@/api/quizGame"
import useQuizIdFromUrl from "@/hooks/useQuizIdFromUrl"
import { useGame } from "@/providers/GameProvider.tsx"
import { useState } from "react"
import { Score } from "@/types/gamePlay/Score.ts"
import { useEffect } from "react";
import { useTranslation } from "react-i18next"
import { QuizQuestion } from "@/types/QuizQuestion.ts"
import QuestionCard from "@/components/custom/quiz_play/QuestionCard.tsx"
import { getQuestion } from "@/api/questionCalls.ts"
import { Skeleton } from "@/components/ui/skeleton.tsx"


export interface ButtonClickedDialogProps {
  user: User;
  canEdit: boolean;
  open: boolean;
}

export function ButtonClickedDialog({ user, canEdit, open }: ButtonClickedDialogProps) {
  const quizId = useQuizIdFromUrl()
  const [questionLoading, setQuestionLoading] = useState(true)
  const [question, setQuestion] = useState<QuizQuestion | null>(null)

  const { state } = useGame();
  const [scores, setScores] = useState<Score[]>(state.quizState?.participantsScores ?? []);
  const { t } = useTranslation();

  useEffect(() => {
    setScores(state.quizState?.participantsScores ?? []);
  }, [state.quizState?.participantsScores]);

  const onReset = () => {
    setGameActive(quizId)
  }

  const onCorrectAnswer = async () => {
    // give one point to the user who buzzed in
    for (let i = 0; i < scores.length; i++) {
      if (scores[i].user.id === user.id) {
        updateUserScore(quizId, scores[i].user.id, scores[i].score + scores.length - 1);
      }
    }
    await new Promise(r => setTimeout(r, 50));
    setGameActive(quizId)
  }

  const onWrongAnswer = async () => {
    // give one point to the user except the user who buzzed in
    const updates = scores.filter(
      (score) => score.user.id !== user.id
    ).map((score) => ({
      userID: score.user.id,
      score: score.score + 1,
    }));
    updateUserScores({ quizID: quizId, users: updates });
    await new Promise(r => setTimeout(r, 50));
    setGameActive(quizId)
  }

  useEffect(() => {
    if (canEdit && state.currentQuestionId != null) {
      setQuestionLoading(true);
      const fetchQuestion = async () => {
        try {
          const data = await getQuestion(quizId, state.currentQuestionId!);
          setQuestion(data);
        } catch (error) {
          console.error("Error retrieving question:", error);
        } finally {
          setQuestionLoading(false);
        }
      };
      fetchQuestion();
    }
  }, [canEdit, state.currentQuestionId, quizId]);

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="sm:max-w-[425px] overflow-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>{user.name} {t("p_buzzed")}</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex items-center gap-4 py-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        {canEdit && (
          <>
            {!questionLoading ? (
              <QuestionCard question={question!} onTypeChange={() => {}}/>
            ) : (
              <div className="flex justify-center">
                <Skeleton className="w-full h-40" />
              </div>
            )}
            <AlertDialogFooter>
              <Button variant="outline"
                onClick={onCorrectAnswer}
              >
                <FaCheck className="text-green-700" />
              </Button>
              <Button variant="outline"
                onClick={onWrongAnswer}
              >
                <ImCross className="text-red-700" />
              </Button>
              <Button
                variant="outline"
                onClick={onReset}
              >
                <FaUndoAlt />
              </Button>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ButtonClickedDialog