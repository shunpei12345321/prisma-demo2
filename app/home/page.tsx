export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
// import { getSupabaseSession } from "../lib/supabase-server";

import React from "react";
import HomeScreen from "../home/_components/HomeScreen";
import { UserRepository, User } from "../_repositories/User";

// export default async function HomePage() {
// 	const users: User[] = await UserRepository.findMany();
// 	return (
// 		<div>
// 			<HomeScreen users={users} />
// 		</div>
// 	);
// }

// export const dynamic = "force-dynamic";

// import { redirect } from "next/navigation";
// import { getSupabaseSession } from "@/lib/supabase-server";
// import HomeScreen from "../home/_components/HomeScreen";
// import { UserRepository, User } from "../_repositories/User";

export default async function HomePage() {
	// const session = await getSupabaseSession();

	// if (!session?.user) {
	// 	redirect("/signin");
	// }

	const users: User[] = await UserRepository.findMany();

	return (
		<div>
			<HomeScreen users={users} />
		</div>
	);
}
