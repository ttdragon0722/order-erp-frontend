import { MaterialObj } from "./material.type";
import { Option } from "./option.type";
import { Product } from "./product.type";

export type ProductExcludedOption = {
	productId: string;
	product?: Product; // nullable in C#, 用 ? 表示可選
	optionId: string;
	option?: Option; // 同上
};

export interface ProductObj {
  id: string; // Guid 對應 string
  name: string;
  price: number; // decimal 對應 number
  depends?: MaterialObj[]; // nullable List 對應可選陣列
  hasStock: boolean;
}

export interface ProductListDto {
  typeId: string;
  typeName: string;
  depend: MaterialObj;
  hasStock: boolean;
  products: ProductObj[];
}
