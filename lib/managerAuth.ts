import axios from "axios";
import { ApiResponseNoData } from "./types/apiResponse";

export const ManagerAuth = {
	/**
	 * 登出使用者，清除 Cookie 內的 JWT Token
	 */
	logout: async (): Promise<ApiResponseNoData> => {
		try {
			const res = await axios.post(
				"/api/logout",
				{},
				{ withCredentials: true }
			);

			if (res.status !== 204) {
				throw new Error("登出失敗");
			}
			return { success: true, message: "登出成功" };
		} catch (error) {
			console.error("登出錯誤:", error);
			return { success: false, message: "登出失敗" };
		}
	},

	/**
	 * 使用者登入，將 JWT 存入 Cookie
	 * @param userID 使用者帳號
	 * @param password 密碼
	 */
	login: async (userID: string, password: string):Promise<ApiResponseNoData> => {
		try {
			const formData = new FormData();
			formData.append("UserId", userID);
			formData.append("Password", password);

			const res = await axios.post("/api/login", formData, {
				withCredentials: true, // 允許發送 Cookie
			});

			if (res.status !== 204) {
				throw new Error("登入失敗");
			}

			return { success: true, message: "登入成功" };
		} catch (error) {
			console.error("登入錯誤:", error);
			return { success: false, message: "登入失敗" };
		}
	},
};
