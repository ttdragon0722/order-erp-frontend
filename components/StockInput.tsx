import { useState } from "react";
import { StockStatus } from "@/lib/enums/stockStatus";
import { Input } from "./ui/Input";
import { usePostApi } from "@/hook/useApi";
import { Materials } from "@/lib/materials";

interface StockInputProps {
    id: string,
    initialStatus: StockStatus;
    initialAmount: number | null;
    onChange?: (status: StockStatus, amount: number | null) => void;
}

const StockInput: React.FC<StockInputProps> = ({ id, initialStatus, initialAmount, onChange }) => {
    const [stockStatus, setStockStatus] = useState<StockStatus>(initialStatus);
    const [stockAmount, setStockAmount] = useState<number | null>(initialAmount);

    const { postData } = usePostApi(Materials.editStock);

    // 更新庫存的 function
    const updateStock = () => {
        // 檢查庫存狀態和數量是否與原本一樣
        if (stockStatus === initialStatus && stockAmount === initialAmount) {
            console.log("庫存未改動，不進行更新");
            return; // 如果狀態和數量沒有變動，則不呼叫 API
        }

        // 發送更新 API 請求
        postData([id, stockStatus, stockAmount],
            () => {
                console.log("庫存更新成功");
            },
            (err) => {
                alert("更新庫存失敗: " + err);
            }
        );
    };


    // 處理狀態改變
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = Number(e.target.value) as StockStatus;
        setStockStatus(newStatus);
    
        switch (newStatus) {
            case StockStatus.None:
            case StockStatus.Limited:
                setStockAmount(0); // 設定為 0 當狀態為 無庫存
                break;
            case StockStatus.Unlimited:
                setStockAmount(null); // 無限庫存時不設數量
                break;
            default:
                break;
        }
    
        if (onChange) onChange(newStatus, stockAmount);
    };
    

    // 處理數量改變
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const parsed = value === "" ? null : Number(value);
        setStockAmount(parsed); // 更新庫存數量
        if (onChange) onChange(stockStatus, parsed);
    };

    // 在元素失去焦點時更新庫存
    const handleBlur = () => {
        updateStock();
    };

    return (
        <div className="flex gap-1 justify-center items-center">
            <select
                value={stockStatus}
                onChange={handleStatusChange}
                onBlur={handleBlur} // 當選擇框失去焦點時觸發更新
                className="border px-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-transparent block w-1/2 h-full py-2"
            >
                <option value={StockStatus.None}>沒有庫存</option>
                <option value={StockStatus.Limited}>有限庫存</option>
                <option value={StockStatus.Unlimited}>無限庫存</option>
            </select>

            {/* 當不是無限庫存時顯示庫存數量輸入框 */}
            {stockStatus !== StockStatus.Unlimited && (
                <div className="w-1/4">
                    <Input
                        type="number"
                        min={0}
                        value={stockAmount ?? ""}
                        onChange={handleAmountChange}
                        onBlur={handleBlur} // 當數量輸入框失去焦點時觸發更新
                        className="border px-2 py-1 rounded"
                        placeholder="庫存"
                    />
                </div>
            )}
        </div>
    );
};

export default StockInput;
