import { FC } from "react";

interface Option {
    label: string;
    value: string;
}

interface SelectProps {
    label?: string; // 選單標題
    placeholder?: string; // 預設顯示的選項
    value?: string; // 受控值
    defaultValue?: string; // 預設值 (非受控)
    options: Option[];
    className?: string; // 自訂 className
    onChange?: (value: string) => void; // 選擇時的回調函式
}

export const Select: FC<SelectProps> = ({
    label,
    placeholder,
    value,
    defaultValue,
    options,
    className,
    onChange,
}) => {
    return (
        <div className={className}>
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={value ?? defaultValue ?? ""}
                onChange={(e) => onChange?.(e.target.value)}
            >
                {placeholder && <option value="-1" disabled>{placeholder}</option>}
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
