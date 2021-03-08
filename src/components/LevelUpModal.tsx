import { useContext } from 'react';
import { challengesContext } from '../contexts/ChallengesContext';

import styles from "../styles/components/LevelUpModal.module.css";

export function LevelUpModal(props) {
    
    const {level, closeLevelUpModal } = useContext(challengesContext);

    return (
    <div className={styles.overlay}>
      <div className={styles.container}>
          <header>{level}</header>
          <strong>Parabens</strong>
          <p>Voce alcançou um novo level</p>
          <button
           onClick={closeLevelUpModal}
           type="button">
              <img src="/icons/close.svg" alt="fechar modal"/>
          </button>
      </div>
    </div>
  );
}
