import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import { User } from "@/types/User"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"

import { FaCheck } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import { FaUndoAlt } from "react-icons/fa"
import { setGameActive, updateUserScore } from "@/api/quizGame"
import useQuizIdFromUrl from "@/hooks/useQuizIdFromUrl"
import { useGame } from "@/providers/GameProvider.tsx"
import { useState } from "react"
import { UserScore } from "@/components/custom/quiz_play/LeaderBord.tsx"

export interface ButtonClickedDialogProps {
  user: User;
  canEdit: boolean;
  open: boolean;
}

export function ButtonClickedDialog({ user, canEdit, open }: ButtonClickedDialogProps) {
  const quizId = useQuizIdFromUrl()

  const { state } = useGame();
  const [scores, _] = useState<UserScore[]>(state.quizState?.participantsScores ?? []);

  const onReset = () => {
    setGameActive(quizId)
  }

  const onCorrectAnswer = () => {
    // give one point to the user who buzzed in
    for (let i = 0; i < scores.length; i++) {
      if (scores[i].user.id === user.id) {
        updateUserScore(quizId, scores[i].user.id, scores[i].score + scores.length -1);
      }
    }
    setGameActive(quizId)
  }

  const onWrongAnswer = () => {
    // give one point to the user except the user who buzzed in
    for (let i = 0; i < scores.length; i++) {
      if (scores[i].user.id !== user.id) {
        updateUserScore(quizId, scores[i].user.id, scores[i].score + 1);
      }
    }
    setGameActive(quizId)
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>{user.name} buzzed in!</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex items-center gap-4 py-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.image} alt={user.name} />
          </Avatar>
        </div>
        {canEdit && (
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
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ButtonClickedDialog