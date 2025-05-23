import { MaterialObj } from "./material.type";
import { OptionResponse } from "./option.type";
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

export interface ProductCart {
	id: string; // Guid 對應 string
	name: string;
	price: number; // decimal 對應 number
	depends?: MaterialObj[]; // nullable List<MaterialObj>
	options: OptionResponse[];
}
