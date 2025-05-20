"use client"
import { useEffect, useState } from "react";
import { Chip } from "./Chip";
import { usePostApi } from "@/hook/useApi";
import { Tag } from "@/lib/tags";
import { ColorIndex, ColorName, ColorSet, ColorIndexToName, ColorNameToIndex } from "@/config/colorSet"; // 引入顏色設定

export type SrcItem = {
    id: string;
    name: string;
    color: number;
};

type SourceTag = SrcItem;

type Props = {
    setTagData: React.Dispatch<React.SetStateAction<string[]>>;
    src: SrcItem[];
};

export const TagSearchInput = ({setTagData,src }: Props) => {
    const { postData: createTag } = usePostApi(Tag.add);

    const [tags, setTags] = useState<SourceTag[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState<number>(-1);
    const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
    const [newTagColor, setNewTagColor] = useState<ColorIndex>(ColorIndex.blue); // Default to blue color
    const [highlightColorIndex, setHighlightColorIndex] = useState<number>(0); // Track the highlighted color in the picker

    const filteredSuggestions = src.filter(
        (item) =>
            !tags.some((tag) => tag.id === item.id) &&
            (inputValue.trim() === "" || item.name.toLowerCase().includes(inputValue.toLowerCase()))
    );

    const addTag = (item: SourceTag) => {
        setTags([...tags, item]);
        setInputValue("");
        setHighlightIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightIndex((prev) => (prev + 1) % filteredSuggestions.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightIndex((prev) =>
                prev <= 0 ? filteredSuggestions.length - 1 : prev - 1
            );
        } else if (e.key === "Enter" && highlightIndex >= 0) {
            e.preventDefault();
            addTag(filteredSuggestions[highlightIndex]);
        } else if (e.key === "Enter" && inputValue.trim() !== "") {
            e.preventDefault();
            // Check if inputValue exists in src
            const existingTag = src.find((item) => item.name.toLowerCase() === inputValue.toLowerCase());

            if (existingTag) {
                addTag(existingTag);
            } else {
                // If inputValue doesn't exist in src, ask user to select a color
                setIsColorPickerVisible(true);
            }
        } else if ((e.key === " " || e.key === "\u3000") && inputValue.trim() !== "") {
            e.preventDefault();
            const match = filteredSuggestions[0];
            if (match) addTag(match);
        } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
            setTags(tags.slice(0, -1));
        }
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleColorSelect = (color: ColorIndex) => {
        setNewTagColor(color);
        setIsColorPickerVisible(false);
        createTag(
            [inputValue, color],
            (data) => {
                console.log("新增成功");
                tags.push(data as SrcItem);
                src.push(data as SourceTag);
            },
            (err) => {
                console.error(err);
            },
            () => {
                setInputValue("");
            }
        );
    };

    const handleColorKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowRight") {
            e.preventDefault();
            setHighlightColorIndex((prev) =>
                prev === Object.keys(ColorNameToIndex).length - 1 ? 0 : prev + 1
            );
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            setHighlightColorIndex((prev) =>
                prev <= 0 ? Object.keys(ColorNameToIndex).length - 1 : prev - 1
            );
        } else if (e.key === "Enter") {
            e.preventDefault();
            handleColorSelect(Object.values(ColorNameToIndex)[highlightColorIndex]);
        }
    };

    useEffect(() => {
        setTagData(tags.map(item => item.id));
    },[tags])

    return (
        <div className="relative my-1">
            <div className="flex flex-wrap gap-2 border border-gray-300 p-2 rounded-md">
                {tags.map((tag, index) => (
                    <Chip
                        key={tag.id}
                        value={tag.name}
                        color={tag.color}
                        onDel={() => removeTag(index)}
                    />
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        setHighlightIndex(-1); // reset selection when typing
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="輸入標籤"
                    className="outline-none border-none p-1 flex-grow min-w-[100px]"
                />
            </div>

            {isFocused && filteredSuggestions.length > 0 && (
                <ul
                    className="absolute bg-white border border-gray-300 mt-1 w-full max-h-40 overflow-y-auto rounded-md shadow z-50"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    {filteredSuggestions.map((item, index) => (
                        <li
                            key={item.id}
                            onClick={() => addTag(item)}
                            className={`p-2 cursor-pointer ${index === highlightIndex ? "bg-blue-100" : "hover:bg-gray-100"}`}
                        >
                            <span className={`text-${item.color}-600`}>{item.name}</span>
                        </li>
                    ))}
                </ul>
            )}

            {isColorPickerVisible && (
                <div
                    className="absolute bg-white border border-gray-300 mt-1 w-full max-h-40 overflow-y-auto rounded-md shadow z-50"
                    onKeyDown={handleColorKeyDown} // 設置鍵盤事件
                    tabIndex={0} // 讓該區域可以接收鍵盤事件
                >
                    <div className="p-2">請選擇顏色</div>
                    <div className="flex flex-wrap gap-2 p-2">
                        {Object.entries(ColorNameToIndex).map(([colorName, colorIndex], index) => (
                            <div
                                key={colorIndex}
                                onClick={() => handleColorSelect(colorIndex)} // 選擇顏色
                                className={`w-8 h-8 rounded-full cursor-pointer ${ColorSet[colorName as ColorName]} ${highlightColorIndex === index ? "border-4 border-black" : ""}`}
                            >
                                <span className="sr-only">{colorName}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
