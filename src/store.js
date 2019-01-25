import { createStore, applyMiddleware, compose } from "redux";
import rootReducers from "./reducers";
import thunk from "redux-thunk";

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;
    
const middleware = [thunk];

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
);
const store = createStore(rootReducers, enhancer);

export default store;
