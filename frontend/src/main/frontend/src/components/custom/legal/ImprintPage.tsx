import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx"


function ImprintPage() {
  return (
    <div className="flex flex-col items-center h-full justify-center pb-32">
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
      </Card>
    </div>
  )
}

export default ImprintPage