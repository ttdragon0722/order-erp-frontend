import { useEffect, useState } from "react";
import useStatus, { Status } from "./useStatus";
import { ApiFunc, Responses } from "@/lib/types/apiResponse";

// Use Api 
interface UseApiResponse<T> {
    status: Status;
    data?: T;
    res?: Responses<T>;
}

export function useApi<T>(fetchFunc: ApiFunc<T>): UseApiResponse<T> {
    const { status, setStatus } = useStatus();
    const [data, setData] = useState<T | undefined>(undefined);
    const [res, setRes] = useState<Responses<T> | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result: Responses<T> = await fetchFunc();

                setRes(result);

                if (result.success) {
                    if ("data" in result) {
                        setData(result.data);
                    }
                    setStatus.success();
                } else {
                    console.error(result.message);
                    setStatus.error();
                }
            } catch (error) {
                console.error("API 請求錯誤:", error);
                setStatus.error();
            }
        };

        fetchData();
    }, []);

    return { status, data, res };
}
