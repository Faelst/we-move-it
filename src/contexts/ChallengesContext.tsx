import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie"
import challengesJson from "../../challenges.json";

interface ChallengesProvider {
  children: ReactNode;
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
}

export const challengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProvider) {
  const [level, setLevel] = useState(1);
  const [currentXp, setCurrentXp] = useState(0);
  const [challengesCompleted, setchallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const expeirenceToNextLevel = Math.pow((level+1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  function completeChallenge(){
    if (!activeChallenge) return;

    const { amount } = activeChallenge;
    let finalXp = currentXp + amount

    if (finalXp > expeirenceToNextLevel) {
      finalXp = finalXp - expeirenceToNextLevel
      levelUp();
    }

    setCurrentXp(finalXp)
    setActiveChallenge(null);
    setchallengesCompleted(challengesCompleted + 1)
  }

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIdex = Math.floor(
      Math.random() * challengesJson.length
    );
    const challege = challengesJson[randomChallengeIdex];

    setActiveChallenge(challege);

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted'){
      new Notification('Novo desafio 🏹',{
        body: `Valendo ${challege.amount}XP`
      })
    }
  }

  function resetChallenge(){
      setActiveChallenge(null)
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
        completeChallenge
      }}
    >
      {children}
    </challengesContext.Provider>
  );
}
