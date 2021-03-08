import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import challengesJson from "../../challenges.json";
import { LevelUpModal } from "../components/LevelUpModal";

interface ChallengesProvider {
  children: ReactNode;
  level: number;
  currentXp: number;
  challengesCompleted: number;
}

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  expeirenceToNextLevel: number;
  currentXp: number;
  challengesCompleted: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  activeChallenge: Challenge;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

export const challengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProvider) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentXp, setCurrentXp] = useState(rest.currentXp ?? 0);
  const [challengesCompleted, setchallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  );
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const expeirenceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentXp", String(currentXp));
    Cookies.set("challengesCompleted", String(challengesCompleted));
  }, [level, currentXp, challengesCompleted]);

  function completeChallenge() {
    if (!activeChallenge) return;

    const { amount } = activeChallenge;
    let finalXp = currentXp + amount;

    if (finalXp > expeirenceToNextLevel) {
      finalXp = finalXp - expeirenceToNextLevel;
      levelUp();
    }

    setCurrentXp(finalXp);
    setActiveChallenge(null);
    setchallengesCompleted(challengesCompleted + 1);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function startNewChallenge() {
    const randomChallengeIdex = Math.floor(
      Math.random() * challengesJson.length
    );
    const challege = challengesJson[randomChallengeIdex];

    setActiveChallenge(challege);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio 🏹", {
        body: `Valendo ${challege.amount}XP`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  return (
    <challengesContext.Provider
      value={{
        level,
        levelUp,
        expeirenceToNextLevel,
        currentXp,
        challengesCompleted,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal
      }}
    >
      {children}

      {isLevelUpModalOpen && (
        <LevelUpModal />
      )}
    </challengesContext.Provider>
  );
}
