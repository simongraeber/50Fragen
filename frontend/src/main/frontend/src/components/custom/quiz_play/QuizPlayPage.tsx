import { useEffect, useState } from "react";
import useQuizIdFromUrl from "@/hooks/useQuizIdFromUrl";
import Round3DButton from "@/components/custom/quiz_play/BuzzerButton.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import LeaderBord from "@/components/custom/quiz_play/LeaderBord.tsx";
import TextSubmission from "@/components/custom/quiz_play/TextSubmission.tsx";
import ButtonClickedDialog from "@/components/custom/quiz_play/ButtonClickedDialog.tsx";
import GameMasterControls from "@/components/custom/quiz_play/GameMasterControls.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import EstimationQuestionAnswers from "@/components/custom/quiz_play/EstimationQuestionAnswers.tsx";
import { RootState } from "@/lib/store.ts";
import { useSelector } from "react-redux";
import { hitBuzz, setGameActive, setGameInactive } from "@/api/quizGame.ts"
import { GameProvider, useGame} from "@/providers/GameProvider.tsx";
import { Button } from "@/components/ui/button.tsx"

function QuizPlayContent() {
  const quizId = useQuizIdFromUrl();
  const [dialogOpen, setDialogOpen] = useState(false);
  const isOnline = useSelector((state: RootState) => state.onlineStatus.isOnline);

  // Consume global game state here.
  const { state } = useGame();
  const { buzzData, quizState } = state;

  // When a buzz event is received, show the dialog.
  useEffect(() => {
    if (buzzData && buzzData.quizId === quizId) {
      console.log("Buzz event for current quiz:", buzzData);
      setDialogOpen(true);
    }
  }, [buzzData, quizId]);

  // When the game becomes active, close the dialog, etc.
  useEffect(() => {
    if (quizState) {
      console.log("Global game state updated:", quizState);
      if (quizState.active) {
        setDialogOpen(false);
      }
    }
  }, [quizState]);

  return (
    <div className="h-full pb-32 p-4">
      <Badge className={isOnline ? "bg-green-500" : "bg-red-500"}>
        {isOnline ? "Online" : "Offline"}
      </Badge>
      <p className="mb-4">Play page for quiz ID: {quizId}</p>
      <Round3DButton
        isActiv={quizState?.active || false}
        onClick={() => {
          console.log("Buzz button clicked");
          hitBuzz(quizId, "SomeUserId");
        }}
      />
      <Separator />
      <Button
        onClick={() => {
          if(quizState?.active) {
            setGameInactive(quizId);
          } else {
            setGameActive(quizId);
          }
        }}>
        Set {quizState?.active ? "inactive" : "active"}
      </Button>
      <Separator />
      <div className="p-4 max-w-[400px]">
        <LeaderBord
          canEdit={true}
        />
      </div>
      <Separator />
      <div className="p-4 max-w-[400px]">
        <TextSubmission active={quizState?.active || false} />
      </div>
      <ButtonClickedDialog
        open={dialogOpen}
        canEdit={true}
        user={{
          id: "1",
          name: "Nico",
          image:
            "https://cdn.discordapp.com/avatars/265637593172017162/4e8142aa1e1b1b24cdca93b87fbff331.png?size=64",
        }}
      />
      <Separator />
      <div className="p-4 max-w-[400px]">
        <GameMasterControls
          quiz={{
            id: "1",
            name: "Test quiz",
            lastModified: new Date(),
            questions: [
              {
                id: "1",
                question: "Test question",
                answer: "Test answer",
                type: "buzzerquestion",
              },
              {
                id: "2",
                question: "2 Test question",
                answer: "Test answer",
                type: "buzzerquestion",
              },
              {
                id: "3",
                question: "3 Test question",
                answer: "Test answer",
                type: "buzzerquestion",
              },
            ],
          }}
        />
      </div>
      <Separator />
      <div className="p-4 max-w-[400px]">
        <EstimationQuestionAnswers
          answers={[
            {
              user: {
                id: "1",
                name: "Nico",
                image:
                  "https://cdn.discordapp.com/avatars/265637593172017162/4e8142aa1e1b1b24cdca93b87fbff331.png?size=64",
              },
              answer: "100",
            },
            {
              user: {
                id: "2",
                name: "Lucas",
                image:
                  "https://cdn.discordapp.com/avatars/631929224197963786/5a68849ba4b1cf76e899e1f49db44bc7.png?size=64",
              },
              answer: "200",
            },
          ]}
          canEdit={true}
          quizId={quizId}
        />
      </div>
    </div>
  );
}

export default function QuizPlayPage() {
  const quizId = useQuizIdFromUrl();

  return (
    <GameProvider quizId={quizId}>
      <QuizPlayContent />
    </GameProvider>
  );
}