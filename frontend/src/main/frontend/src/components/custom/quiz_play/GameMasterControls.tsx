import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { Quiz } from "@/types/Quiz.ts";
import QuestionCard from "@/components/custom/quiz_play/QuestionCard.tsx";
import { newQuestion, showQuestion } from "@/api/quizGame.ts"
import { useTranslation } from "react-i18next"

interface GameMasterControlsProps {
  quiz: Quiz;
}

function GameMasterControls({ quiz }: GameMasterControlsProps) {
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const { t } = useTranslation();

  React.useEffect(() => {
    if (carouselApi) {
      const onSelect = () => {
        const newIndex = carouselApi.selectedScrollSnap();
        setCurrentIndex(newIndex);
        onNewQuestion(newIndex); // Pass the new index to onNewQuestion
      };

      carouselApi.on("select", onSelect);
      onSelect();

      return () => {
        carouselApi.off("select", onSelect);
      };
    }
  }, [carouselApi]);

  const onShowQuestion = () => {
    if (carouselApi) {
      showQuestion(quiz.id, quiz.questions[currentIndex].question);
    }
  };

  const onNewQuestion = (index: number) => {
    newQuestion(quiz.id, quiz.questions[index].type);
  }

  return (
    <Card>
      <CardContent>
        <Carousel setApi={setCarouselApi} className="w-full pt-4">
          <CarouselContent className="-ml-4">
            {quiz.questions.map((question, index) => (
              <CarouselItem key={index} className="pl-4">
                <QuestionCard question={question} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          disabled={!carouselApi || currentIndex === 0}
          onClick={() => carouselApi && carouselApi.scrollPrev()}
        >
          <MdNavigateBefore />
        </Button>
        <Button onClick={onShowQuestion}>
          {t("p_show_q")}
        </Button>
        <Button
          disabled={
            !carouselApi || currentIndex === quiz.questions.length - 1
          }
          onClick={() => carouselApi && carouselApi.scrollNext()}
        >
          <MdNavigateNext />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default GameMasterControls;