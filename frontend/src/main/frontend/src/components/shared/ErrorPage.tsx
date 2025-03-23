import React from "react"
import Page from "@/components/shared/Layout/Page.tsx"
import { TbCloudX } from "react-icons/tb"
import { Button } from "@/components/ui/button.tsx"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"


interface ErrorPageProps {
  error: string
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => {
  const { t } = useTranslation();

  return (
    <Page>
      <TbCloudX className="text-[10rem] mt-16" />
      <p className="font-light text-4xl pt-8 text-destructive">
        {t("er_error")}
      </p>
      <span className="text-destructive">
        {error}
      </span>

      <Link to="/">
        <Button className="mt-8">{t("go_home")}</Button>
      </Link>
      <Button
        className="mt-8"
        onClick={() => window.location.reload()}>
        {t("er_reload")}
      </Button>
    </Page>
  )
}

export default ErrorPage