"use client";

import { createContext, useContext, useEffect, useState } from "react";

// 定義 Toolbar Context 類型
interface ToolbarContextType {
    isOpen: boolean;
    openToolbar: () => void;
    closeToolbar: () => void;
    toggleToolbar: () => void;
}

// 建立 Context
const ToolbarContext = createContext<ToolbarContextType | undefined>(undefined);

// Provider：包住它後，所有子元件都能存取 Toolbar 狀態
export function ToolbarProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const savedState = localStorage.getItem("toolbar-is-open");
        if (savedState !== null) {
            setIsOpen(savedState === "true");
        }
    }, []);

    // 當 isOpen 變化時，儲存到 localStorage
    useEffect(() => {
        localStorage.setItem("toolbar-is-open", String(isOpen));
    }, [isOpen]);

    return (
        <ToolbarContext.Provider
            value={{
                isOpen,
                openToolbar: () => setIsOpen(true),
                closeToolbar: () => setIsOpen(false),
                toggleToolbar: () => setIsOpen((prev) => !prev),
            }}
        >
            {children}
        </ToolbarContext.Provider>
    );
}

// 自訂 Hook 讓元件能存取 Toolbar 狀態
export function useToolbar() {
    const context = useContext(ToolbarContext);
    if (!context) {
        throw new Error("useToolbar 必須在 ToolbarProvider 內使用！");
    }
    return context;
}
