import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { User } from "@/types/User";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FaUndoAlt } from "react-icons/fa";
import { setGameActive } from "@/api/quizGame";
import useQuizIdFromUrl from "@/hooks/useQuizIdFromUrl";

export interface ButtonClickedDialogProps {
  user: User;
  canEdit: boolean;
  open: boolean;
}

export function ButtonClickedDialog({ user, canEdit, open }: ButtonClickedDialogProps) {
  const quizId = useQuizIdFromUrl();

  const onReset = () => {
    console.log("Resetting");
    setGameActive(quizId);
  };

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
            <AlertDialogAction asChild>
              <Button variant="outline">
                <FaCheck className="text-green-700" />
              </Button>
            </AlertDialogAction>
            <AlertDialogAction asChild>
              <Button variant="outline">
                <ImCross className="text-red-700" />
              </Button>
            </AlertDialogAction>
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
  );
}

export default ButtonClickedDialog;