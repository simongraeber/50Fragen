import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card.tsx"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button.tsx"

function PrivacyPage() {
  return (
    <div className="flex flex-col items-center h-full justify-center pb-32">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <h1 className="text-xl">Privacy Policy</h1>
        </CardHeader>
        <CardContent>
          Diese Seite befindet sich noch im Aufbau.
          Und ist ausschließlich für Testzwecke gedacht.
        </CardContent>
        <CardFooter>
        <Link to="/">
          <Button variant="secondary" className="mt-8">Go back to Home Page</Button>
        </Link>
      </CardFooter>
      </Card>
    </div>
  )
}

export default PrivacyPage