import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import timeSheets from "./reducers/timeSheetsSlicer";
import userBGVReducer from "./reducers/userBGVSlicer";
import userRequests from "./reducers/userRequestsSlicer";
import userAuth from "./reducers/userSlicer";
import extraReducer from "./reducers/extraSlicer";

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
