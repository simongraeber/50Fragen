import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { TbCloudX } from "react-icons/tb"
import Page from "@/components/shared/Layout/Page.tsx"
import { useTranslation } from "react-i18next"

function NotFound() {
  const { t } = useTranslation();

  return (
    <Page>
        <TbCloudX className="text-[10rem] mt-16" />
        <p className="font-light text-4xl pt-8 text-destructive">
          {t("er_not_found")}
        </p>

        <p className="text-xl pt-2">Error 404</p>

        <Link to="/">
          <Button className="mt-8">
            {t("go_home")}
          </Button>
        </Link>
    </Page>
  )
}

export default NotFound