'use client'

import clsx from 'clsx';
import { useRouter, usePathname } from 'next/navigation';
import { JSX } from 'react';
import { RouteType } from '../EditTable';

interface LinkProps {
    /**
     * 欲跳轉的路徑（僅填寫附加部分，不需包含目前 pathname，例如："/edit" 或 "details"）
     */
    route: string;

    /**
     * 按鈕上顯示的文字
     */
    text: string;

    /**
     * 可選的 CSS 類別名稱，用於自訂按鈕樣式
     */
    className?: string;

    /**
     * 導向類型："link" 為畫面跳轉，"api" 則為不跳轉（預設為 "link"）
     */
    type?: RouteType;

    onClick?: (route: string) => void
}

/**
 * 表格操作用的動態導向元件。
 * 
 * 根據當前頁面的路徑（pathname）拼接上指定的 `route`，點擊後導向對應頁面。
 * 常見用於資料表格中的「編輯」、「查看」、「刪除」等操作按鈕。
 * 
 * @component
 * @param {LinkProps} props - 元件屬性
 * @returns {JSX.Element} 點擊可導向的新頁面按鈕
 */
const Link = ({ route, text, className, type = 'link', onClick }: LinkProps): JSX.Element => {
    const router = useRouter();
    const pathname = usePathname();

    // 根據 type 決定是否拼接 pathname
    const fullRoute = type === 'api'
        ? route
        : pathname.endsWith('/')
            ? `${pathname}${route.replace(/^\//, '')}`
            : `${pathname}/${route.replace(/^\//, '')}`;

    const handleClick = () => {
        if (onClick) {
            return onClick(route)
        }
        router.push(fullRoute);
    };

    return (
        <button
            onClick={handleClick}
            title={fullRoute}
            className={clsx(className, "bg-blue-500 text-white rounded-lg px-2 py-1 cursor-pointer")}
        >
            {text}
        </button>
    );
};

export default Link;
