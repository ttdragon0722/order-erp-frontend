import { OptionGroupType } from "@/config/optionType";
import { Material } from "./material.type";
import { ProductExcludedOption } from "./productExcludedOption.type";
import { ProductOption } from "./productOption.type";
import { TypeOption } from "./typeOption.type";

export type Option = {
	id: string;
	name: string;
	price: number;
	depend?: string; // 對應 Guid? 可為 undefined/null
	material?: Material; // 可為 null，故加 ?
	productOptions: ProductOption[];
	excludedOptions: ProductExcludedOption[];
	typeOptions: TypeOption[];
};

export interface OptionChildDto {
	id: string;
	name: string;
}

export interface OptionDependDto {
	id: string;
	name: string;
}

export interface OptionResponse {
	id: string;
	name: string;
	price: number;
	type: OptionGroupType;
	optionDepends?: OptionDependDto;
	require?: boolean; // 僅 type === OptionGroupType.Single 時會有值
	children?: OptionChildDto[]; // 同上
}
