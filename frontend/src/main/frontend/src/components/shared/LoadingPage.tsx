import Page from '@/components/shared/Layout/Page';
import '@/styles/loading.css'


function LoadingPage() {

  return(
    <Page>
      <div className="fade-in flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    </Page>
  )
}

export default LoadingPage;