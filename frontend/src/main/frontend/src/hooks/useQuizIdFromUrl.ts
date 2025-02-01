import { useLocation } from "react-router-dom"

function useQuizIdFromUrl() {
  const location = useLocation()
  const pathSegments = location.pathname.split("/")
  return pathSegments[pathSegments.length - 1]
}

export default useQuizIdFromUrl