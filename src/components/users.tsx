import { useEffect, useState } from "react";
import { remoteUser, User } from "../reddit/reddit";

export function Users({ q }: { q: string }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await remoteUser(q);
      setUsers(res);
    };
    getUsers();
  }, []);

  return (
    <div className="grid auto-fit-20rem gap-1">
      {users.map((u: User) => (
        <UserCard u={u} key={u.name} />
      ))}
    </div>
  );
}

export function UserCard({ u }: { u: User }) {
  return (
    <div className="flex bg-white shadow items-center p-4 gap-2 rounded">
      <div>
        <img
          className="w-12 h-12 rounded-full"
          src={u.iconUrl}
          alt="profile image"
        />
      </div>
      <div>
        <div className="truncate">
          <h3 className="font-bold leading-4">{u.name}</h3>
          <span className="text-xs text-onBg-600">
            {formatKarma(u.karma)} karma
          </span>
        </div>
      </div>
    </div>
  );
}

function formatKarma(karma: number): string {
  if (karma < 1000) {
    return String(karma);
  } else if (karma < 1_000_000) {
    return (karma / 1000).toFixed(2) + "k";
  } else {
    return (karma / 1_000_000).toFixed(2) + "m";
  }
}
