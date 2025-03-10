import axios from "axios";
import { ApiResponse } from "./types/apiResponse";

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

			if (res.status !== 200) {
				throw new Error("設定資料讀取失敗" + res.data.message);
			}

			// 假設返回的資料結構符合 BusinessSetting
			return res.data as ApiResponse<BusinessSetting>;
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

			console.log(res);

			if (res.status !== 200) {
				throw new Error("設定資料失敗: " + res.data.message);
			}

			return res.data; // 回傳 API 回應的資料
		} catch (error) {
			console.error("API 請求錯誤:", error);
			throw new Error("API 請求失敗");
		}
	},
};
