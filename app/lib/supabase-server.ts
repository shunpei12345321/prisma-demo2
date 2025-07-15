import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const getSupabaseSession = async () => {
	const cookieStore = await cookies(); // ✅ ここで await を使う！

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get: (name: string) => {
					const cookie = cookieStore.get(name);
					return cookie?.value;
				},
				set: () => {},
				remove: () => {},
			},
		}
	);

	const {
		data: { session },
	} = await supabase.auth.getSession();
	return session;
};

// export const getSupabaseSession = async () => {
// 	const supabase = createServerClient(
// 		process.env.NEXT_PUBLIC_SUPABASE_URL!,
// 		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
// 		{ cookies }
// 	);

// 	const {
// 		data: { session },
// 	} = await supabase.auth.getSession();
// 	return session;
// };
