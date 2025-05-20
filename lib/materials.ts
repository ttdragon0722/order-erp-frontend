import axios from "axios";
import { ApiResponse, ApiResponseNoData } from "./types/apiResponse";
import { Material } from "./types/material.type";
import { StockStatus } from "./enums/stockStatus";

export const Materials = {
	get: async (): Promise<
		ApiResponse<Material[]> | { success: false; message: string }
	> => {
		try {
			const res = await axios.get("/api/materials", {});

			if (res.status !== 200) {
				throw new Error("materials讀取失敗");
			}
			return { success: true, data: res.data };
		} catch (error) {
			console.error("materials讀取失敗:", error);
			return { success: false, message: "materials讀取失敗" };
		}
	},
	add: async (
		name: string,
		tags: string[]
	): Promise<ApiResponse<Material>> => {
		try {
			const data = {
				name: name,
				tagIds: tags,
			};
			const res = await axios.post("/api/materials/with-tags", data, {
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			});
			if (res.status !== 200) {
				throw new Error("新增原料失敗");
			}

			return {
				success: true,
				data: res.data,
			};
		} catch (error) {
			console.error("原料錯誤：", error);
			return {
				success: false,
				message: "原料錯誤",
			};
		}
	},
	drop: async (route: string): Promise<ApiResponseNoData> => {
		try {
			const res = await axios.delete(route, {
				withCredentials: true,
			});
			if (res.status !== 200) {
				throw new Error("刪除原料失敗");
			}
			return { success: true };
		} catch (error) {
			console.error("刪除原料錯誤：", error);

			return {
				success: false,
			};
		}
	},
	editStock: async (
		id: string,
		stockStatus: StockStatus,
		stockAmount: number | null
	): Promise<ApiResponseNoData> => {
		try {
			const res = await axios.put(
				"/api/materials/update-stock",
				{
					id: id,
					stockStatus: stockStatus,
					stockAmount: stockAmount,
				},
				{
					withCredentials: true,
				}
			);
			if (res.status !== 200) {
				throw new Error("編輯庫存失敗");
			}
			return { success: true };
		} catch (error) {
			console.error("編輯庫存失敗：", error);

			return {
				success: false,
			};
		}
	},
};
