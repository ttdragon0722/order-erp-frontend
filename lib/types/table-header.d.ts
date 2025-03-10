export interface TableHeader<T> {
	key: keyof T; // 泛型 T 的鍵作為 TableHeader 的 key
	label: string; // 對應顯示的名稱
}
