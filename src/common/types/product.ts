export interface Product {
	id: number;
	name: string;
	price: number;
}

export interface ProductsState {
	products: Product[];
	loading: boolean;
	error: string | null;
	success: boolean;
}
