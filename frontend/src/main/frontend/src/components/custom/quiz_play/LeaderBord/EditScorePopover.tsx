import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Score } from "@/types/gamePlay/Score.ts";
import { useScore } from "./ScoreContext";
import { useTranslation } from "react-i18next"

interface EditScorePopoverProps {
  userScore: Score;
}

const EditScorePopover: React.FC<EditScorePopoverProps> = ({ userScore }) => {
  const [inputValue, setInputValue] = useState(String(userScore.score));
  const [isOpen, setIsOpen] = useState(false);
  const { updateScore } = useScore();
  const { t } = useTranslation();

  const handleSave = () => {
    const newScore = Number(inputValue);
    if (!isNaN(newScore)) {
      updateScore(userScore.user.id, newScore);
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          {t("edit")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Edit Score</h4>
            <p className="text-sm text-muted-foreground">
              Update the score for {userScore.user.name}.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="score-input">{t("score")}</Label>
              <Input
                id="score-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="col-span-2 h-8"
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSave}>{t("save")}</Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EditScorePopover;