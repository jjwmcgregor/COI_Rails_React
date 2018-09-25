import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-think';

const middleware = [thunk];

// Redux implementation
// [] is the reducer
// {} is the initial state
const store = createStore(() => [], {}, applyMiddleware(...middleware))

export default store;
