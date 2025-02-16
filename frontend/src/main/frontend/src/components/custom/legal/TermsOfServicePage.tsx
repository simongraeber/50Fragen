import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button.tsx"
import Page from "@/components/shared/Layout/Page.tsx"
import HeadLine from "@/components/shared/Layout/HeadLine.tsx"

function TermsOfServicePage() {
  return (
    <Page>
      <HeadLine>
        Terms Of Service
      </HeadLine>
      <Card className="max-w-2xl mt-3 pt-4 mx-auto">
        <CardContent>
          Diese Seite befindet sich noch im Aufbau.
          Und ist ausschließlich für Testzwecke gedacht.
        </CardContent>
        <CardFooter>
          <Link to="/">
            <Button className="mt-8">Go back to Home Page</Button>
          </Link>
        </CardFooter>
      </Card>
    </Page>
  )
}

export default TermsOfServicePage