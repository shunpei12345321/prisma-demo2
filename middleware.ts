// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const url = new URL(request.url);

	// 認証コードを含んでいたら /auth/callback にリダイレクト
	if (url.pathname === "/" && url.searchParams.has("code")) {
		return NextResponse.redirect(
			new URL(`/auth/callback${url.search}`, request.url)
		);
	}

	return NextResponse.next();
}

// middlewareを有効にするルート
export const config = {
	matcher: ["/", "/home"],
};
