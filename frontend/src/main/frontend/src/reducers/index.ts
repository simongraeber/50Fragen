import { combineReducers } from "@reduxjs/toolkit"
import onlineStatusReducer from "@/reducers/onlineStatusReducer.ts"
import authenticationReducer from "@/reducers/authenticationReducer.ts"

const rootReducer = combineReducers({
  onlineStatus: onlineStatusReducer,
  authentication: authenticationReducer,
})

export default rootReducer
