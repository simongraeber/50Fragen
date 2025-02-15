import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card.tsx"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button.tsx"
import Page from "@/components/shared/Layout/Page.tsx"

function TermsOfServicePage() {
  return (
    <Page>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <h1 className="text-xl">Terms Of Service</h1>
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
    </Page>
  )
}

export default TermsOfServicePage