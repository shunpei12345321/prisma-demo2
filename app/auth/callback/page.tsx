"use client";

// middle of the file middlewareがないので
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase";

export default function AuthCallbackPage() {
	const router = useRouter();
	const supabase = createClient();

	useEffect(() => {
		const exchangeCode = async () => {
			const params = new URLSearchParams(window.location.search);
			const authCode = params.get("code");
			if (!authCode) {
				console.error("認証コードが見つかりません");
				router.replace("/signin");
				return;
			}
			const { error } = await supabase.auth.exchangeCodeForSession(authCode);
			if (error) {
				console.error("セッション交換失敗:", error.message);
				router.replace("/signin");
			} else {
				router.replace("/home");
			}
		};

		exchangeCode();
	}, []);

	return <p>ログイン処理中...</p>;
}
