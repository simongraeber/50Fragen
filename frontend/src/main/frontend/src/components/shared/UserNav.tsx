import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup,
  DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { fetchCurrentUser } from "@/reducers/authenticationReducer"
import DiscordLogInButton from "@/components/shared/DiscordLogInButton.tsx"
import rootReducer from "@/reducers/index"
import { Button } from "../ui/button"

export type RootState = ReturnType<typeof rootReducer>

function UserNav() {
  const dispatch = useDispatch()
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
            <AvatarImage className="object-cover w-full h-full"
              src={user.image} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={5} align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <a href="/quizzes">Quizzes</a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <a href="/logout_now">Log out</a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav