import { Link } from "react-router-dom"
import UserNav from "@/components/shared/UserNav.tsx"
import { useTheme } from "@/providers/ThemeProvider.tsx"
import { useEffect, useState } from "react"

function NavBar() {
  const { theme } = useTheme()

  const [currentTheme, setCurrentTheme] = useState(theme)

  useEffect(() => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      setCurrentTheme(systemTheme)
    } else {
      setCurrentTheme(theme)
    }
  }, [theme])

  return (
    <div
      className="sticky h-[64px] top-0 z-50 flex items-center justify-between p-4 border-b bg-card shadow"
      style={{ pointerEvents: "none" }}
    >
      <div className="flex items-center gap-2" style={{ pointerEvents: "auto" }}> {/* Re-enable pointer events for interactive elements */}
        <Link to="/">
          <img
            src={currentTheme === "dark" ? "/LogoDark.svg" : "/Logo.svg"}
            alt="50 Fragen Logo"
            className="h-10 pr-4 object-contain"
          />
        </Link>
      </div>
      <div style={{ pointerEvents: "auto" }}> {/* Ensure UserNav remains interactive */}
        <UserNav />
      </div>
    </div>
  );
}

export default NavBar
