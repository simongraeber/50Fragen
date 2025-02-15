import { Routes, Route } from "react-router-dom"
import HomePage from "@/components/custom/home/HomePage"
import NotFound from "@/components/shared/NotFound"
import ImprintPage from "@/components/custom/legal/ImprintPage.tsx"
import PrivacyPage from "@/components/custom/legal/PrivacyPage.tsx"
import TermsOfServicePage from "@/components/custom/legal/TermsOfServicePage.tsx"
import QuizOverviewPage from "@/components/custom/quiz_overview/QuizOverviewPage.tsx"
import QuizEditPage from "@/components/custom/quiz_edit/QuizEditPage.tsx"
import QuizPlayPage from "@/components/custom/quiz_play/QuizPlayPage.tsx"
import { GameProvider } from "@/providers/GameProvider.tsx"
import { useParams } from "react-router-dom";
import OAuth2Callback from "@/components/shared/OAuth2Callback.tsx"
import ProtectedRoute from "@/components/shared/ProtectedRouteProps.tsx"

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* Quiz creation*/}
      <Route path="/quizzes" element={
        <ProtectedRoute>
          <QuizOverviewPage />
        </ProtectedRoute>
        } />

      {/* Quiz editing */}
      <Route path="/editor/:id" element={
        <ProtectedRoute>
          <QuizEditPage />
        </ProtectedRoute>
      } />

      {/* Quiz playing */}
      <Route path="/play/:id" element={
        <ProtectedRoute>
          <QuizPlayWrapper />
        </ProtectedRoute>
      } />

      {/* Login Callback */}
      <Route path="/loginCallback" element={
        <OAuth2Callback />
      } />

      {/* Legal Stuff */}
      <Route path="/imprint" element={<ImprintPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsOfServicePage />} />

      {/* Other Routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

const QuizPlayWrapper = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <NotFound />;
  }
  return (
    <GameProvider quizId={id}>
      <QuizPlayPage />
    </GameProvider>
  );
}

export default RoutesComponent;
