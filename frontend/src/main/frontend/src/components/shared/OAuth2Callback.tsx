import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCurrentUser, clearCurrentUser } from "@/reducers/authenticationReducer"
import { getCurrentUser } from "@/api/user"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "react-i18next"
import LoadingPage from "@/components/shared/LoadingPage.tsx"

function OAuth2Callback() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { toast } = useToast()
  const { t } = useTranslation();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search)

      // Check query parameters set by the backend redirect handler
      if (params.has("login")) {
        // Handle successful login
        try {
          const user = await getCurrentUser()
          if (!user) {
            throw new Error("Failed to fetch user details")
          }
          toast({ description: t("l_now_logged_in"), variant: "success" })
          dispatch(setCurrentUser(user))
        } catch (error) {
          console.error("Error fetching current user during login:", error)
          toast({ description: t("l_error"), variant: "destructive" })
          dispatch(clearCurrentUser())
          // You might want to navigate to an error page immediately if fetching fails.
        }
      } else if (params.has("logout")) {
        // Handle logout success
        dispatch(clearCurrentUser())
        console.log("Logged out")
        toast({ description: t("l_now_logged_out"), variant: "success" })
      } else if (params.has("error")) {
        console.error("Authentication error occurred")
        // Handle error returned by the backend during authentication
        dispatch(clearCurrentUser())
        toast({ description: t("l_error2"), variant: "destructive" })
      } else {
        // Unknown authentication state passed via callback
        console.error("Unknown authentication state")
        dispatch(clearCurrentUser())
        toast({ description: t("l_unknown"), variant: "destructive" })
      }

      // Navigate to the last visited page or fallback to home
      const lastPage = sessionStorage.getItem("lastSavedPage") || "/"
      sessionStorage.removeItem("lastSavedPage")
      navigate(lastPage, { replace: true })
    }

    handleAuth()
  }, [navigate, dispatch, toast])

  return (
    <LoadingPage />
  )
}

export default OAuth2Callback