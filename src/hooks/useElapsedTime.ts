import { useEffect, useState } from "react";
import { getElapsed, type Elapsed } from "../utils/date";

export function useElapsedTime(startedAt: string): Elapsed {
  const [elapsed, setElapsed] = useState<Elapsed>(() => getElapsed(startedAt));

  useEffect(() => {
    const tick = () => setElapsed(getElapsed(startedAt));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startedAt]);

  return elapsed;
}
