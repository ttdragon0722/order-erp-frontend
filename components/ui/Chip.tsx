"use client"
import clsx from "clsx";
import { FC, useState } from "react";

const ColorSet = {
    blue: "bg-blue-600 text-white",
    red: "bg-red-600 text-white",
    green: "bg-green-600 text-white",
    amber: "bg-amber-400 text-slate-800",
    pink: "bg-pink-600 text-white",
    indigo: "bg-indigo-600 text-white",
    purple: "bg-purple-600 text-white",
    teal: "bg-teal-600 text-white",
    cyan: "bg-cyan-600 text-white",
} as const;

type ColorName = keyof typeof ColorSet;


interface DelBtnProps {
    onClick?: () => void; // 可選的點擊事件
}
const DelBtn: FC<DelBtnProps> = ({ onClick }) => {
    return (
        <button
            className="flex items-center justify-center transition-all rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-0 right-0.5 h-full"
            type="button"
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4"
            >
                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
            </svg>
        </button>
    );
};


interface ChipProp {
    value: string;
    color?: ColorName;
    onDel?: () => void;
}

export const Chip: FC<ChipProp> = ({ value, color = "blue", onDel }) => {

    return (
        <div className={clsx(
            "relative rounded-md py-0.5 px-2.5 border border-transparent text-sm transition-all shadow-sm flex items-center",
            ColorSet[color],
            onDel && "pr-8"
        )}>
            {value}
            {onDel &&
                <DelBtn onClick={onDel} />
            }
        </div>
    );
};

export const TagInput = () => {
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === " " || e.key === "\u3000" || e.key === "Enter") && inputValue.trim() !== "") {
            // 按 "半形空格"、"全形空格" 或 "Enter" 並且輸入內容不為空，則新增 Chip
            e.preventDefault();
            setTags([...tags, inputValue.trim()]);
            setInputValue(""); // 清空輸入框
        } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
            // 按 Backspace 且輸入框為空時，刪除最後一個 Tag
            setTags(tags.slice(0, -1));
        }
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-wrap gap-2 border border-gray-300 p-2 rounded-md">
            {tags.map((tag, index) => (
                <Chip key={index} value={tag} color="blue" onDel={() => removeTag(index)} />
            ))}
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="輸入後按空格或 Enter 新增，Backspace 刪除"
                className="outline-none border-none p-1 flex-grow min-w-[100px]"
            />
        </div>
    );
};
