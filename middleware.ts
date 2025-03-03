import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
	const token = req.cookies.get("auth_token")?.value;
	const { pathname } = req.nextUrl;

	// 🔹 若使用者進入 /manager，且已登入，則導向 /manager/dashboard
	if (pathname === "/manager" && token) {
		return NextResponse.redirect(new URL("/manager/dashboard", req.url));
	}

	// 🔹 若使用者進入 /manager/dashboard 或其子路徑，但未登入，則導向 /manager
	if (pathname.startsWith("/manager/dashboard") && !token) {
		return NextResponse.redirect(new URL("/manager", req.url));
	}

	return NextResponse.next(); // 其他請求放行
}

// 只攔截 /manager 及其子路徑
export const config = {
	matcher: ["/manager", "/manager/dashboard/:path*"],
};
