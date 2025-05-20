import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

type ModalSelectorProps<T> = {
    select: T | null;
    setSelect: (value: T) => void;
    model: React.ReactNode;
    placeholder?: string;
};

export const ModalSelector = <T,>({
    select,
    setSelect,
    model,
    placeholder = "請選擇",
}: ModalSelectorProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(false);
    }, [select])

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-left"
            >
                {select ? String(select) : placeholder}
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/15 backdrop-blur-lg bg-opacity-50 flex items-center justify-center"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="relative bg-white p-6 rounded-lg shadow-xl max-h-[80vh] overflow-auto w-3xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* 自定義內容 */}
                        {model}

                        {/* 可選：手動關閉按鈕 */}
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="mt-4 text-sm text-gray-500 hover:text-gray-700 absolute top-0 right-2"
                        >
                            <IoMdClose size={32} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
