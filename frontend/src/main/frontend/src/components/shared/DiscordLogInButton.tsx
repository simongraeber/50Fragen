import { BsDiscord, BsGoogle } from "react-icons/bs";
import { Button } from "@/components/ui/button.tsx";
import { useTranslation } from "react-i18next";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function DiscordLogInButton() {
  const { t } = useTranslation();

  return (
    <TooltipProvider>
      <div className="flex items-center justify-between">
        <span className="mr-4">{t("l_sign_in")}</span>
        <div className="flex space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="bg-[#7289da] hover:bg-[#5a6fb2] text-white p-2 h-10 w-10 flex items-center justify-center"
                onClick={() => {
                  window.location.href = "/oauth2/authorization/discord";
                }}
              >
                <div className="flex items-center justify-center">
                  <BsDiscord className="text-[3rem]" />
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("l_t_discord")}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="p-2 h-10 w-10 flex items-center justify-center"
                onClick={() => {
                  window.location.href = "/oauth2/authorization/google";
                }}
              >
                <div className="flex items-center justify-center">
                  <BsGoogle className="text-[3rem]" />
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("l_t_google")}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default DiscordLogInButton;