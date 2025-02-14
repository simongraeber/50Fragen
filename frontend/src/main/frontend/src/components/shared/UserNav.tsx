import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { fetchCurrentUser } from "@/reducers/authenticationReducer"
import DiscordLogInButton from "@/components/shared/DiscordLogInButton.tsx"
import { RootState } from "@/lib/store"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"

function UserNav() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.authentication.user)

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])

  if (!user) {
    return <DiscordLogInButton />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative h-12 w-12 p-0 m-0 rounded-full">
          <Avatar className="w-12 h-12">
            <AvatarImage
              className="object-cover w-full h-full rounded-full"
              src={user.image}
              alt={user.name}
            />
            <AvatarFallback
              className="w-full h-full flex items-center justify-center text-xl"
            >
              {user.name[0]}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={5} align="end">
        <DropdownMenuGroup>
            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              navigate("/quizzes")
            }}
          >
            Quizzes
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              window.location.href = "/logout_now";
            }}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav