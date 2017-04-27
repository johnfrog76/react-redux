# Redux

## Redux is a predictable state container for JavaScript apps.


### Redux compliments and scales React
- redux can be used with any view layer
<pre>
npm install --save react-redux
</pre>

### Redux has three main principles

### Single Source of Truth
- entire **state** of your app is stored within object tree
<pre>
import { createStore } from 'redux'
</pre>

### State is read-only
- Only way to change state is to dispatch an **action** describing  what happened
<pre>
store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
// 1
</pre>

### Changes are made with pure functions
- **reducers** are pure functions that take previous state and return the next state.
<pre>
function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
</pre>
