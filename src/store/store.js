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

export const fetchInitialProducts = async (dispatch) => {
	const res = await axios.get(
		"http://www.mocky.io/v2/5c3e15e63500006e003e9795"
	);

	localStorage.setItem("mPharmaProducts", JSON.stringify(res.data.products));
};

export const getProducts = () => async (dispatch) => {
	dispatch(updateState(JSON.parse(localStorage.getItem("mPharmaProducts"))));
};

export const editProductAction = (productId, productName, price) => async (
	dispatch,
	getState
) => {
	const { products } = getState().app;

	const selectedProduct = products.filter(
		(product) => product.id === productId
	)[0];

	const updatedProduct = {
		...selectedProduct,
		name: productName,
		prices: [
			...selectedProduct.prices,
			{
				id: new Date().toISOString(),
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

export const addProductAction = (productName, price) => async (
	dispatch,
	getState
) => {
	const { products } = getState().app;

	const updatedProductList = [
		...products,
		{
			id: new Date().getTime(),
			name: productName,
			prices: [
				{
					id: new Date().toISOString(),
					price: price,
					date: new Date().toISOString(),
				},
			],
		},
	];

	dispatch(updateState(updatedProductList));
};

export const deleteProductAction = (id) => async (
	dispatch,
	getState
) => {
	const { products } = getState().app;
	
	const selectedProduct = products.filter(
		(product) => product.id === id
	)[0];

	const state = [...products];

	const idx = state.findIndex((product) => product.id === id);

	state.splice(idx, 1)

	dispatch(updateState(state));
};

export default appSlice.reducer;
