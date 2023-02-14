import { useEffect, useState } from "react";
import { Community, searchRemoteCommunity } from "../reddit/reddit";
import { ErrorWarning, LoadingWindow, UnsuccessfulSearch } from "./posts";
import { useRedditApi } from "./use-reddit";
import { CardAvatar, formatAmount, TailCard } from "./users";

export function Communities({ q }: { q: string }) {
  const [cBatcher] = useState(() => searchRemoteCommunity(q));
  const [state, fetchCommunities] = useRedditApi(cBatcher);
  const obs = new IntersectionObserver((es) => {
    es.forEach((e) => e.isIntersecting && fetchCommunities());
  });

  useEffect(() => {
    fetchCommunities();
  }, []);

  if (state.error) {
    return <ErrorWarning />;
  } else if (state.end && state.c.length === 0) {
    return <UnsuccessfulSearch q={q} />;
  } else {
    return (
      <div className="flex flex-col gap-1">
        {state.c.map((r) => (
          <CommunityCard c={r} key={r.id} />
        ))}
        {state.end ? null : (
          <TailCard key={Math.random()} type="community" obs={obs} />
        )}
        {state.loading && <LoadingWindow />}
      </div>
    );
  }
}

function CommunityCard({ c }: { c: Community }) {
  return (
    <article className="flex bg-white shadow items-center p-4 gap-2 rounded">
      <div className="flex-shrink-0 ">
        <CardAvatar url={c.iconUrl ?? ""} />
      </div>
      <div className="truncate">
        <div>
          <h3 className="font-bold">
            {c.name}{" "}
            <span className="text-xs text-onBg-600 font-light">
              . {formatAmount(c.subscribers)} Members
            </span>
          </h3>
          <p className="text-xs text-onBg-600 font-light">{c.description}</p>
        </div>
      </div>
    </article>
  );
}
