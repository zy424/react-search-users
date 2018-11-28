
import { createStore, applyMiddleware} from 'redux'
import Reducers from './reducers/Reducers'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'




// Create store
const store = createStore(
  Reducers,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
)

const action = (type, payload) => store.dispatch({ type, payload })

// Export history and store
export { store, action }