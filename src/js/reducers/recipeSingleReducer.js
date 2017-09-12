export default function reducer (state = {
  recipe: {},
  fetching: false,
  fetched: false,
  isActive: false,
  error: null
}, action) {
  switch (action.type) {
    case 'CLEAR_RECIPE':
      {
        return { ...state,
          fetching: false,
          fetched: false,
          isActive: false,
          error: null,
          recipe: {}
        }
      }
    case 'INACTIVE_RECIPE':
      {
        return {...state,
          fetching: false,
          fetched: false,
          isActive: false,
          error: null
        }
      }
    case 'FETCH_RECIPE_PENDING':
      {
        return { ...state,
          isActive: true,
          fetching: true
        }
      }
    case 'FETCH_RECIPE_REJECTED':
      {
        return { ...state,
          fetching: false,
          error: action.payload
        }
      }
    case 'FETCH_RECIPE_FULFILLED':
      {
        return {
          ...state,
          fetching: false,
          fetched: true,
          isActive: true,
          recipe: action.payload
        }
      }
  }
  return state
}
