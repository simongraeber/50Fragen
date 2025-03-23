import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AttachedImageExtension, QuizQuestionExtension } from "@/types/QuizQuestionExtension.ts"
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from "react-i18next"

type QuizQuestionExtensionDropdownProps = {
  onAddExtension: (extension: QuizQuestionExtension) => void;
};

export function QuizQuestionExtensionDropdown({ onAddExtension }: QuizQuestionExtensionDropdownProps) {
  const { t } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{t("ex_select_ex")}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t("ex_select_ex")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
          onClick={
            () => onAddExtension(
              {
                id: uuidv4(), // make sure to generate a unique id
                imageUrl: "",
                extensionType: "attachedImage",
              } as AttachedImageExtension
            )
          }>
            {t("ex_image")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
