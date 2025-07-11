// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma  from "../../lib/prisma"; // こちらもエイリアス or 相対パスに注意

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("GET /api/users error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "名前とメールが必要です" }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: { name, email },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("POST /api/users error:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}



// app/api/users/route.ts
// import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../lib/prisma";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "GET") {
//     try {
//       const users = await prisma.user.findMany();
//       res.status(200).json(users);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Failed to fetch users" });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// }

