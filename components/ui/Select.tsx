import { FC } from "react";

export interface SelectOption {
    label: string;
    value: string;
}

interface SelectProps {
    label?: string;
    placeholder?: string;
    value: string;
    options: SelectOption[];
    className?: string;
    onChange: (value: string) => void;
}

export const Select: FC<SelectProps> = ({
    label,
    placeholder,
    value,
    options,
    className,
    onChange,
}) => {
    return (
        <div className={className}>
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {placeholder && <option value="" disabled hidden>{placeholder}</option>}
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
