export default function reducer (state = {
  recipeitems: [],
  fetching: false,
  fetched: false,
  isActive: false,
  cache: null,
  error: null
}, action) {
  switch (action.type) {
    case 'CLEAR_RECIPES':
      {
        return { ...state,
          fetching: false,
          fetched: false,
          isActive: false,
          error: null,
          recipeitems: []
        }
      }
    case 'INACTIVE_RECIPES': {
      return {...state,
        fetching: false,
        fetched: false,
        isActive: false,
        error: null
      }
    }
    case 'FETCH_RECIPE_ITEMS_PENDING': {
      return { ...state,
        isActive: true,
        fetching: true
      }
    }
    case 'FETCH_RECIPE_ITEMS_REJECTED': {
      return { ...state,
        fetching: false,
        error: action.payload
      }
    }
    case 'DISPLAY_RECIPES': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        isActive: true
      }
    }
    case 'FETCH_RECIPE_ITEMS_FULFILLED': {
      let d = new Date()
      let myVal = d.getTime()

      return {
        ...state,
        fetching: false,
        fetched: true,
        isActive: true,
        cache: myVal,
        recipeitems: action.payload
      }
    }
  }
  return state
}
