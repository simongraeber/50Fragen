import NavBar from "./components/shared/Navbar.tsx";
import {BrowserRouter as Router} from "react-router-dom"
import RoutesComponent from "@/components/shared/Routes"
import { Toaster } from "@/components/ui/toaster"


function App() {

  return (
    <div className="bg-white h-screen w-full">
      <Router>
        <div className="flex flex-col h-full">
          <NavBar/>
          <div className="flex-grow overflow-auto">
            <RoutesComponent/>
          </div>
        </div>
      </Router>
      <Toaster/>
    </div>
  )
}

export default App
