import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {todoSlice, TodoState } from "../features/todoSlice";

export interface RootState {
  todo: TodoState;
}
const rootReducer = combineReducers({
  todo: todoSlice.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
export type AppDispatch = typeof store.dispatch;
