import $ from "jquery"

const baseURL = 'http://sbtest.com/recipe/';
const listURL = baseURL + 'platform/recipe_api.php?view=recipes';
const logoutURL = baseURL + 'platform/api_end_session.php';
const viewURL = baseURL + 'platform/recipe_api.php?view=recipe&id=';
const postURL = baseURL + 'platform/api_signin.php';

export function fetchSession(myData) {
    return function(dispatch) {
        // axios doesn't form encode data
        $.ajax({
            type: "POST",
            url: postURL,
            data: myData,
            success: function(data) {
                dispatch({
                    type: "FETCH_RECIPE_SESSION_FULFILLED",
                    payload: JSON.parse(data)
                })
            },
            error: function(xhr, err) {
                dispatch({
                    type: "FETCH_RECIPE_SESSION_REJECTED",
                    payload: err
                })
            }
        });
    }
}

export function showLoginForm() {
    return function(dispatch) {
        dispatch({
            type: "LOGIN_FORM"
        });
    }
}

export function clearSession() {
    return function(dispatch) {
        //TODO: make request to session on server
        dispatch({
            type: "CLEAR_SESSION"
        });
    }
}
