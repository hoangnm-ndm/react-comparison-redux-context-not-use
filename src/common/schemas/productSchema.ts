// src/common/utils/productSchema.ts
import { z } from "zod";

export const productSchema = z.object({
	name: z
		.string()
		.min(3, "Tên sản phẩm phải có ít nhất 3 ký tự")
		.max(100, "Tên sản phẩm không được vượt quá 100 ký tự"),
	price: z
		.number("Giá phải là số")
		.min(0, "Giá không được nhỏ hơn 0")
		.max(1000000, "Giá không được vượt quá 1,000,000"),
});

export type ProductFormData = z.infer<typeof productSchema>;
