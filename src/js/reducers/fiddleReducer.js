
export default function reducer (state = {
  fiddleitems: [],
  fetching: false,
  fetched: false,
  isActive: false,
  cache: null,
  error: null
}, action) {
  switch (action.type) {
    case 'CLEAR_FIDDLE': {
      return {...state, fetching: false, fetched: false, isActive: false, error: null, fiddleitems: []}
    }
    case 'INACTIVE_FIDDLE': {
      return {...state, fetching: false, fetched: false, isActive: false, error: null}
    }
    case 'FETCH_FIDDLE_ITEMS_PENDING': {
      return {...state, isActive: true, fetching: true}
    }
    case 'FETCH_FIDDLE_ITEMS_REJECTED': {
      return {...state, fetching: false, error: action.payload}
    }
    case 'DISPLAY_FIDDLES': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        isActive: true
      }
    }
    case 'FETCH_FIDDLE_ITEMS_FULFILLED': {
      let d = new Date()
      let myVal = d.getTime()

      return {
        ...state,
        fetching: false,
        fetched: true,
        isActive: true,
        cache: myVal,
        fiddleitems: action.payload
      }
    }
  }
  return state
}
