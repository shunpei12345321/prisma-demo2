"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  userId: number;
};

export default function EditScreen({ userId }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/users/${userId}`);
      if (res.ok) {
        const user = await res.json();
        setName(user.name);
        setEmail(user.email);
      }
    };
    fetchUser();
  }, [userId]);

  const handleUpdateUser = async () => {
    const res = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    if (res.ok) {
      router.push("/home");
    } else {
      alert("更新に失敗しました");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">ユーザー編集</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mr-2"
      />
      <button
        onClick={handleUpdateUser}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        更新
      </button>
    </div>
  );
}
