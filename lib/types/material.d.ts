export interface Material {
	id: string; // Equivalent to Guid in C#
	name: string;
	enable: boolean; // Equivalent to bool in C#
	stock: boolean; // Equivalent to bool in C#
	stockAmount: number | null; // Equivalent to int? in C#
}
