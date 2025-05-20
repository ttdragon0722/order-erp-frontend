import axios from "axios";
import { ApiResponse } from "./types/apiResponse";
import { Tag as TagEntity } from "./types/tags.type";
import { ColorIndex, ColorName } from "../config/colorSet";

export const Tag = {
	// 取得所有分類
	getAll: async (): Promise<ApiResponse<TagEntity[]>> => {
		try {
			const res = await axios.get("/api/tag", { withCredentials: true });
			if (res.status !== 200) {
				throw new Error("tags讀取失敗");
			}
			return { success: true, data: res.data };
		} catch (error) {
			console.error("error", error);
			return { success: false, message: "tag讀取失敗" };
		}
	},

	// 新增分類
	add: async (
		name: string,
		color: ColorIndex
	): Promise<ApiResponse<TagEntity>> => {
		try {
			const url = `/api/tag?name=${encodeURIComponent(name)}&color=${color}`;
			const res = await axios.post(url,"",{withCredentials: true});
			if (res.status !== 201) {
				throw new Error("tags新增失敗");
			}
			return {success:true, data:res.data}
		} catch (error) {
			console.error("error", error);
			return { success: false, message: "tag新增失敗" };
		}
	},
};
