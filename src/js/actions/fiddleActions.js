import axios from "axios";

export function fetchFiddles() {
  return function (dispatch) {
    axios.get("http://sbtest.com/fiddle/api/")
      .then((response) => {
        dispatch({type: "FETCH_FIDDLE_ITEMS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_FIDDLE_ITEMS_REJECTED", payload: err})
      })
  }
}

export function clearFiddles() {
    return function (dispatch) {
        dispatch({type: "CLEAR_FIDDLE"});
    }
}
