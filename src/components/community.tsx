import { useEffect, useRef, useState } from "react";
import { Community, searchRemoteCommunity } from "../reddit/reddit";
import { CardAvatar, formatAmount } from "./users";

export function Communities({ q }: { q: string }) {
  const b = useRef(searchRemoteCommunity(q));
  const [rst, setRst] = useState<Community[]>([]);

  useEffect(() => {
    b.current.getBatch().then((v) => setRst((rst) => [...rst, ...v.data]));
  }, []);

  return (
    <div className="flex flex-col gap-1">
      {rst.map((r) => (
        <CommunityCard c={r} key={r.id} />
      ))}
    </div>
  );
}

function CommunityCard({ c }: { c: Community }) {
  return (
    <article className="flex bg-white shadow items-center p-4 gap-2 rounded">
      <div className="flex-shrink-0 ">
        <CardAvatar url={c.iconUrl ?? ""} />
      </div>
      <div className="truncate">
        <div>
          <h3 className="font-bold leading-4">
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
