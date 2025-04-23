import { Select } from "@/components/ui/Select";
import { StockStatus, StockStatusText } from "@/lib/enums/stockStatus";

interface StockSelectionProps {
    value: number;
    onChange: (value: number) => void;
}

export const StockSelection = ({ value, onChange }: StockSelectionProps) => {
    // 轉換 `StockStatus` 為 `options` 陣列
    const stockOptions = Object.values(StockStatus)
        .filter(value => typeof value === "number") // 過濾掉 enum 的 key（只保留數值）
        .map(value => ({
            label: StockStatusText[value as StockStatus], // 取得對應的文字
            value: value.toString(), // `Select` 需要 `string` 作為值
        }));

    return (
        <Select
            label="選擇庫存狀態"
            placeholder="請選擇庫存狀態"
            options={stockOptions}
            value={value.toString()} // 轉為字串以符合 `Select`
            onChange={(newValue) => onChange(Number(newValue))} // 轉回 `number`
        />
    );
};
