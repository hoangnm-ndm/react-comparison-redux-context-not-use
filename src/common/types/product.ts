export interface Product {
	id: number;
	title: string;
	price: number;
}

export interface ProductsState {
	products: Product[];
	loading: boolean;
	error: string | null;
	success: boolean;
}
