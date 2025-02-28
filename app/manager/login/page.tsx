"use client";

import { useState } from "react";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login with:", { username, password });
        // 這裡可以呼叫 API 來驗證登入
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md bg-white/75 p-6 rounded-lg shadow-lg">
                <h2 className="text-gray-900 text-2xl font-bold mb-4 text-center">登入</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="text-gray-700 block mb-1">帳號</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 bg-gray-100 text-gray-900 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 block mb-1">密碼</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 bg-gray-100 text-gray-900 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                    >
                        登入
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
