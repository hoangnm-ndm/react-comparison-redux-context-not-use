import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../common/redux/store";
import {
	setProducts,
	addProduct,
	removeProduct,
	updateProduct,
	setLoading,
	setError,
} from "../common/redux/productsSlice";
import instance from "../common/services/api";
import { Product } from "../common/types/product";
import { productSchema, ProductFormData } from "../common/schemas/productSchema";

const ProductManagementPage: React.FC = () => {
	const { products, loading, error, success } = useSelector((state: RootState) => state.products);
	const dispatch = useDispatch<AppDispatch>();

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm<ProductFormData>({
		resolver: zodResolver(productSchema),
		defaultValues: { name: "", price: 0 },
	});

	const [isEditing, setIsEditing] = React.useState<boolean>(false);
	const [editingId, setEditingId] = React.useState<number | null>(null);

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

	// Thêm hoặc sửa sản phẩm
	const onSubmit = async (data: ProductFormData) => {
		try {
			dispatch(setLoading());
			if (isEditing && editingId) {
				const { data: dataUpdated } = await instance.put(`/products/${editingId}`, data);
				dispatch(updateProduct({ id: editingId, ...dataUpdated }));
				setIsEditing(false);
				setEditingId(null);
			} else {
				const { data: newProduct } = await instance.post("/products", data);
				dispatch(addProduct(newProduct));
			}
			reset();
		} catch (err) {
			dispatch(setError(`Không thể ${isEditing ? "cập nhật" : "thêm"} sản phẩm`));
		}
	};

	// Xóa sản phẩm
	const handleDeleteProduct = async (id: number) => {
		try {
			dispatch(setLoading());
			await instance.delete(`/products/${id}`);
			dispatch(removeProduct(id));
		} catch (err) {
			dispatch(setError("Không thể xóa sản phẩm"));
		}
	};

	// Chọn sản phẩm để sửa
	const handleEditProduct = (product: Product) => {
		setValue("name", product.title);
		setValue("price", product.price);
		setIsEditing(true);
		setEditingId(product.id);
	};

	return (
		<div className="p-4">
			<h2 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h2>

			{/* Form thêm/sửa sản phẩm */}
			<form onSubmit={handleSubmit(onSubmit)} className="mb-4">
				<div className="flex flex-col gap-2">
					<div>
						<input type="text" {...register("name")} placeholder="Tên sản phẩm" className="border p-2 w-full" />
						{errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
					</div>
					<div>
						<input
							type="number"
							{...register("price", { valueAsNumber: true })}
							placeholder="Giá sản phẩm"
							className="border p-2 w-full"
						/>
						{errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
					</div>
					<button type="submit" className={`p-2 text-white ${isEditing ? "bg-blue-500" : "bg-green-500"}`}>
						{isEditing ? "Cập nhật" : "Thêm"}
					</button>
				</div>
			</form>

			{/* Thông báo */}
			{loading && <p>Đang tải...</p>}
			{error && <p className="text-red-500">{error}</p>}
			{success && <p className="text-green-500">Thành công!</p>}

			{/* Danh sách sản phẩm */}
			<ul>
				{products.map((product) => (
					<li key={product.id} className="flex justify-between items-center border-b py-2">
						<span>
							{product.title} - ${product.price}
						</span>
						<div>
							<button onClick={() => handleEditProduct(product)} className="bg-yellow-500 text-white p-1 mr-2">
								Sửa
							</button>
							<button onClick={() => handleDeleteProduct(product.id)} className="bg-red-500 text-white p-1">
								Xóa
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ProductManagementPage;
