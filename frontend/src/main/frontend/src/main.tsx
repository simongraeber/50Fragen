import ReactDOM from "react-dom/client"
import "@/styles/globals.css"
import store from "@/lib/store.ts"
import { Provider } from "react-redux"
import { lazy, Suspense } from "react"
import LoadingContainer from "@/components/shared/LoadingContainer.tsx"

const App = lazy(() => import("./App"))

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <Suspense fallback={<LoadingContainer />}>
      <App />
    </Suspense>
  </Provider>,
)
