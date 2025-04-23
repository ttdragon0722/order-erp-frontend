import axios from "axios";
import { ApiResponse } from "./types/apiResponse";
import { Material } from "./types/material.type";

export const Materials = {
	get: async (): Promise<
		ApiResponse<Material[]> | { success: false; message: string }
	> => {
		try {
			const res = await axios.get("/api/getMaterials", {});

			if (res.status !== 200) {
				throw new Error("materials讀取失敗");
			}
			return { success: true, data: res.data };
		} catch (error) {
			console.error("登出錯誤:", error);
			return { success: false, message: "materials讀取失敗" };
		}
	},
};
