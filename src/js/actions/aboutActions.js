// import axios from 'axios'

export function inactiveAbout () {
  return function (dispatch) {
    dispatch({type: 'INACTIVE_ABOUT'})
  }
}

export function displayAbout () {
  return function (dispatch) {
    dispatch({type: 'DISPLAY_ABOUT'})
  }
}
