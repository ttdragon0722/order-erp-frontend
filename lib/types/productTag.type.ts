import { Product } from "./product.type";
import { Tag } from "./tags.type";

export type ProductTag = {
	productId: string;
	product: Product;
	tagId: string;
	tag: Tag;
};
