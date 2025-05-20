import { FC, HTMLInputTypeAttribute } from "react";

type CheckboxProps = {
    id?: string;
    checked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox: FC<CheckboxProps> = ({ id, checked, onChange }) => {
    return (
        <input
            type="checkbox"
            id={id}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={checked}
            onChange={onChange}
        />
    );
};

interface InputProp {
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // 新增 onBlur
    type?: HTMLInputTypeAttribute;
    required?: boolean;
    placeholder?: string;
    className?: string;
    min?: number; // ✅ 額外加入支援 min
}

export const Input: React.FC<InputProp> = ({
    type = "text",
    required,
    value,
    onChange,
    onBlur, // 接收 onBlur 屬性
    placeholder,
    className,
    min,
}) => {
    return (
        <input
            type={type}
            required={required}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur} // 傳遞給 input 元素
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent ${className}`}
            min={type === "number" ? min : undefined}
        />
    );
};
