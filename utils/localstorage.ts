export const localStorageUtil = {
	get: (key: string) => {
		if (typeof window === "undefined") return null;
		const value = localStorage.getItem(key);
		return value ? JSON.parse(value) : null;
	},

	set: (key: string, value: any) => {
		if (typeof window !== "undefined") {
			localStorage.setItem(key, JSON.stringify(value));
		}
	},

	remove: (key: string) => {
		if (typeof window !== "undefined") {
			localStorage.removeItem(key);
		}
	},

	clear: () => {
		if (typeof window !== "undefined") {
			localStorage.clear();
		}
	},
};

export const authUtil = {
	// ✅ 登入（存入 localStorage）
	login: (authToken: string) => {
		if (typeof window !== "undefined") {
			localStorage.setItem("auth_token", authToken);
		}
	},

	// ✅ 登出（清除 auth_token）
	logout: () => {
		if (typeof window !== "undefined") {
			localStorage.removeItem("auth_token");
		}
	},

	// ✅ 取得 auth_token
	getAuthToken: () => {
		if (typeof window === "undefined") return null;
		return localStorage.getItem("auth_token");
	},
};
