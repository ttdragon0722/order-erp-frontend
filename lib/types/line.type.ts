export interface MeDto {
	id: string; // 對應 C# 的 Guid，前端用 string 表示
	displayName: string;
	pictureUrl?: string; // nullable 對應 ?
	lineUserId: string;
	role: string;
}
