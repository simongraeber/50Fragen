import { BsDiscord } from "react-icons/bs"
import { Button } from "@/components/ui/button.tsx"

function DiscordLogInButton() {
  return (
    <Button
      className="bg-[#7289da] hover:bg-[#5a6fb2]"
      onClick={() => {
      }}
    >
      <BsDiscord className="mr-2 text-xl" />
      Sign in with Discord
    </Button>
  )
}

export default DiscordLogInButton