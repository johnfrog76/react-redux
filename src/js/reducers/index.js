import { combineReducers } from "redux"
import portfolio from "./portfolioReducer"
import fiddles from "./fiddleReducer"
import recipes from "./recipeReducer"
import recipe from "./recipeSingleReducer"
import session from "./recipeSessionReducer"

export default combineReducers({
    portfolio,
    fiddles,
    recipes,
    recipe,
    session
})
