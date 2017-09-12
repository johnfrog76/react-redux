
export default function reducer (state = {
  portfolioitems: [],
  fetching: false,
  fetched: false,
  isActive: false,
  cache: null,
  error: null
}, action) {
  switch (action.type) {
    case 'CLEAR_PORTFOLIO': {
      return {...state, fetching: false, fetched: false, isActive: false, error: null, portfolioitems: []}
    }
    case 'INACTIVE_PORTFOLIO': {
      return {...state, fetching: false, fetched: false, isActive: false, error: null}
    }
    case 'FETCH_PORTFOLIO_ITEMS_PENDING': {
      return {...state, isActive: true, fetching: true}
    }
    case 'FETCH_PORTFOLIO_ITEMS_REJECTED': {
      return {...state, fetching: false, error: action.payload}
    }
    case 'DISPLAY_PORTFOLIO': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        isActive: true
      }
    }
    case 'FETCH_PORTFOLIO_ITEMS_FULFILLED': {
      let d = new Date()
      let myVal = d.getTime()

      return {
        ...state,
        fetching: false,
        isActive: true,
        fetched: true,
        cache: myVal,
        portfolioitems: action.payload
      }
    }
  }
  return state
}
