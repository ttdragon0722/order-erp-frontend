import { ProductTag } from "./productTag.type";
import { TypeEntity } from "./typeEntity.type";

export type Product = {
	id: string; // Guid 對應 string
	name: string;
	price: number;
	enable: boolean;
	typeId: string;
	type: TypeEntity;
	productTags: ProductTag[];
	productMaterials: ProductMaterial[];
	excludedOptions: ProductExcludedOption[];
	productOptions: ProductOption[];
};
