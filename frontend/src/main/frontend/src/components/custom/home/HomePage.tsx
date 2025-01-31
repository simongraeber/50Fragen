import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

function HomePage() {
  const navigate = useNavigate()
  return (
    <div className="flex-col h-full justify-center pb-32">
      <p>
        Wow this is the Home Page my be the first page you see :)
      </p>
      <Button className="m-8"
        onClick={() => navigate("/sessions")}
      >
        See your Quizzes
      </Button>
    </div>
  )
}

export default HomePage