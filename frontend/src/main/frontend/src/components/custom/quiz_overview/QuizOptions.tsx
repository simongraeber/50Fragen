import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx"
import { Button } from "@/components/ui/button.tsx"

import { MoreHorizontal } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Quiz } from "@/types/Quiz.ts"

import { MdEdit } from "react-icons/md"
import { FaPlay } from "react-icons/fa"


export function QuizOptions({ QuizQuestionSession: session }: { QuizQuestionSession: Quiz }) {
  const navigate = useNavigate()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem disabled>
          Last Modified: {session.lastModified.toLocaleString()}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            navigate(`/editor/${session.id}`)
          }}
        >
          <MdEdit className="mr-2" />
          Edit Quiz
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            navigate(`/play/${session.id}`)
          }}
        >
          <FaPlay className="mr-2" />
          Start Quiz
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default QuizOptions