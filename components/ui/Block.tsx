"use client"
import clsx from 'clsx';
import { useState } from 'react';

interface BlockProps {
    label: string;
    children: React.ReactNode;
}

const Block: React.FC<BlockProps> = ({ label, children }) => {
    const [isOpen, setIsOpen] = useState(true); // 控制是否收合

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="rounded-lg">
            <div className="flex items-center p-4 bg-gray-100">
                {/* 伸縮按鈕 */}
                <button
                    onClick={toggleOpen}
                    className="flex items-center justify-center w-6 h-6 mr-4 text-white bg-gray-600 rounded-full"
                >
                    {isOpen ? '-' : '+'}
                </button>
                {/* 標籤 */}
                <span className="font-semibold text-lg">{label}</span>
            </div>

            {/* 內容區塊，使用 opacity 和 visibility 來隱藏元素 */}
            <div
                className={
                    clsx(
                        "transition-all duration-300",
                        isOpen ? 'block opacity-100 visible' : 'none opacity-0 invisible'
                    )}
            >
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
};

export default Block;
