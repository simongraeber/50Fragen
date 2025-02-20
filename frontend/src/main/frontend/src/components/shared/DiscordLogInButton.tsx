import { BsDiscord } from "react-icons/bs"
import { Button } from "@/components/ui/button.tsx"
import { useTranslation } from "react-i18next"

function DiscordLogInButton() {
  const { t } = useTranslation();
  return (
    <Button
      className="bg-[#7289da] hover:bg-[#5a6fb2]"
      onClick={() => {
        // redirect to the backend to start the OAuth flow
        window.location.href = "/oauth2/authorization/discord"
      }}
    >
      <BsDiscord className="mr-2 text-xl" />
      {t("l_sign_discord")}
    </Button>
  )
}

export default DiscordLogInButton