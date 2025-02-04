import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "@/types/User"
import { getCurrentUser } from "@/api/user"

interface AuthState {
  user: User | null
  authUserLoadedStatus: boolean
}

const initialState: AuthState = {
  user: null,
  authUserLoadedStatus: false,
}

export const fetchCurrentUser = createAsyncThunk(
  "authentication/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = await getCurrentUser()
      return user as User
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const userSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setCurrentUser: (state: AuthState, action: PayloadAction<User>): void => {
      state.user = action.payload
    },
    setAuthUserLoadingStatus: (
      state: AuthState,
      action: PayloadAction<boolean>
    ): void => {
      state.authUserLoadedStatus = action.payload
    },
    clearCurrentUser: (state: AuthState): void => {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.authUserLoadedStatus = false
      })
      .addCase(
        fetchCurrentUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload
          state.authUserLoadedStatus = true
        }
      )
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.authUserLoadedStatus = false
        console.error("Failed to fetch user:", action.payload)
      })
  },
})

export const {
  setCurrentUser,
  setAuthUserLoadingStatus,
  clearCurrentUser,
} = userSlice.actions

export default userSlice.reducer
