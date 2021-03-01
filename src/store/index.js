import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import appSlice from "./store";

const reducer = combineReducers({
	app: appSlice
});

const store = configureStore({
	reducer
});

export default store;
