import axios from "axios";
import { ApiResponse } from "./types/apiResponse";
import { ClassificationEntity, TypeEntity } from "./types/typeEntity.type";

export const Classification = {
	// 取得所有分類
	getAll: async (): Promise<ApiResponse<TypeEntity[]>> => {
		try {
			const res = await axios.get("/api/classifications"); // 根據您的 API 路徑修改

			if (res.status !== 200) {
				throw new Error("資料讀取失敗");
			}

			return { success: true, data: res.data }; // 假設返回的數據是 TypeEntity 陣列
		} catch (error) {
			console.error("分類讀取失敗:", error);
			return { success: false, message: "分類讀取失敗" };
		}
	},
	getList: async (): Promise<ApiResponse<ClassificationEntity[]>> => {
		try {
			const res = await axios.get("/api/classifications/list"); // 根據您的 API 路徑修改

			if (res.status !== 200) {
				throw new Error("資料讀取失敗");
			}

			return { success: true, data: res.data }; // 假設返回的數據是 TypeEntity 陣列
		} catch (error) {
			console.error("分類讀取失敗:", error);
			return { success: false, message: "分類讀取失敗" };
		}
	},

	// 新增分類
	add: async (
		name: string,
		enable: boolean
	): Promise<ApiResponse<TypeEntity>> => {
		try {
			const newClassification = { name, enable };
			const res = await axios.post(
				"/api/classifications",
				newClassification,
				{ withCredentials: true }
			);

			if (res.status !== 201) {
				throw new Error("新增分類失敗");
			}

			return { success: true, data: res.data };
		} catch (error) {
			console.error("新增分類錯誤:", error);
			return { success: false, message: "新增分類失敗" };
		}
	},
};
