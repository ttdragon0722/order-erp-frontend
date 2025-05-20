import { Product } from "./product.type";
import { TypeMaterials } from "./typeMaterials.type";
import { TypeOption } from "./typeOption.type";

export type TypeEntity = {
	id: string;
	name: string;
	enable: boolean;
	sortOrder: number;
	products?: Product[]; // ICollection<Product>? → Product[] | undefined
	typeOptions?: TypeOption[]; // ICollection<TypeOption>? → TypeOption[] | undefined
	typeMaterials?: TypeMaterials[]; 
};

export type ClassificationEntity = {
	id: string;
	name: string;
	hasStock: boolean;
}