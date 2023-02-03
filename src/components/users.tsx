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
    <div>
      {users.map((u: User) => (
        <UserCard u={u} key={u.name} />
      ))}
    </div>
  );
}

export function UserCard({ u }: { u: User }) {
  return (
    <div className="flex">
      <div>
        <img className="w-10 h-10" src={u.iconUrl} alt="profile image" />
      </div>
      <div>
        <div>
          <h3>{u.name}</h3>
          <span>{u.karma}k Karma</span>
        </div>
      </div>
    </div>
  );
}
