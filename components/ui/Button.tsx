export const SubmitButton = ({ label, disabled = false }: { label: string, disabled?: boolean }) => {
    return <button
        type="submit"
        disabled={disabled}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-200"
    >
        {label}
    </button>
}

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
}

export const Btn: React.FC<BtnProps> = ({
    label,
    className = "",
    disabled = false,
    onClick,
    type = "button", // 預設是普通按鈕
    ...rest
}) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`
                w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg 
                transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed
                ${className}
            `}
            {...rest}
        >
            {label}
        </button>
    );
};