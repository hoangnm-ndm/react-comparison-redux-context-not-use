import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../common/redux/store";
import { setError, setLoading, setProducts } from "../common/redux/productsSlice";
import instance from "../common/services/api";
import { Product } from "../common/types/product";
import { addToCart } from "../common/redux/cartSlice";

const Shop = () => {
	const { products, error, loading } = useSelector((state: RootState) => state.products);
	const handleAddToCart = (product: Product) => {
		console.log(product);
		dispatch(addToCart({ price: product.price, title: product.title, id: product.id, quantity: 1 }));
	};

	const dispatch = useDispatch<AppDispatch>();

	// Lấy danh sách sản phẩm
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				dispatch(setLoading());
				const { data } = await instance.get("/products");
				dispatch(setProducts(data));
			} catch (err) {
				dispatch(setError("Không thể lấy danh sách sản phẩm"));
			}
		};
		fetchProducts();
	}, [dispatch]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			<h1>Các sản phẩm tốt nhất của chúng tôi</h1>
			<div>
				{products?.map((item, index) => (
					<div key={index}>
						<h2>{item.title}</h2>
						<p>Giá: {item.price} VNĐ</p>
						<button onClick={() => handleAddToCart(item)}>Them vao gio hang</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Shop;
