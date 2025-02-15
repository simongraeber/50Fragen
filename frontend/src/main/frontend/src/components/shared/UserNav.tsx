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
import { useTheme } from "@/providers/hemeProvider.tsx"


function UserNav() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.authentication.user)

  const { setTheme } = useTheme()

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])

  if (!user) {
    return <DiscordLogInButton />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative h-10 w-10 p-0 m-0 rounded-full">
          <Avatar className="w-10 h-10">
            <AvatarImage
              className="object-cover w-full h-full rounded-full"
              src={user.image}
              alt={user.name}
            />
            <AvatarFallback
              className="w-full h-full flex items-center justify-center text-xl"
            >
              {user.name.slice(0, 2).toUpperCase()}
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
              setTheme("dark")
            }}
          >
            Dark mode
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setTheme("light")
            }}
          >
            Light mode
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