import { useContext } from "react";
import { challengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/ExperienceBar.module.css";

export function ExperienceBar() {
  const { currentXp, expeirenceToNextLevel } = useContext(challengesContext);
  const percentToNextLevel =
    Math.round(currentXp * 100) / expeirenceToNextLevel;

  return (
    <header className={styles.xxxBar}>
      <span>0 xp</span>
      <div>
        <div
          className={styles.progressBar}
          style={{ width: `${percentToNextLevel}%` }}
        />
        <span
          className={styles.currentXp}
          style={{ left: `${percentToNextLevel}%` }}
        >
          {currentXp} XP
        </span>
      </div>
      <span>{expeirenceToNextLevel} xp</span>
    </header>
  );
}
