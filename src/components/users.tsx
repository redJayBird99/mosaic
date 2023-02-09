import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { searchRemoteUser, User } from "../reddit/reddit";
import { LoadingWindow } from "./posts";
import { useRedditApi } from "./use-reddit";

export function Users({ q }: { q: string }) {
  // every time the query change this component rebuilds from scratch
  const [uBatcher] = useState(() => searchRemoteUser(q));
  const [state, fetchUsers] = useRedditApi(uBatcher);
  const obsRef = useRef(
    new IntersectionObserver((es) => {
      console.log(es);
      es.forEach((e) => e.isIntersecting && fetchUsers());
    })
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="grid auto-fit-20rem gap-1">
      {state.c.map((u: User) => (
        <UserCard u={u} key={u.name} />
      ))}
      {state.end ? null : <UserTail key={Math.random()} obs={obsRef.current} />}
      {state.loading && <LoadingWindow />}
    </div>
  );
}

export function UserCard({ u }: { u: User }) {
  const removeAnimation = (e: HTMLImageElement) =>
    e?.classList.remove("skeleton-animate");

  return (
    <div className="flex bg-white shadow items-center p-4 gap-2 rounded">
      <div>
        <img
          className="skeleton-animate w-12 h-12 rounded-full"
          src={u.iconUrl}
          alt="avatar"
          height="48"
          width="48"
          onLoad={(e) => removeAnimation(e.target as HTMLImageElement)}
          onError={(e) => removeAnimation(e.target as HTMLImageElement)}
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
  if (Math.abs(karma) < 1000) {
    return String(karma);
  } else if (Math.abs(karma) < 1_000_000) {
    return (karma / 1000).toFixed(2) + "k";
  } else {
    return (karma / 1_000_000).toFixed(2) + "m";
  }
}

export function SkeletonCard() {
  return (
    <div className="flex bg-white shadow items-center p-4 gap-2 rounded max-w-md">
      <div>
        <div className="skeleton-animate w-12 h-12 rounded-full" />
      </div>
      <div className="flex-grow">
        <div className="truncate">
          <div className="h-3 leading-4 skeleton-animate rounded-md w-1/2 mb-3" />
          <div className="h-2 skeleton-animate w-1/4 rounded-md" />
        </div>
      </div>
    </div>
  );
}

/** every time this element connects add itself to the observer,
 * tail of all users so when the bottom is reached fetch new ones*/
function UserTail({ obs }: { obs: IntersectionObserver }) {
  const ref = useRef<HTMLDivElement>(null);

  // useEffect runs asynchronously so when cleaning up the reference to divRef.current
  // won't exist, so we need to go synchronously using useLayoutEffect
  useLayoutEffect(() => {
    obs.observe(ref.current!);
    return () => obs.unobserve(ref.current!);
  }, [obs]);

  return (
    <div ref={ref}>
      <SkeletonCard />
    </div>
  );
}
