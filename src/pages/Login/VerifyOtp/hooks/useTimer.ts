import { useState, useEffect } from "react";

export const useTimer = (initialSeconds: number) => {
  const [timer, setTimer] = useState(initialSeconds);

  useEffect(() => {
    if (timer <= 0) return;

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const resetTimer = () => setTimer(initialSeconds);

  return { timer, resetTimer };
};
