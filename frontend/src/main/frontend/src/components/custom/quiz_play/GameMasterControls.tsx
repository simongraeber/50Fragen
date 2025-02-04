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
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi | null>(null);
  // Maintain a separate state for the current index.
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (carouselApi) {
      // Define a handler to update currentIndex when the carousel selection changes.
      const onSelect = () => {
        setCurrentIndex(carouselApi.selectedScrollSnap());
      };

      // Subscribe to the carousel's select event.
      carouselApi.on("select", onSelect);
      // Initialize the index.
      onSelect();

      // Cleanup the event when the carouselApi changes or the component unmounts.
      return () => {
        carouselApi.off("select", onSelect);
      };
    }
  }, [carouselApi]);

  const showQuestion = () => {
    if (!carouselApi) {
      console.log("Carousel API not ready");
      return;
    }
    // Use the currentIndex from state for consistency.
    console.log("Show Question for:", quiz.questions[currentIndex]);
    // Further logic can be added here to display or process the question.
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
        <Button
          disabled={!carouselApi || currentIndex === 0}
          onClick={() => carouselApi && carouselApi.scrollPrev()}
        >
          <MdNavigateBefore />
        </Button>
        <Button onClick={showQuestion}>
          Show Question
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