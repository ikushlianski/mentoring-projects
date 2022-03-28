import { useEffect, useState } from "react";
import { TIME_FROM_SICK_TO_DEATH_MS } from "./constants";

export const usePetIllness = () => {
  const [isSick, setIsSick] = useState(false);
  const [isDead, setIsDead] = useState(false);

  const treat = () => {
    setIsSick(false);
  };

  useEffect(() => {
    let interval;

    if (!isSick) {
      interval = setInterval(() => {
        const shouldGetSick = testIsSick();

        if (shouldGetSick) setIsSick(true);

        // todo remove magic number
      }, 300);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isSick]);

  useEffect(() => {
    let timer;

    if (isSick) {
      timer = setTimeout(() => {
        setIsDead(true);
      }, TIME_FROM_SICK_TO_DEATH_MS);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isSick]);

  return {
    isSick,
    isDead,
    treat,
  };
};

function testIsSick() {
  return Math.random() > 0.8;
}
