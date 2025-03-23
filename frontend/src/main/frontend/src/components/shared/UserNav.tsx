import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuPortal,
  DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { fetchCurrentUser } from "@/reducers/authenticationReducer"
import DiscordLogInButton from "@/components/shared/DiscordLogInButton.tsx"
import { RootState } from "@/lib/store"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@/providers/ThemeProvider.tsx"
import { disconnectSocket } from "@/api/socket.ts"
import { logOut } from "@/api/user.ts"
import { MdSunny } from "react-icons/md"
import { MdNightlight } from "react-icons/md"
import { useTranslation } from "react-i18next";
import { MdLanguage } from "react-icons/md";
import { availableLanguages } from "@/i18n.ts"


function UserNav() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.authentication.user)

  const { setTheme } = useTheme()

  const { i18n } = useTranslation();

  const languageChange = (lan: string) => {
    i18n.changeLanguage(lan);
  };

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
            <MdNightlight />
            Dark mode
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setTheme("light")
            }}
          >
            <MdSunny />
            Light mode
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <MdLanguage />
            Language
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {Object.entries(availableLanguages).map(([key, label]) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() => {
                    languageChange(key);
                  }}
                >
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              disconnectSocket();
              logOut().then(
                () => {
                  navigate("/loginCallback?logout")
                }
              )
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