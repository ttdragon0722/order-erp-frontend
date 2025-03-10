import axios from "axios";
import { ApiResponse } from "./types/apiResponse";
import { handleApiResponse } from "@/utils/apiHelper";

export interface BusinessSetting {
	id: string;
	enableOrdering: boolean;
	enableDineIn: boolean;
	enableTakeout: boolean;
	enableDelivery: boolean;
}

export const BusinessSettings = {
	getAll: async (): Promise<
		ApiResponse<BusinessSetting> | { success: false; message: string }
	> => {
		try {
			const res = await axios.get("/api/settings/getStatus");

			return handleApiResponse(
				res,
				"設定資料讀取失敗"
			) as ApiResponse<BusinessSetting>;

		} catch (error) {
			console.error("登出錯誤:", error);
			return { success: false, message: "setting讀取失敗" };
		}
	},
	set: async (api: string, data: boolean) => {
		try {
			const res = await axios.post(`/api/settings/${api}`, data, {
				headers: {
					"Content-Type": "application/json", // 確保是 JSON 格式
				},
			});

			return handleApiResponse(
				res,
				"設定資料失敗"
			)

		} catch (error) {
			console.error("API 請求錯誤:", error);
			throw new Error("API 請求失敗");
		}
	},
};
