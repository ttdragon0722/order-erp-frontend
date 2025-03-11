import axios from "axios";
import { ApiResponse } from "./types/apiResponse";
import { handleApiResponse200 } from "@/utils/apiHelper";
import { Material } from "./types/material.type";

export const Materials = {
	get: async (): Promise<
		ApiResponse<Material[]> | { success: false; message: string }
	> => {
		try {
			const res = await axios.get("/api/getMaterials");

            return handleApiResponse200(
                res,
                "materials讀取失敗"
            )

		} catch (error) {
			console.error("登出錯誤:", error);
			return { success: false, message: "materials讀取失敗" };
		}
	},
};