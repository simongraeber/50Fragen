import NavBar from "./components/shared/Navbar.tsx"
import { BrowserRouter as Router } from "react-router-dom"
import RoutesComponent from "@/components/shared/Routes"
import { Toaster } from "@/components/ui/toaster"
import { fetchCurrentUser } from "@/reducers/authenticationReducer"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])

  return (
    <div className="bg-white h-screen w-full">
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
  )
}

export default App
