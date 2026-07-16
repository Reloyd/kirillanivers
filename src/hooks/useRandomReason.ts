import { useCallback, useRef, useState } from "react";

export function useRandomReason(reasons: string[]) {
  const [index, setIndex] = useState<number | null>(null);
  const lastIndex = useRef<number | null>(null);

  const pick = useCallback(() => {
    if (reasons.length === 0) return;
    if (reasons.length === 1) {
      setIndex(0);
      return;
    }
    let next = Math.floor(Math.random() * reasons.length);
    while (next === lastIndex.current) {
      next = Math.floor(Math.random() * reasons.length);
    }
    lastIndex.current = next;
    setIndex(next);
  }, [reasons]);

  return {
    reason: index === null ? null : reasons[index],
    pick,
  };
}
