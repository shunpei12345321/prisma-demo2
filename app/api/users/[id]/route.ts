export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { UserRepository } from "@/app/_repositories/User";
import prisma from "../../../lib/prisma";
// ユーザー取得（編集用）
// 動的ルーティングを使用して、ユーザーIDを取得

export async function GET(_req: NextRequest, context: any) {
  const id = Number(context.params.id);
  const user = await UserRepository.findUnique(id);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}

// export async function GET(
//   req: NextRequest,
//   context: { params: { id: string } }
// ) {
//   const id = Number(context.params.id);
//   const user = await UserRepository.findUnique(id);

//   if (!user) {
//     return NextResponse.json({ error: "User not found" }, { status: 404 });
//   }

//   return NextResponse.json(user);
// }

// ユーザー更新（PUT）
// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const id = Number(params.id);
//   const { name, email } = await req.json();

//   if (!name || !email) {
//     return NextResponse.json(
//       { error: "名前とメールが必要です" },
//       { status: 400 }
//     );
//   }

//   try {
//     const updated = await UserRepository.update(id, { name, email });
//     return NextResponse.json(updated, { status: 200 });
//   } catch (e) {
//     console.error(e);
//     return NextResponse.json({ error: "更新に失敗しました" }, { status: 500 });
//   }
// }

export async function PUT(req: NextRequest, context: any) {
  const id = Number(context.params.id);
  const { name, email } = await req.json();

  if (!name || !email) {
    return NextResponse.json(
      { error: "名前とメールが必要です" },
      { status: 400 }
    );
  }

  try {
    const updated = await UserRepository.update(id, { name, email });
    return NextResponse.json(updated, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "更新に失敗しました" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await prisma.user.delete({
      where: { id },
    });
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (e) {
    console.error("DELETE error:", e);
    return NextResponse.json({ error: "削除に失敗しました" }, { status: 500 });
  }
}
