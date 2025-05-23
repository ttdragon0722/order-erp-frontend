import { OptionGroupType } from "@/lib/enums/optionType";
import axios from "axios";
import { ApiResponse } from "./types/apiResponse";
import { OptionResponse } from "./types/option.type";

export const Options = {
	getAll: async (): Promise<ApiResponse<OptionResponse>> => {
		try {
			const res = await axios.get("/api/option/getAll", {
				withCredentials: true,
			});
			if (res.status !== 200) {
				throw Error("OPTION讀取失敗");
			}

			return { success: true, data: res.data };
		} catch (err) {
			console.error(err);
			return { success: false, message: "OPTION讀取失敗" };
		}
	},
	create: async (
		name: string,
		price: number,
		type: OptionGroupType,
		children: string[],
		require: boolean,
		optionDepends: string
	) => {
		try {
			const payload: any = {
				name,
				price,
				type
			};
			if (type === OptionGroupType.Single) {
				payload.children = children;
				payload.require = require;
			}
			if (optionDepends && optionDepends.trim() !== "") {
				payload.optionDepends = optionDepends;
			}

			const res = await axios.post("/api/option/create", payload, {
				withCredentials: true,
			});
			if (res.status !== 200) {
				throw Error("OPTION新增失敗");
			}
			return { success: true, data: res.data };
		} catch (err) {
			console.error(err);
			return { success: false, message: "OPTION新增失敗" };
		}
	},
};
