"use client";
import { User } from "../../_repositories/User";
import styles from "./HomeScreen.module.css";

type Props = {
  users: User[];
};

export default function HomeScreen({ users }: Props) {
  return (
    <div className={styles.container}>
      <h2 className="text-xl font-bold mb-4">ユーザーリスト</h2>
      <table className={`table-auto ${styles.userTable}`}>
        <thead>
          <tr>
            <th className={styles.userId}>ユーザーID</th>
            <th className={styles.userName}>名前</th>
            <th className={styles.userEmail}>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className={styles.userId}>{user.id}</td>
              <td className={styles.userName}>{user.name}</td>
              <td className={styles.userEmail}>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
