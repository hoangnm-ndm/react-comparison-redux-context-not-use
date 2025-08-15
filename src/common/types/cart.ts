export interface CartItem {
	id: number;
	title: string;
	quantity: number;
	price: number;
}

export interface Cart {
	id?: number;
	products: CartItem[];
	totalPrice: number;
	totalQuantity: number;
	userId?: number;
}

export interface CartState {
	cart: Cart;
	loading: boolean;
	error: string | null;
	success: boolean;
}
