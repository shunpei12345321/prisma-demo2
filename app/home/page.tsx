// home pages

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase";
import HomeScreen from "./_components/HomeScreen";
import { User } from "../_repositories/User";

export default function HomePage() {
	const router = useRouter();
	const supabase = createClient();
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const init = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (!session?.user) {
				router.replace("/signin");
				return;
			}

			const res = await fetch("/api/users", {
				headers: {
					Authorization: `Bearer ${session.access_token}`,
				},
			});

			if (res.ok) {
				const data = await res.json();
				setUsers(data);
			} else {
				alert("ユーザーの取得に失敗しました");
			}
			setLoading(false);
		};

		init();
	}, []);

	if (loading) return <div>読み込み中...</div>;

	return <HomeScreen users={users} />;
}

// export const dynamic = "force-dynamic";

// import { redirect } from "next/navigation";
// import { getSupabaseSession } from "../lib/supabase-server";
// // ここで復活させた

// import React from "react";
// import HomeScreen from "../home/_components/HomeScreen";
// import { UserRepository, User } from "../_repositories/User";

// // export default async function HomePage() {
// // 	const users: User[] = await UserRepository.findMany();
// // 	return (
// // 		<div>
// // 			<HomeScreen users={users} />
// // 		</div>
// // 	);
// // }

// // export const dynamic = "force-dynamic";

// // import { redirect } from "next/navigation";
// // import { getSupabaseSession } from "@/lib/supabase-server";
// // import HomeScreen from "../home/_components/HomeScreen";
// // import { UserRepository, User } from "../_repositories/User";

// export default async function HomePage() {
// 	const session = await getSupabaseSession();

// 	if (!session?.user) {
// 		redirect("/signin");
// 	}
// 	// ここのコメントアウトもauth関連

// 	const users: User[] = await UserRepository.findMany();

// 	return (
// 		<div>
// 			{/* <HomeScreen users={users} /> */}
// 			{/* ここのuserをとるとデプロイできなくなるかも */}
// 			<HomeScreen />
// 		</div>
// 	);
// }
