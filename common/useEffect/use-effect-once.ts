import { User } from "@/types/auth/auth";
import { useEffect, useRef, EffectCallback } from "react";

export default function useEffectOnce(effect: EffectCallback, p0: (User | null)[]): void {
  const effectRef = useRef(effect);
  const destroyRef = useRef<void | (() => void) | undefined>(undefined);
  const effectCalled = useRef(false);
  const rendered = useRef(false);

  if (effectCalled.current) {
    rendered.current = true;
  }

  useEffect(() => {
    if (!effectCalled.current) {
      destroyRef.current = effectRef.current();
      effectCalled.current = true;
    }

    return () => {
      if (rendered.current === false) return;
      if (destroyRef.current) destroyRef.current();
    };
  }, []);
}
