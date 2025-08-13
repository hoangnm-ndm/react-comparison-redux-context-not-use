import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductsState } from "../types/product";

// Định nghĩa kiểu cho Product

const initialState: ProductsState = {
	products: [],
	loading: false,
	error: null,
	success: false,
};

export const inititalProduct: Product = {
	id: 0,
	name: "",
	price: 0,
};

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setProducts(state, action: PayloadAction<Product[]>) {
			state.products = action.payload;
			state.loading = false;
			state.error = null;
		},
		addProduct(state, action: PayloadAction<Product>) {
			state.products.push(action.payload);
			state.success = true;
		},
		removeProduct(state, action: PayloadAction<number>) {
			state.products = state.products.filter((product) => product.id !== action.payload);
			state.success = true;
		},
		updateProduct(state, action: PayloadAction<Product>) {
			state.products = state.products.map((product) => (product.id === action.payload.id ? action.payload : product));
			state.success = true;
		},
		setLoading(state) {
			state.loading = true;
			state.error = null;
			state.success = false;
		},
		setError(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const { setProducts, addProduct, removeProduct, updateProduct, setLoading, setError } = productsSlice.actions;
const productsReducer = productsSlice.reducer;
export default productsReducer;
