import LoadingPage from "@/components/shared/LoadingPage.tsx"

function LoadingContainer() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 h-[64px] z-50 flex items-center justify-between p-4 bg-background shadow dark:border-b-2 dark:border-card">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">Loading ...</span>
        </div>
      </header>
      <LoadingPage />
    </div>
  );
}

export default LoadingContainer;