import { createStore, applyMiddleware } from "redux";
import { compose } from "redux";
import thunk from "redux-thunk";
import reducers from "../Reducers";
// Enabling redux developer tools for development purpose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Applying thunk for async actions.
const middleware = [thunk];

export const configureStore = () => {
  const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middleware))
  );

  return store;
};
