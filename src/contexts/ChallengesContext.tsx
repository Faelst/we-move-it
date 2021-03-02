import { createContext, ReactNode, useState } from "react";
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
}

export const challengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProvider) {
  const [level, setLevel] = useState(0);
  const [currentXp, setCurrentXp] = useState(15);
  const [challengesCompleted, setchallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const expeirenceToNextLevel = Math.pow((level+1) * 4, 2)

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIdex = Math.floor(
      Math.random() * challengesJson.length
    );
    const challege = challengesJson[randomChallengeIdex];

    setActiveChallenge(challege);
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
        resetChallenge
      }}
    >
      {children}
    </challengesContext.Provider>
  );
}
