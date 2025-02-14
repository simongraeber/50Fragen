import { Link } from "react-router-dom"
import UserNav from "@/components/shared/UserNav.tsx"

function NavBar() {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <Link to="/">
          <img
            src="/Logo.svg"
            alt="50 Fragen Logo"
            className="h-10 pr-4 object-contain"
          />
        </Link>
      </div>
      <UserNav />
    </div>
  )
}

export default NavBar
