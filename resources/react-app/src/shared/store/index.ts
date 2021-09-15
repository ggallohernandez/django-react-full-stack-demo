import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { RootAction, RootState } from 'typesafe-actions';

import rootReducer from './root-reducer';
import rootEpic from './root-epic';
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import {configureStore} from "@reduxjs/toolkit";

const persistConfig = {
    key: "root",
    storage: storage,
    blacklist: [
    ],
};

export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState
>();
const pReducer = persistReducer(persistConfig, rootReducer);

// configure middlewares
const store = configureStore({
    reducer: pReducer,
    preloadedState: window.__PRELOADED_STATE__,
    middleware: [epicMiddleware],
});
export const persistor = persistStore(store);

epicMiddleware.run(rootEpic);

// export store singleton instance
export default store;
