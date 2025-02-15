import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Link } from "react-router-dom"
import Page from "@/components/shared/Layout/Page.tsx"


function ImprintPage() {
  return (
    <Page>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <h1 className="text-xl">Imprint</h1>
        </CardHeader>
        <CardContent>
          Simon Graeber
        </CardContent>
        <CardContent>
          <p>
            Mitthenheimer Str. 6
          </p>
          <p>
            85764 Oberschleißheim
          </p>
          <p>
            Germany
          </p>
        </CardContent>
        <CardContent>
          <p>
            Email: 80-read-crewel@icloud.com
          </p>
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

export default ImprintPage