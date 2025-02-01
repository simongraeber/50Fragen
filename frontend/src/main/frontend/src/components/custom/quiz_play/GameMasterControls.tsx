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

interface GameMasterControlsProps {
  quiz: Quiz;
}

function GameMasterControls({ quiz }: GameMasterControlsProps) {
  // Hold the carousel API so you can control it with your external buttons.
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi | null>(null);

  const showQuestion = () => {
    if (!carouselApi) {
      console.log("Carousel API not ready");
      return;
    }
    // Get the current slide index from the carousel API.
    const currentIndex = carouselApi.selectedScrollSnap();
    console.log("Show Question for:", quiz.questions[currentIndex]);
    // You can add further logic to display or process the question.
  };

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
        <Button onClick={() => carouselApi && carouselApi.scrollPrev()}>
          <MdNavigateBefore />
        </Button>
        <Button onClick={showQuestion}>
          Show Question
        </Button>
        <Button onClick={() => carouselApi && carouselApi.scrollNext()}>
          <MdNavigateNext />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default GameMasterControls;