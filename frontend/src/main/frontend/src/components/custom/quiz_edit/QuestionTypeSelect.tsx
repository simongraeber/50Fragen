import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx"
import { QuizQuestion } from "@/types/QuizQuestion.ts"
import { useTranslation } from "react-i18next"


type QuestionTypeSelectProps = {
  value: QuizQuestion["type"];
  onValueChange: (value: QuizQuestion["type"]) => void;
}

function QuestionTypeSelect(props: QuestionTypeSelectProps) {
  const { t } = useTranslation()
  return (
    <Select
      value={props.value}
      onValueChange={(value) => props.onValueChange(value as QuizQuestion["type"])}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select question type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>
            {t("q_type")}
          </SelectLabel>
          <SelectItem value="buzzerquestion">
            {t("buzzerquestion")}
          </SelectItem>
          <SelectItem value="estimationquestion">
            {t("estimationquestion")}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default QuestionTypeSelect