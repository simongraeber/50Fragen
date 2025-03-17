import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button.tsx"
import Page from "@/components/shared/Layout/Page.tsx"
import HeadLine from "@/components/shared/Layout/HeadLine.tsx"
import { useTranslation } from "react-i18next"

function TermsOfServicePage() {
  const { t } = useTranslation()

  return (
    <Page>
      <HeadLine>
        {t("terms_h")}
      </HeadLine>
      <main className="max-w-2xl mt-3 pt-4 mx-auto">
        <h2>{t("termsOfService.acceptance.title")}</h2>
        <p>{t("termsOfService.acceptance.text")}</p>

        <h2>{t("termsOfService.modifications.title")}</h2>
        <p>{t("termsOfService.modifications.text")}</p>

        <h2>{t("termsOfService.usage.title")}</h2>
        <p>{t("termsOfService.usage.text")}</p>

        <h2>{t("termsOfService.intellectualProperty.title")}</h2>
        <p>
          {t("termsOfService.intellectualProperty.text", {
            company: "50Fragen.com",
          })}
        </p>

        <h2>{t("termsOfService.dataProtection.title")}</h2>
        <p>{t("termsOfService.dataProtection.text")}</p>

        <h2>{t("termsOfService.limitation.title")}</h2>
        <p>
          {t("termsOfService.limitation.text", {
            company: "50Fragen.com",
          })}
        </p>

        <h2>{t("termsOfService.governingLaw.title")}</h2>
        <p>{t("termsOfService.governingLaw.text")}</p>
        <Link to="/">
          <Button className="mt-8">{t("go_home")}</Button>
        </Link>
      </main>
    </Page>
  )
}

export default TermsOfServicePage