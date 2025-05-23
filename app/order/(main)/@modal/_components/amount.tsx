import { useCallback } from "react";

interface AmountBlockProps {
    amount: number;
    setAmount: (val: number) => void;
    min?: number;
    max?: number;
}

const AmountBlock = ({ amount, setAmount, min = 0, max = Infinity }: AmountBlockProps) => {

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        if (!isNaN(val)) {
            setAmount(Math.max(min, Math.min(val, max)));
        }
    }, [min, max, setAmount]);

    const handleIncrement = () => {
        if (amount < max) setAmount(amount + 1);
    };

    const handleDecrement = () => {
        if (amount > min) setAmount(amount - 1);
    };

    return (
        <div className="flex items-center space-x-2">
            <button
                type="button"
                onClick={handleDecrement}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
                -
            </button>
            <input
                type="number"
                value={amount}
                onChange={handleChange}
                className="w-16 text-center border border-gray-300 rounded "
            />
            <button
                type="button"
                onClick={handleIncrement}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
                +
            </button>
        </div>
    );
};

export default AmountBlock;
