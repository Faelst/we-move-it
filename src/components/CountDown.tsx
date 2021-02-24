import styles from "../styles/components/CountDown.module.css";

export function CountDown() {
  return (
    <div>
      <div className={styles.containerCountDown}>
        <div>
          <span>2</span>
          <span>5</span>
        </div>
        <span>:</span>
        <div>
          <span>0</span>
          <span>0</span>
        </div>
      </div>

      <button type="button" className={styles.btnStartCountDown}>Iniciar cotador</button>
    </div>
  );
}
