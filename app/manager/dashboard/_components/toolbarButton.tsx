"use client";

import { FC } from "react";
import { useToolbar } from "../_context/ToolbarContext";
import { AiOutlineAlignLeft, AiOutlineDoubleLeft } from "react-icons/ai";
import clsx from "clsx"; // 簡化 className 組合

// 定義 Icons 物件
const Icons = {
    close: <AiOutlineDoubleLeft className="text-xl" />,
    open: <AiOutlineAlignLeft className="text-xl" />
};

// 定義按鈕動作類型
type ToolbarAction = "toggle" | "open" | "close";

// 定義 props 類型
interface ToolbarButtonProp {
    className?: string;
    icon: keyof typeof Icons;
    action: ToolbarAction;
    onClick?: () => void;
    hoverColor?: string; // 新增 hover 顏色
}

const ToolbarButton: FC<ToolbarButtonProp> = ({ className, icon, action = "toggle", onClick, hoverColor }) => {
    const { toggleToolbar, openToolbar, closeToolbar } = useToolbar();

    const handleClick = () => {
        if (action === "toggle") toggleToolbar();
        if (action === "open") openToolbar();
        if (action === "close") closeToolbar();

        if (onClick) onClick();
    };

    return (
        <button
            onClick={handleClick}
            className={clsx(
                "p-2 rounded transition group", // 使用 group 來讓內部元素也能受 hover 影響
                hoverColor ? `hover:${hoverColor}` : "hover:bg-gray-700", // 動態 hover 顏色
                className
            )}
        >
            {Icons[icon]}
        </button>
    );
};

export default ToolbarButton;
