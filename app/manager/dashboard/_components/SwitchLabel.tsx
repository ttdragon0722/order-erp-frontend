import { usePostApi } from "@/hook/useApi";
import useStatus from "@/hook/useStatus";
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

    const { postData: setSetting } = usePostApi(BusinessSettings.set);

    const handleToggle = async () => {
        if (loading) return; // 避免多次點擊
        setLoading(true);

        const newData = !data; // 先計算新的狀態
        setData(newData); // 切換開關狀態

        setSetting([api, newData],
            () => {
                console.log("設定成功");
            },
            (err) => {
                console.error(err);
                setData(data); // API 請求失敗時恢復原狀態
            },
            () => {
                setLoading(false); // 無論成功或失敗，都解鎖按鈕

            }
        )
    };

    return (
        <div className={
            clsx("text-xl flex flex-col h-36 items-center justify-center w-4/5 rounded-xl overflow-hidden shadow-xl transition-all ease-in-out",
                className,
                data ? "font-bold bg-[#d9dfff]" : "bg-[#eaeefd]"
            )
        }>
            {label}
            <label className="sha mt-3 inline-flex items-center cursor-pointer drop-shadow-lg">
                <input
                    type="checkbox"
                    checked={data}
                    onChange={handleToggle}
                    className="sr-only peer"
                    disabled={loading} // 當請求中時，避免多次點擊
                />
                <div className="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
        </div>
    );
};

export default SwitchLabel;
