import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { User } from "@/types/User.ts"
import { Avatar } from "@/components/ui/avatar.tsx"
import { AvatarImage } from "@radix-ui/react-avatar"
import { CardFooter } from "@/components/ui/card.tsx"

import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FaUndoAlt } from "react-icons/fa";


export interface ButtonClickedDialogProps {
  user: User;
  canEdit: boolean;
  open: boolean;
}

export function ButtonClickedDialog(
  { user,  canEdit, open}: ButtonClickedDialogProps
) {
  return (
    <Dialog
      open={open}
    >
      <DialogContent
        className="sm:max-w-[425px]">
        <div className="flex items-center gap-4 py-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.image} alt={user.name} />
          </Avatar>
          <h1 className="text-2xl font-bold">
            {user.name} buzzed in!
          </h1>
        </div>
        {canEdit && (
          <CardFooter
            className={`flex justify-end gap-4`}
          >
            <Button variant="outline">
              <FaCheck className="text-green-700" />
            </Button>
            <Button variant="outline">
              <ImCross className="text-red-700" />
            </Button>
            <Button variant="outline">
              <FaUndoAlt />
            </Button>
          </CardFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ButtonClickedDialog