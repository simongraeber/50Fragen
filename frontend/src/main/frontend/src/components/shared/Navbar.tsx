import { Link } from "react-router-dom"
import UserNav from "@/components/shared/UserNav.tsx"
import { useTheme } from "@/providers/hemeProvider.tsx"

function NavBar() {
  const { theme } = useTheme()

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between p-4 bg-background shadow-sm dark:border-b-2 dark:border-card'">
      <div className="flex items-center gap-2">
        <Link to="/">
          <img
            src={theme === "dark" ? "/LogoDark.svg" : "/Logo.svg"}
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
