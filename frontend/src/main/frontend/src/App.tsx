import NavBar from "./components/shared/Navbar.tsx"
import { BrowserRouter as Router } from "react-router-dom"
import RoutesComponent from "@/components/shared/Routes"
import { Toaster } from "@/components/ui/toaster"
import { fetchCurrentUser } from "@/reducers/authenticationReducer"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { ThemeProvider } from "./providers/ThemeProvider.tsx"
import "./i18n";
import Footer from "@/components/shared/Footer.tsx"
import ScrollToTop from "@/components/shared/Layout/ScrollToTop.tsx"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Router>
          <ScrollToTop />
          <div className="flex min-h-screen w-full flex-col h-full">
            <NavBar />
            <div className="flex-grow overflow-auto">
              <RoutesComponent />
            </div>
            <Footer />
          </div>
        </Router>
        <Toaster />
    </ThemeProvider>
  )
}

export default App
