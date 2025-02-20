import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Link } from "react-router-dom"
import Page from "@/components/shared/Layout/Page.tsx"
import HeadLine from "@/components/shared/Layout/HeadLine.tsx"
import { useTranslation } from "react-i18next";


function ImprintPage() {
  const { t } = useTranslation();

  return (
    <Page>
      <HeadLine>
        {t("imprint")}
      </HeadLine>
      <Card className="max-w-2xl mt-3 pt-4 mx-auto">
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
            <Button className="mt-8">{t("go_home")}</Button>
          </Link>
        </CardFooter>
      </Card>
    </Page>
  )
}

export default ImprintPage