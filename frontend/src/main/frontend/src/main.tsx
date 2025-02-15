import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "@/styles/globals.css"
import store from "@/lib/store.ts"
import { Provider } from "react-redux"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
