"use client";
import Link from "next/link";
import { User } from "../../_repositories/User";
import styles from "./HomeScreen.module.css";
import { useState } from "react";

type Props = {
  users: User[];
};

export default function HomeScreen({ users }: Props) {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const handleDeleteUser = async (id: number) => {
    if (!confirm("このユーザーを削除してもよろしいですか？")) return;

    setDeletingId(id);
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      location.reload(); // ✅ 簡易：削除後に再読み込み
    } else {
      alert("削除に失敗しました");
      setDeletingId(null);
    }
  };
  return (
    <div className={styles.container}>
      <h2 className="text-xl font-bold mb-4">ユーザーリスト</h2>
      <Link href="/create" className="text-blue-500 underline mb-4 block">
        ＋ 新規ユーザー作成
      </Link>
      <table className={`table-auto ${styles.userTable}`}>
        <thead>
          <tr>
            <th className={styles.userId}>ユーザーID</th>
            <th className={styles.userName}>名前</th>
            <th className={styles.userEmail}>Email</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className={styles.userId}>
                <Link
                  href={`/edit/${user.id}`}
                  className="text-blue-500 underline"
                >
                  {user.id}
                </Link>
              </td>
              {/* <td className={styles.userId}>{user.id}</td> */}
              <td className={styles.userName}>{user.name}</td>
              <td className={styles.userEmail}>{user.email}</td>
              <td>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-500 hover:text-red-700 text-xl"
                  disabled={deletingId === user.id}
                  title="削除"
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
