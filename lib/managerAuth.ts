import { authUtil } from "@/utils/localstorage";
import axios from "axios";

export const ManagerAuth = {
	logout: async () => {
		try {
			const res = await axios.post(
				"/api/logout",
				{},
				{ withCredentials: true }
			);

			if (res.status !== 200) {
				throw new Error("登出失敗");
			}

			if (res.data.success) {
				authUtil.logout();
			}

			return res.data; // 返回登出結果
		} catch (error) {
			console.error("登出錯誤:", error);
			return { success: false, message: "登出失敗" };
		}
	},
	login: async (userID: string, password: string) => {
		try {
			const formData = new FormData();
			formData.append("UserId", userID);
			formData.append("Password", password);

			const res = await axios.post("/api/login", formData, {
				withCredentials: true, // 允許傳送 Cookie
			});
            
            if (res.data.success) {
                authUtil.login(res.data.data.authToken);
            }

			return res.data; // 返回登入結果
		} catch (error) {
			console.error("登入錯誤:", error);
			return { success: false, message: "登入失敗" };
		}
	},
};
