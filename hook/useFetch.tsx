import { useEffect, useState } from "react";
import useStatus, { Status } from "@/hook/useStatus";
import { ApiResponse } from "@/lib/types/apiResponse";

// 引入 ApiResponse 類型

// 定義返回值的類型
interface UseFetchResult<T> {
    status: Status;
    res: ApiResponse<T> | undefined;
    data: T | undefined;
}

export function useFetch<T>(fetchFunc: () => Promise<ApiResponse<T>>) {
    const { status, setStatus } = useStatus();
    const [data, setData] = useState<T | undefined>(undefined);
    const [res, setRes] = useState<ApiResponse<T> | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // setStatus.loading();
                const result = await fetchFunc();

                setRes(result); // 儲存回應

                if (result.success) {
                    setData(result.data); // 設置數據
                    setStatus.success();
                } else {
                    console.error(result.message);
                    setStatus.error();
                }
            } catch (error) {
                setStatus.error();
            }
        };

        fetchData();
    }, []);

    return { status, data, res };
}
