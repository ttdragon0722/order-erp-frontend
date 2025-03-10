"use client";
import { useEffect } from "react";

const useKey = (func: () => void) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key.toLowerCase() === "b") {
                event.preventDefault(); // 阻止預設行為（開啟書籤）
                func(); // 執行傳入的函式
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [func]); // 確保 func 變更時重新綁定事件
};

export default useKey;
