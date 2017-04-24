
export default function reducer(state={
    fiddleitems: [],
    fetching: false,
    fetched: false,
    isActive: false,
    error: null,
  }, action) {

    switch (action.type) {
        case "CLEAR_FIDDLE": {
          return {...state, fetching: false, fetched: false, isActive: false, error: null, fiddleitems: []}
        }
        case "FETCH_FIDDLE_ITEMS_PENDING": {
          return {...state, isActive: true, fetching: true}
        }
        case "FETCH_FIDDLE_ITEMS_REJECTED": {
          return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_FIDDLE_ITEMS_FULFILLED": {
          return {
            ...state,
            fetching: false,
            fetched: true,
            isActive: true,
            fiddleitems: action.payload,
        }
    }
}
    return state
}
