import { GET } from "@/lib/http.ts"
import { User } from "@/types/User.ts"

export const getCurrentUser = async () => {
  return {
    id: "1",
    name: "test",
    image: "test",
  }
  return GET<User>("/user/me");
}

export const getTestString = async (): Promise<string> => {
  try {
    const response = await fetch("http://localhost:4000");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};