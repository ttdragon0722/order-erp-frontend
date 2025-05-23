import axios from "axios";
import { ApiResponse } from "./types/apiResponse";
import { MeDto } from "./types/line.type";

const LineLogin = {
	getURL: async (): Promise<ApiResponse<string>> => {
		try {
			const res = await axios.get("/api/line/url");
			if (res.status !== 200) {
				throw Error("line login授權網址讀取失敗");
			}

			return { success: true, data: res.data };
		} catch (err) {
			console.error(err);
			return { success: false, message: "line login授權網址讀取失敗" };
		}
	},
	getMe: async (): Promise<ApiResponse<MeDto | undefined>> => {
		try {
			const res = await axios.get("/api/line/me");
			// 200 OK 才回傳資料
			if (res.status === 200) {
				return { success: true, data: res.data };
			}

			return { success: false, message: "line me 錯誤" };
		} catch (err: any) {
			if (err.response?.status === 401 || 404) {
				// 401 特殊處理，視為未登入，不回傳錯誤
				return { success: true };
			}
			console.error(err);
			return { success: false, message: "line me 錯誤" };
		}
	},
};

export default LineLogin;
