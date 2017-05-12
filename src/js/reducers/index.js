import { combineReducers } from "redux"
import portfolio from "./portfolioReducer"
import fiddles from "./fiddleReducer"
import recipes from "./recipeReducer"
import recipe from "./recipeSingleReducer"
import session from "./recipeSessionReducer"
import songs from "./songReducer"

export default combineReducers({
    portfolio,
    fiddles,
    recipes,
    recipe,
    session,
    songs
})
