import axios from 'axios'

const baseURL = 'http://sbtest.com/recipe/'
const listURL = baseURL + 'platform/recipe_api.php?view=recipes&user=1'
const viewURL = baseURL + 'platform/recipe_api.php?view=recipe&id='

export function fetchRecipes () {
  return function (dispatch) {
    axios.get(listURL)
      .then((response) => {
        dispatch({type: 'FETCH_RECIPE_ITEMS_FULFILLED', payload: response.data})
      })
      .catch((err) => {
        dispatch({type: 'FETCH_RECIPE_ITEMS_REJECTED', payload: err})
      })
  }
}

export function fetchRecipe () {
  return function (dispatch) {
    axios.get(viewURL)
      .then((response) => {
        dispatch({type: 'FETCH_RECIPE_ITEMS_FULFILLED', payload: response.data})
      })
      .catch((err) => {
        dispatch({type: 'FETCH_RECIPE_ITEMS_REJECTED', payload: err})
      })
  }
}

export function clearRecipes () {
  return function (dispatch) {
    dispatch({type: 'CLEAR_RECIPES'})
  }
}
