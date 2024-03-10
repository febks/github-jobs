import { applyMiddleware, createStore, compose } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
import rootReducer from "../reducers/roortReducer";

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'filterData',
  ]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const storeApp = () => {
  const store = createStore(persistedReducer, 
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
  );
  const persist = persistStore(store);

  return { store, persist };
};

export default storeApp;