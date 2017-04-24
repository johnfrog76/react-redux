import { combineReducers } from "redux"

import tweets from "./tweetsReducer"
import user from "./userReducer"
import portfolio from "./portfolioReducer"
import fiddles from "./fiddleReducer"

export default combineReducers({
  tweets,
  user,
  portfolio,
  fiddles
})
