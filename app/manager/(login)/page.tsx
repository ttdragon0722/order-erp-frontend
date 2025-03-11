"use client";

import FillImage, { EObjectFit } from "@/components/ui/FillImage";
import { usePostApi } from "@/hook/useApi";
import { ManagerAuth } from "@/lib/managerAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
    const router = useRouter();
    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");

    const { postData: loginFunc } = usePostApi(ManagerAuth.login);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        loginFunc([userID, password],
            () => {
                router.push("/manager/dashboard");
            },
            (err) => {
                alert("登入失敗：" + err);
            }
        )

    };

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex max-md:flex-col w-7/8 h-7/8 rounded-2xl bg-gray-100 shadow-lg overflow-hidden">
            <FillImage
                objectFit={EObjectFit.Cover}
                imageClass="w-full h-full object-center"
                className="w-1/2 h-full max-md:w-full max-md:h-[40%]"
                src="/order-erp.webp"
                alt="site-img"
            />
            <div className="w-1/2 max-md:w-full bg-white px-16 h-full flex items-center justify-center">
                <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col">
                    <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">系統登入</h2>

                    {/* 帳號輸入框 */}
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2">帳號</label>
                        <input
                            required
                            type="text"
                            placeholder="請輸入您的 id"
                            value={userID} // 綁定 useState
                            onChange={(e) => setUserID(e.target.value)} // 更新狀態
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                    </div>

                    {/* 密碼輸入框 */}
                    <div className="mb-6">
                        <label className="block text-gray-600 text-sm font-medium mb-2">密碼</label>
                        <input
                            required
                            type="password"
                            placeholder="請輸入您的密碼"
                            value={password} // 綁定 useState
                            onChange={(e) => setPassword(e.target.value)} // 更新狀態
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                    </div>

                    {/* 登入按鈕 */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-200"
                    >
                        登入
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
