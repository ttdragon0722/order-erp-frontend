import axios from "axios";

import { Material } from "./types/material";
import { ApiResponse } from "./types/apiResponse";

// 用來讓程式等待指定時間的延遲函數
function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getMaterials(): Promise<Material[]> {
	try {
		const response = await axios.get<ApiResponse<Material[]>>(
			"http://localhost:3000/api/getMaterials",
			{
				withCredentials: true,
			}
		);

		await delay(5000);

		if (response.data.success) {
			console.log(response.data);
			return response.data.data || []; // 回傳資料，如果沒有 data 就回傳空陣列
		} else {
			throw new Error(
				response.data.message || "Failed to fetch materials"
			);
		}
	} catch (error) {
		console.error("Error fetching materials:", error);
		return [];
	}
}
