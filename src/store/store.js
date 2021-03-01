import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

const appSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		updateState: (state, { payload }) => {
			state.products = payload;
		},
	},
});

const { updateState } = appSlice.actions;

export const getProducts = () => async(dispatch) => {
	const res = await axios.get(
		"http://www.mocky.io/v2/5c3e15e63500006e003e9795"
	);
	dispatch(updateState(res.data.products));
};

export default appSlice.reducer;
