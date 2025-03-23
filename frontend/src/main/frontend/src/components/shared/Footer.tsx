import { Link } from "react-router-dom"
import { t } from "i18next"


function Footer() {

  return (
    <div className="w-full h-16 z-0 flex items-center justify-center p-4 border-t bg-card shadow">
      <Link to={"/imprint"} className="text-gray-500 dark:text-gray-400 p-4 pr-8">
        {t("imprint")}
      </Link>
      <Link to={"/privacy"} className="text-gray-500 dark:text-gray-400 p-4">
        {t("privacy")}
      </Link>
      <Link to={"/terms"} className="text-gray-500 dark:text-gray-400 p-4 pl-8">
        {t("terms")}
      </Link>
    </div>
  )
}

export default Footer