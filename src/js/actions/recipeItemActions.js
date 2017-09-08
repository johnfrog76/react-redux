import axios from 'axios'

const baseURL = 'http://sbtest.com/recipe/'
const viewURL = baseURL + 'platform/recipe_api.php?view=recipe&user=1&id='

export function fetchRecipe (recipeToShowID) {
  return function (dispatch) {
    axios.get(viewURL + recipeToShowID)
            .then((response) => {
              dispatch({
                type: 'FETCH_RECIPE_FULFILLED',
                payload: response.data
              })
            })
            .catch((err) => {
              dispatch({
                type: 'FETCH_RECIPE_REJECTED',
                payload: err
              })
            })
  }
}

export function clearRecipe () {
  return function (dispatch) {
    dispatch({
      type: 'CLEAR_RECIPE'
    })
  }
}
