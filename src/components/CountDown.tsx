import { useContext, useEffect, useState } from "react";
import { challengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/CountDown.module.css";

let countDownTimeout: NodeJS.Timeout;

export function CountDown() {
  const { startNewChallenge } = useContext(challengesContext)

  const [time, setTime] = useState(0.05 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minutoFirst, minuteSecond] = String(minutes)
    .padStart(2, "0")
    .split("");
  const [secondFirst, secondSecond] = String(seconds)
    .padStart(2, "0")
    .split("");

  function startCountDown() {
    setIsActive(true);
  }
  function resetCountDown() {
    clearTimeout(countDownTimeout);
    setIsActive(false);
    setTime(25 * 60);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time == 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

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
