import { useEffect, useState } from "react";
import { getCountdown } from "../utils/date";

export function useCountdown(targetAt: string) {
  const [state, setState] = useState(() => getCountdown(targetAt));

  useEffect(() => {
    const tick = () => setState(getCountdown(targetAt));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetAt]);

  return state;
}
