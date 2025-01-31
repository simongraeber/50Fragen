import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx"

function TermsOfServicePage() {
  return (
    <div className="flex flex-col items-center h-full justify-center pb-32">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <h1 className="text-xl">Terms Of Service</h1>
        </CardHeader>
        <CardContent>
          Diese Seite befindet sich noch im Aufbau.
          Und ist ausschließlich für Testzwecke gedacht.
        </CardContent>
      </Card>
    </div>
  )
}

export default TermsOfServicePage