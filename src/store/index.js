import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./store";

const store = configureStore({
	reducer: {
		app: appSlice
	}
});

export default store;
