import { GET, POST } from "@/lib/http"
import { User } from "@/types/User"

export const getCurrentUser = async (): Promise<User | null> => {
  return await GET<User | null>("/user")
}

export const logOut = async (): Promise<void> => {
  return await POST<void, void>("/logout", void { withCredentials: true })
}