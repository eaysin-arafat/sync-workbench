import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import extraReducer from "./reducers/extra-slicer";
import timeSheets from "./reducers/time-sheets-slicer";
import userBGVReducer from "./reducers/user-bgv-slicer";
import userRequests from "./reducers/user-requests-slicer";
import userAuth from "./reducers/user-slicer";

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const rootReducer = combineReducers({
  userReducer: userAuth,
  timeSheetReducer: timeSheets,
  userRequestsReducer: userRequests,
  userBgvReducer: userBGVReducer,
  extraReducer: extraReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
