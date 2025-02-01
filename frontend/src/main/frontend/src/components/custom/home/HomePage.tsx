import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardTitle } from "@/components/ui/card.tsx"
import Round3DButton from "@/components/custom/quiz_play/BuzzerButton"
import { toast } from "@/hooks/use-toast.ts"

function HomePage() {
  const navigate = useNavigate()

  const handleClick = () => {
    toast( {
      title: "Hello",
      description: "You clicked the button",
      }
    )
  }
  return (
    <div className="flex-col h-full justify-center pb-32">
      <p>
        Wow this is the Home Page my be the first page you see :)
      </p>
      <Button className="m-8"
              onClick={handleClick}
      >
        Click me
      </Button>
      <Button className="m-8"
              onClick={() => navigate("/quizzes")}
      >
        See your Quizzes
      </Button>
      <Card
        className="m-8"
        >
        <CardTitle>
          Buzzer Demo
        </CardTitle>
        <CardContent>
          <Round3DButton onClick={function(): void {
                     console.log("Clicked")
                  } } />
        </CardContent>

      </Card>
    </div>
  )
}

export default HomePage