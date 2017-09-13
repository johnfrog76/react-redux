
export default function reducer (state = {
  items: [],
  fetched: true,
  fetching: false,
  isActive: false,
  error: null
}, action) {
  switch (action.type) {
    case 'INACTIVE_ABOUT': {
      return {
        ...state,
        isActive: false
      }
    }
    case 'DISPLAY_ABOUT': {
      return {
        ...state,
        isActive: true
      }
    }
  }
  return state
}
