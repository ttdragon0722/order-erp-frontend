// utils/apiHelper.ts
import { AxiosResponse } from "axios"; // 引入 AxiosResponse

export function handleApiResponse<T>(
	res: AxiosResponse<T>,
	message?: string
): T {
	// 檢查回應的狀態碼，如果不是200則丟出錯誤
	if (res.status !== 200) {
		throw new Error(res.status + (message ? message : " - 未知錯誤"));
	}
	return res.data; // 返回資料
}
