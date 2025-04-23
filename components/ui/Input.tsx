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
    type?: HTMLInputTypeAttribute | undefined;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 直接傳遞事件
    placeholder?: string;
    className?: string;
}

export const Input: React.FC<InputProp> = ({ type = "text", required, value, onChange, placeholder, className }) => {
    return (
        <input
            type={type}
            required={required}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent ${className}`}
        />
    );
};