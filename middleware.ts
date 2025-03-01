import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
	const token = req.cookies.get("auth_token")?.value;

	// 檢查是否進入 /manager，但不是 /manager/login
	if (
		req.nextUrl.pathname.startsWith("/manager") &&
		req.nextUrl.pathname !== "/manager/login"
	) {
		return NextResponse.redirect(new URL("/manager/login", req.url));
	}

	// 🔹 若使用者嘗試進入 /manager，但沒有 token，則跳轉到登入頁
    // if (req.nextUrl.pathname.startsWith("/manager") && !token) {
    //     return NextResponse.redirect(new URL("/manager/login", req.url));
    // }

	return NextResponse.next(); // 其他請求放行
}

// 只攔截 /manager 及其子路徑
export const config = {
	matcher: ["/manager/:path*"],
};
