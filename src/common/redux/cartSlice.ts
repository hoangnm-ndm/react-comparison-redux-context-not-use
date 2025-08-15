import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItem, CartState } from "../types/cart";

// Định nghĩa kiểu cho Product

export const initialCart: Cart = {
	products: [],
	totalPrice: 0,
	totalQuantity: 0,
};

const initialState: CartState = {
	cart: initialCart,
	loading: false,
	error: null,
	success: false,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		setCart(state, action: PayloadAction<Cart>) {
			state.cart = action.payload; // {products: [...], totalPrice: 1000, totalQuantity: 4, userId: "123"}
			state.loading = false;
			state.error = null;
		},
		addToCart(state, action: PayloadAction<CartItem>) {
			state.cart.products = state.cart.products.find((item) => item.id === action.payload.id)
				? state.cart.products.map((item) =>
						item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
				  )
				: [...state.cart.products, { ...action.payload, quantity: 1 }];
			state.cart.totalPrice += action.payload.price;
			state.cart.totalQuantity += 1;
			state.success = true;
		},

		removeFromCart(state, action: PayloadAction<CartItem>) {
			// * Giảm số lượng sản phẩm, khi nào số lượng = 0 thì xóa khỏi giỏ hàng
			state.cart.products = state.cart.products
				.map((item) => (item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item))
				.filter((item) => item.quantity > 0);
			state.cart.totalPrice -= action.payload.price;
			state.cart.totalQuantity -= 1;
			state.success = true;
		},
		deleteFromCart(state) {
			state.cart.products = [];
			state.cart.totalPrice = 0;
			state.cart.totalQuantity = 0;
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

export const { setCart, addToCart, removeFromCart, deleteFromCart, setLoading, setError } = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
