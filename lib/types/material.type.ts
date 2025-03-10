import { TableHeader } from "./table-header";

export interface Material {
	id: string; // Equivalent to Guid in C#
	name: string;
	enable: boolean; // Equivalent to bool in C#
	stock: boolean; // Equivalent to bool in C#
	stockAmount: number | null; // Equivalent to int? in C#
}

export const materialTableHeaders: TableHeader<Material>[] = [
	{ key: "name", label: "原料名稱" },
	{ key: "enable", label: "顯示" },
	{ key: "stock", label: "庫存狀態" },
	{ key: "stockAmount", label: "庫存數量" },
];
