export enum StockStatus {
	None = 0, // 沒有庫存
	Limited = 1, // 有限庫存
	Unlimited = 2, // 無限庫存
}

export const StockStatusText: Record<StockStatus, string> = {
	[StockStatus.None]: "沒有庫存",
	[StockStatus.Limited]: "有限庫存",
	[StockStatus.Unlimited]: "不限庫存",
};
