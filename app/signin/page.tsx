"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "../lib/supabase";

export default function SignInPage() {
	const supabase = createClient();
	const router = useRouter();
	const searchParams = useSearchParams();

	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	// ✅ Magic Link経由で来たときの処理（/?code=xxxx が含まれている）
	useEffect(() => {
		const urlHasCode = searchParams.has("code");

		if (urlHasCode) {
			const checkSession = async () => {
				// 1秒くらい待つと cookie が反映されやすい
				await new Promise((r) => setTimeout(r, 1000));

				const {
					data: { session },
				} = await supabase.auth.getSession();

				if (session?.user) {
					router.replace("/home");
				}
			};

			checkSession();
		}
	}, [searchParams, supabase, router]);

	const handleLogin = async () => {
		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				shouldCreateUser: true,
			},
		});

		if (error) {
			setMessage("エラーが発生しました");
		} else {
			setMessage("確認メールを送信しました。メールをご確認ください。");
		}
	};

	return (
		<div className="p-6">
			<h1 className="text-xl mb-4">メールでログイン</h1>
			<input
				type="email"
				placeholder="メールアドレスを入力"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="border px-4 py-2 mb-4 w-full rounded"
			/>
			<button
				onClick={handleLogin}
				className="bg-blue-600 text-white px-4 py-2 rounded w-full"
			>
				ログインリンクを送信
			</button>
			{message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
		</div>
	);
}

// "use client";

// import { useState } from "react";
// import { createClient } from "../lib/supabase";

// export default function SignInPage() {
// 	const supabase = createClient();
// 	const [email, setEmail] = useState("");
// 	const [message, setMessage] = useState("");

// 	const handleLogin = async () => {
// 		const { error } = await supabase.auth.signInWithOtp({
// 			email,
// 			options: {
// 				shouldCreateUser: true,
// 			},
// 		});

// 		if (error) {
// 			setMessage("エラーが発生しました");
// 		} else {
// 			setMessage("確認メールを送信しました。メールをご確認ください。");
// 		}
// 	};

// 	return (
// 		<div className="p-6">
// 			<h1 className="text-xl mb-4">メールでログイン</h1>
// 			<input
// 				type="email"
// 				placeholder="メールアドレスを入力"
// 				value={email}
// 				onChange={(e) => setEmail(e.target.value)}
// 				className="border px-4 py-2 mb-4 w-full rounded"
// 			/>
// 			<button
// 				onClick={handleLogin}
// 				className="bg-blue-600 text-white px-4 py-2 rounded w-full"
// 			>
// 				ログインリンクを送信
// 			</button>
// 			{message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
// 		</div>
// 	);
// }
