import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCurrentUser, clearCurrentUser } from "@/reducers/authenticationReducer"
import { getCurrentUser } from "@/api/user"
import { useToast } from "@/hooks/use-toast"

function OAuth2Callback() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { toast } = useToast()

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
          toast({ description: "You are now logged in", variant: "success" })
          dispatch(setCurrentUser(user))
        } catch (error) {
          console.error("Error fetching current user during login:", error)
          toast({ description: "Login error: Failed to fetch user details", variant: "destructive" })
          dispatch(clearCurrentUser())
          // You might want to navigate to an error page immediately if fetching fails.
        }
      } else if (params.has("logout")) {
        // Handle logout success
        dispatch(clearCurrentUser())
        toast({ description: "You are now logged out", variant: "success" })
      } else if (params.has("error")) {
        // Handle error returned by the backend during authentication
        dispatch(clearCurrentUser())
        toast({ description: "Authentication error occurred", variant: "destructive" })
      } else {
        // Unknown authentication state passed via callback
        dispatch(clearCurrentUser())
        toast({ description: "Unknown authentication state", variant: "destructive" })
      }

      // Navigate to the last visited page or fallback to home
      const lastPage = sessionStorage.getItem("lastSavedPage") || "/"
      sessionStorage.removeItem("lastSavedPage")
      navigate(lastPage, { replace: true })
    }

    handleAuth()
  }, [navigate, dispatch, toast])

  return (
    <div className="flex justify-center items-center h-screen">
      <h1>Processing authentication...</h1>
    </div>
  )
}

export default OAuth2Callback