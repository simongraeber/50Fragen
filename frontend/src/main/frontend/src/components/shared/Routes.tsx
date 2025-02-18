import { Routes, Route } from "react-router-dom"
import { GameProvider } from "@/providers/GameProvider.tsx"
import { useParams } from "react-router-dom"
import { Suspense, lazy } from 'react'
import OAuth2Callback from "@/components/shared/OAuth2Callback.tsx"
import ProtectedRoute from "@/components/shared/ProtectedRouteProps.tsx"
import HomePage from  "@/components/custom/home/HomePage"
import LoadingPage from "@/components/shared/LoadingPage"
const NotFound = lazy(() => import( "@/components/shared/NotFound"));
const ImprintPage = lazy(() => import( "@/components/custom/legal/ImprintPage.tsx"));
const PrivacyPage = lazy(() => import( "@/components/custom/legal/PrivacyPage.tsx"));
const TermsOfServicePage = lazy(() => import( "@/components/custom/legal/TermsOfServicePage.tsx"));
const QuizOverviewPage = lazy(() => import( "@/components/custom/quiz_overview/QuizOverviewPage.tsx"));
const QuizEditPage = lazy(() => import( "@/components/custom/quiz_edit/QuizEditPage.tsx"));
const QuizPlayPage = lazy(() => import( "@/components/custom/quiz_play/QuizPlayPage.tsx"));

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* Quiz creation*/}
      <Route path="/quizzes" element={
        <ProtectedRoute>
          <Suspense fallback={<LoadingPage />}>
          <QuizOverviewPage />
          </Suspense>
        </ProtectedRoute>
        } />

      {/* Quiz editing */}
      <Route path="/editor/:id" element={
        <ProtectedRoute>
          <Suspense fallback={<LoadingPage />}>
          <QuizEditPage />
          </Suspense>
        </ProtectedRoute>
      } />

      {/* Quiz playing */}
      <Route path="/play/:id" element={
        <ProtectedRoute>
          <Suspense fallback={<LoadingPage />}>
          <QuizPlayWrapper />
          </Suspense>
        </ProtectedRoute>
      } />

      {/* Login Callback */}
      <Route path="/loginCallback" element={
        <Suspense fallback={<LoadingPage />}>
        <OAuth2Callback />
        </Suspense>
      } />

      {/* Legal Stuff */}
      <Route path="/imprint" element={
        <Suspense fallback={<LoadingPage />}>
          <ImprintPage />
        </Suspense>} />
      <Route path="/privacy" element={
        <Suspense fallback={<LoadingPage />}>
          <PrivacyPage />
      </Suspense>} />
      <Route path="/terms" element={
        <Suspense fallback={<LoadingPage />}>
          <TermsOfServicePage />
        </Suspense>} />

      {/* Other Routes */}
      <Route path="*" element={
        <Suspense fallback={<LoadingPage />}>
          <NotFound />
      </Suspense>} />
    </Routes>
  )
}

const QuizPlayWrapper = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <NotFound />;
  }
  return (
    <Suspense fallback={<LoadingPage />}>
    <GameProvider quizId={id}>
      <QuizPlayPage />
    </GameProvider>

    </Suspense>
  );
}

export default RoutesComponent;
