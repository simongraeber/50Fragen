import { Routes, Route } from "react-router-dom"
import HomePage from "@/components/custom/home/HomePage"
import NotFound from "@/components/shared/NotFound"
import ImprintPage from "@/components/custom/legal/ImprintPage.tsx"
import PrivacyPage from "@/components/custom/legal/PrivacyPage.tsx"
import TermsOfServicePage from "@/components/custom/legal/TermsOfServicePage.tsx"
import QuizSessionOverviewPage from "@/components/custom/quiz_session_overview/QuizSessionOverviewPage.tsx"

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* Quiz creation*/}
      <Route path="/sessions" element={<QuizSessionOverviewPage />} />

      {/* Legal Stuff */}
      <Route path="/imprint" element={<ImprintPage />} />
      <Route path="/preivacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsOfServicePage />} />

      {/* Other Routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default RoutesComponent
