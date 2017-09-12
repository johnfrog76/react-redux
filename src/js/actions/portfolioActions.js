import axios from 'axios'

export function fetchPortfolio () {
  return function (dispatch) {
    axios.get('http://sbtest.com/portfolio/api/')
      .then((response) => {
        dispatch({type: 'FETCH_PORTFOLIO_ITEMS_FULFILLED', payload: response.data})
      })
      .catch((err) => {
        dispatch({type: 'FETCH_PORTFOLIO_ITEMS_REJECTED', payload: err})
      })
  }
}

export function clearPortfolio () {
  return function (dispatch) {
    dispatch({type: 'CLEAR_PORTFOLIO'})
  }
}

export function inactivePortfolio () {
  return function (dispatch) {
    dispatch({type: 'INACTIVE_PORTFOLIO'})
  }
}
