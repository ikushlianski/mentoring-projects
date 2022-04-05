import { useContext, useEffect, useState } from "react";
import {
  HOW_OFTEN_TO_CHECK_SICKNESS_MS,
  TIME_FROM_SICK_TO_DEATH_MS,
} from "./constants";
import { pickRandomIllness } from "./pickRandomIllness";
import { IllnessesContext } from "../App";

export const usePetIllness = (isDead) => {
  const [isSick, setIsSick] = useState(false);
  const [diedFromIllness, setDiedFromIllness] = useState(false);
  const [illness, setIllness] = useState(null);

  const illnessListString = useContext(IllnessesContext);

  const treat = () => {
    setIsSick(false);
    setIllness(null);
  };

  useEffect(() => {
    let interval;

    if (isDead) return;

    if (!isSick) {
      interval = setInterval(() => {
        console.log("testing for illness");
        const shouldGetSick = testIsSick();

        if (shouldGetSick) {
          setIsSick(true);
          setIllness(pickRandomIllness(illnessListString));
        }
      }, HOW_OFTEN_TO_CHECK_SICKNESS_MS);
    }

    return () => {
      clearInterval(interval);
    };
  }, [illnessListString, isDead, isSick]);

  useEffect(() => {
    let timer;

    if (isSick) {
      timer = setTimeout(() => {
        setDiedFromIllness(true);
      }, TIME_FROM_SICK_TO_DEATH_MS);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isSick]);

  return {
    illness,
    isSick,
    diedFromIllness,
    treat,
  };
};

function testIsSick() {
  return Math.random() > 0.8;
}
