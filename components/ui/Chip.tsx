"use client"
import clsx from "clsx";
import { FC, ReactNode, useState } from "react";

export const ColorSet = {
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
    color?: ColorName | number; // ← 這裡讓 color 可以是 ColorName 也可以是數字
    onDel?: () => void;
}

export const Chip: FC<ChipProp> = ({ value, color = "blue", onDel }) => {
    const colorKeys = Object.keys(ColorSet) as ColorName[]; // 取得所有顏色 key 的陣列
    let realColor: ColorName = "blue"; // 預設是藍色

    if (typeof color === "number") {
        realColor = colorKeys[color % colorKeys.length]; // 數字的話，找對應的顏色，超出就取餘數
    } else {
        realColor = color;
    }

    return (
        <div className={clsx(
            "relative rounded-md py-0.5 px-2.5 border border-transparent text-sm transition-all shadow-sm flex items-center cursor-default",
            ColorSet[realColor],
            onDel && "pr-8"
        )}>
            {value}
            {onDel &&
                <DelBtn onClick={onDel} />
            }
        </div>
    );
};

interface EventProp {
    value: string;
    color?: ColorName | number;
    icon?: ReactNode;
}

export const Event: FC<EventProp> = ({ value, color = "blue", icon }) => {
    const colorKeys = Object.keys(ColorSet) as ColorName[];
    let realColor: ColorName = "blue";

    if (typeof color === "number") {
        realColor = colorKeys[color % colorKeys.length];
    } else {
        realColor = color;
    }

    return (
        <div className={clsx(
            "relative rounded-md py-3 font-bold px-4 border border-transparent text-sm transition-all shadow-sm flex items-center gap-2 cursor-default",
            ColorSet[realColor]
        )}>
            {icon && <span className="flex-shrink-0">{icon}</span>}
            <span>{value}</span>
        </div>
    );
};

type TagInputProps = {
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
};

export const TagInput = ({ tags, setTags }: TagInputProps) => {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === " " || e.key === "\u3000" || e.key === "Enter") && inputValue.trim() !== "") {
            e.preventDefault();
            setTags([...tags, inputValue.trim()]);
            setInputValue("");
        } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
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
