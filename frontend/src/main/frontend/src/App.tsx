import NavBar from "./components/shared/Navbar.tsx"
import { BrowserRouter as Router } from "react-router-dom"
import RoutesComponent from "@/components/shared/Routes"
import { Toaster } from "@/components/ui/toaster"
import { fetchCurrentUser } from "@/reducers/authenticationReducer"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { ThemeProvider } from "./providers/ThemeProvider.tsx"
import "./i18n";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="h-screen w-full bg-background">
        <Router>
          <div className="flex flex-col h-full">
            <NavBar />
            <div className="flex-grow overflow-auto">
              <RoutesComponent />
            </div>
          </div>
        </Router>
        <Toaster />
      </div>
    </ThemeProvider>
  )
}

export default App
