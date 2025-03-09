import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md"
import { Quiz } from "@/types/Quiz.ts"
import QuestionCard from "@/components/custom/quiz_play/QuestionCard.tsx"
import { newQuestion, showQuestion } from "@/api/quizGame.ts"
import { useTranslation } from "react-i18next"
import { QuizQuestionType } from "@/types/QuizQuestion.ts"
import { updateQuestion } from "@/api/questionCalls.ts"
import { Progress } from "@/components/ui/progress"

interface GameMasterControlsProps {
  quiz: Quiz;
}

function GameMasterControls({ quiz }: GameMasterControlsProps) {
  const [currentQuiz, setCurrentQuiz] = React.useState<Quiz>(quiz)
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi | null>(null)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const { t } = useTranslation()

  React.useEffect(() => {
    if (carouselApi) {
      const onSelect = () => {
        const newIndex = carouselApi.selectedScrollSnap()
        setCurrentIndex(newIndex)
        onNewQuestion(newIndex) // Pass the new index to onNewQuestion
      }

      carouselApi.on("select", onSelect)
      onSelect()

      return () => {
        carouselApi.off("select", onSelect)
      }
    }
  }, [carouselApi])

  const onShowQuestion = () => {
    if (carouselApi) {
      showQuestion(currentQuiz.id, currentQuiz.questions[currentIndex].question)
    }
  }

  const onNewQuestion = (index: number) => {
    newQuestion(currentQuiz.id, currentQuiz.questions[index].type)
  }

  const onTypeChange = (type: QuizQuestionType) => {
    const updatedQuestions = currentQuiz.questions
    updatedQuestions[currentIndex] = {
      ...updatedQuestions[currentIndex],
      type: type,
    }
    setCurrentQuiz(prevQuiz => {
      return {
        ...prevQuiz,
        questions: updatedQuestions,
      }
    })
    onNewQuestion(currentIndex)
    updatedQuestions[currentIndex].quizId = currentQuiz.id
    updateQuestion(updatedQuestions[currentIndex])
  }

  const progressPercent = ((currentIndex + 1) / currentQuiz.questions.length) * 100

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 -mx-2 left-0 right-0 flex items-center justify-between">
        <Progress value={progressPercent} className="flex-grow h-3" />
      </div>
      <CardContent>
        <Carousel setApi={setCarouselApi} className="w-full pt-6">
          <CarouselContent className="-ml-4">
            {currentQuiz.questions.map((question, index) => (
              <CarouselItem key={index} className="pl-4">
                <QuestionCard
                  onTypeChange={onTypeChange}
                  question={question} />
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
          disabled={!carouselApi || currentIndex === quiz.questions.length - 1}
          onClick={() => carouselApi && carouselApi.scrollNext()}
        >
          <MdNavigateNext />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default GameMasterControls