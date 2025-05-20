import { Material } from "./material.type";
import { Product } from "./product.type";

export type ProductMaterial = {
	productId: string;
	product?: Product;
	materialId: string;
	material?: Material;
};
