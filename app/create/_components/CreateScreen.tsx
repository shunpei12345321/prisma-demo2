"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleCreateUser = async () => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    if (res.ok) {
      router.push("/home");
    } else {
      alert("ユーザー作成に失敗しました");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">ユーザー作成</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleCreateUser}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          作成
        </button>
      </div>
    </div>
  );
}
