import { Option } from "./option.type";
import { Product } from "./product.type";

export type ProductOption = {
	productId: string;
	product: Product;
	optionId: string;
	option: Option;
};
