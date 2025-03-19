import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button.tsx"
import Page from "@/components/shared/Layout/Page.tsx"
import HeadLine from "@/components/shared/Layout/HeadLine.tsx"
import { useTranslation } from "react-i18next"

function PrivacyPage() {
  const { t } = useTranslation()

  const purposesList: string[] = t("privacyPolicy.purposes.list", { returnObjects: true }) as string[]

  return (
    <Page>
      <HeadLine>
        {t("privacy")}
      </HeadLine>
      <main className="max-w-2xl mt-3 pt-4 mx-auto px-2">
        <h2>{t("privacyPolicy.generalInformation.title")}</h2>
        <p>
          {t("privacyPolicy.generalInformation.text", {
            company: "50Fragen.com",
            jurisdiction: "Nuremberg, Germany",
          })}
        </p>

        <h2>{t("privacyPolicy.dataController.title")}</h2>
        <p>
          {t("privacyPolicy.dataController.text", {
            company: "50Fragen.com",
          })}
        </p>

        <h2>{t("privacyPolicy.dataCollection.title")}</h2>
        <p>{t("privacyPolicy.dataCollection.text")}</p>

        <h2>{t("privacyPolicy.purposes.title")}</h2>
        <p>{t("privacyPolicy.purposes.text")}</p>
        <ul>
          {purposesList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h2>{t("privacyPolicy.userRights.title")}</h2>
        <p>{t("privacyPolicy.userRights.text")}</p>

        <h2>{t("privacyPolicy.dataSecurity.title")}</h2>
        <p>{t("privacyPolicy.dataSecurity.text")}</p>

        <h2>{t("privacyPolicy.policyChanges.title")}</h2>
        <p>{t("privacyPolicy.policyChanges.text")}</p>

        <h2>{t("privacyPolicy.contact.title")}</h2>
        <p>{t("privacyPolicy.contact.text")}</p>
      </main>
      <Link to="/">
        <Button className="mt-8">{t("go_home")}</Button>
      </Link>
    </Page>
  )
}

export default PrivacyPage