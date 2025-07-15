// lib/auth.ts
import prisma from "../lib/prisma";
import { getSupabaseSession } from "./supabase-server";

export const getOrCreateUser = async () => {
	const session = await getSupabaseSession();
	const supabaseUser = session?.user;

	if (!supabaseUser?.id || !supabaseUser.email) throw new Error("未ログイン");

	let user = await prisma.user.findUnique({
		where: { email: supabaseUser.email },
	});

	if (!user) {
		user = await prisma.user.create({
			data: {
				email: supabaseUser.email,
				name: supabaseUser.user_metadata?.name ?? null,
				// supabaseId: supabaseUser.id, // 任意で追加
			},
		});
	}

	return user;
};
