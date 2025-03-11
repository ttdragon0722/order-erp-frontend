"use client";

import { useState } from "react";
import { ManagerAuth } from "@/lib/managerAuth";
import { useRouter } from "next/navigation";

const ManagerLogoutBtn = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false); // 讀取狀態

    const handleLogout = async () => {
        if (loading) return; // 防止連續點擊
        setLoading(true);

        try {
            const result = await ManagerAuth.logout();

            if (result.success) {
                alert("登出成功！");
                router.refresh(); // 重新載入當前頁面，確保狀態更新
            } else {
                alert(`登出失敗: ${result.message || "請重試"}`);
            }
        } catch (error) {
            alert("登出時發生錯誤，請稍後再試！");
            console.error("登出錯誤:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={handleLogout}
            disabled={loading} // 防止多次點擊
        >
            {loading ? "登出中..." : "登出"}
        </button>
    );
};

export default ManagerLogoutBtn;
