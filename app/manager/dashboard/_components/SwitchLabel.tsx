import useStatus from "@/hook/useLoading";
import { BusinessSettings } from "@/lib/businessSettings";
import clsx from "clsx";
import { FC, useState } from "react";

interface SwitchLabelProp {
    label: string;
    src: boolean;
    api: string;
    className?: string;
}

const SwitchLabel: FC<SwitchLabelProp> = ({
    label, src, api, className
}) => {
    const [data, setData] = useState(src);
    const [loading, setLoading] = useState(false); // 防止重複點擊

    const handleToggle = async () => {
        if (loading) return; // 避免多次點擊
        setLoading(true);

        const newData = !data; // 先計算新的狀態
        setData(newData); // 切換開關狀態

        try {
            const res = await BusinessSettings.set(api, newData); // 發送 API 請求

            if (res.success) {
                console.log("設定成功");
            } else {
                console.error("設定失敗", res.message);
                setData(data); // 恢復原來的狀態
            }
        } catch (error) {
            console.error("API 請求錯誤:", error);
            setData(data); // API 請求失敗時恢復原狀態
        } finally {
            setLoading(false); // 無論成功或失敗，都解鎖按鈕
        }
    };

    return (
        <div className={clsx("flex flex-col h-36 items-center justify-center", className)}>
            {label}
            <label className="inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={data}
                    onChange={handleToggle}
                    className="sr-only peer"
                    disabled={loading} // 當請求中時，避免多次點擊
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
            </label>
        </div>
    );
};

export default SwitchLabel;
