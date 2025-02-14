import { GET } from "@/lib/http"
import { User } from "@/types/User"

export const getCurrentUser = async (): Promise<User | null> => {
  return await GET<User | null>("/user")
}

export const logOut = async (): Promise<void> => {
  return await GET<void>("/logout")
}