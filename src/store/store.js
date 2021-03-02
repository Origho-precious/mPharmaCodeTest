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

export const getProducts = () => async (dispatch) => {
	const res = await axios.get(
		"http://www.mocky.io/v2/5c3e15e63500006e003e9795"
	);
	dispatch(updateState(res.data.products));
};

export const editProductAction = (productId, productName, price) => async (
	dispatch,
	getState
) => {
	const { products } = getState().app;

	const selectedProduct = products.filter(
		(product, id) => product.id === productId
	)[0];

	const updatedProduct = {
		...selectedProduct,
		name: productName,
		prices: [
			...selectedProduct.prices,
			{
				id: Math.ceil(Math.random() + 1),
				price: price,
				date: new Date().toISOString(),
			},
		],
	};

	const state = [...products];

	const idx = state.findIndex((product) => product.id === productId);

	state[idx] = updatedProduct;

	dispatch(updateState(state));
};

export default appSlice.reducer;
