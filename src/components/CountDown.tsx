import { useContext, useEffect, useState } from "react";
import { challengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/CountDown.module.css";
import { CountdownContext } from "../contexts/CountdownContext";

export function CountDown() {
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountDown,
    resetCountDown
  } = useContext(CountdownContext);

  const [minutoFirst, minuteSecond] = String(minutes)
    .padStart(2, "0")
    .split("");
  const [secondFirst, secondSecond] = String(seconds)
    .padStart(2, "0")
    .split("");

  return (
    <div>
      <div className={styles.containerCountDown}>
        <div>
          <span>{minutoFirst}</span>
          <span>{minuteSecond}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondFirst}</span>
          <span>{secondSecond}</span>
        </div>
      </div>

      {hasFinished ? (
        <button
          disabled
          type="button"
          className={`${styles.btnStartCountDown}`}
        >
          Cliclo encerrado
        </button>
      ) : (
        <>
          {!isActive ? (
            <button
              onClick={startCountDown}
              type="button"
              className={`${styles.btnStartCountDown}`}
            >
              Iniciar cotador
            </button>
          ) : (
            <button
              onClick={resetCountDown}
              type="button"
              className={`${styles.btnStartCountDown} ${styles.btnStartCountDownActive}`}
            >
              Cancelar ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}
