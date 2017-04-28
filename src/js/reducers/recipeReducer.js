export default function reducer(state = {
    recipeitems: [],
    fetching: false,
    fetched: false,
    isActive: false,
    error: null,
}, action) {

    switch (action.type) {
        case "CLEAR_RECIPES":
            {
                return { ...state,
                    fetching: false,
                    fetched: false,
                    isActive: false,
                    error: null,
                    recipeitems: []
                }
            }
        case "FETCH_RECIPE_ITEMS_PENDING":
            {
                return { ...state,
                    isActive: true,
                    fetching: true
                }
            }
        case "FETCH_RECIPE_ITEMS_REJECTED":
            {
                return { ...state,
                    fetching: false,
                    error: action.payload
                }
            }
        case "FETCH_RECIPE_ITEMS_FULFILLED":
            {
                return {
                    ...state,
                    fetching: false,
                    fetched: true,
                    isActive: true,
                    recipeitems: action.payload,
                }
            }
    }
    return state
}
