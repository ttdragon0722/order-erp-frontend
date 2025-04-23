import { StockStatus, StockStatusText } from "../enums/stockStatus";
import { TableHeader } from "./table-header";

export interface Material {
	id: string;
	name: string;
	enable: boolean; 
	stock: StockStatus; 
	stockAmount: number | null;
	isUnlimited: boolean;
	productMaterials: string[] ;
	materialTags: string[] ;
}

export const materialTableHeaders: TableHeader<Material>[] = [
	{ key: "name", label: "原料名稱" },
	{ key: "enable", label: "顯示", type: "boolean" },
	{ key: "stock", label: "庫存狀態", type: "boolean" },
	{
		key: "stockAmount",【
		label: "庫存數量",
		type: "stock",
		linkTo: "stock",
		nullText: "尚有庫存",
	},
];
