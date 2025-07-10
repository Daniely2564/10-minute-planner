import { useRef } from "react";

export function cn(...inputs: (string | boolean | undefined | null)[]) {
  return inputs.filter(Boolean).join(" ");
}

export function debounceInputUpdate<T = unknown>(
  cb: (...args: T[]) => void,
  timeout = 500
) {
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  const trigger = (...args: T[]) => {
    if (timer.current) {
      timer.current = null;
    }

    timer.current = setTimeout(() => {
      cb(...args);
    }, timeout);
  };

  return trigger;
}
