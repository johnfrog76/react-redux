
export default function reducer (state = {
  portfolioitems: [],
  fetching: false,
  fetched: false,
  isActive: false,
  error: null
}, action) {
  switch (action.type) {
    case 'CLEAR_PORTFOLIO': {
      return {...state, fetching: false, fetched: false, isActive: false, error: null, portfolioitems: []}
    }
    case 'FETCH_PORTFOLIO_ITEMS_PENDING': {
      return {...state, isActive: true, fetching: true}
    }
    case 'FETCH_PORTFOLIO_ITEMS_REJECTED': {
      return {...state, fetching: false, error: action.payload}
    }
    case 'FETCH_PORTFOLIO_ITEMS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        isActive: true,
        fetched: true,
        portfolioitems: action.payload
      }
    }
  }
  return state
}
