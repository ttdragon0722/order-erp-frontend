import axios from "axios";
import { ApiResponse } from "./types/apiResponse";
import { handleApiResponse200 } from "@/utils/apiHelper";

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
				throw new Error("資料讀取失敗");
			}

			return { success: true, data: res.data };
		} catch (error) {
			console.error("setting讀取失敗:", error);
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

			if (res.status !== 204) {
				throw new Error("API 請求失敗");
			}

			return { success: true, message: api + "設定完成" };
		} catch (error) {
			console.error(api + " 請求錯誤:", error);
			throw new Error(api + " 請求失敗");
		}
	},
};
