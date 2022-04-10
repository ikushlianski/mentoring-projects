import { createContext, useEffect, useState } from "react";
import { PetName } from "./name/PetName";
import { PetImage } from "./image/PetImage";
import { PetIndicators } from "./controls/PetIndicators";
import { useSavePetName } from "./name/useSavePetName";
import { createIllnessContext } from "./illness/illnessContext";
import { DEFAULT_NAME } from "./name/constants";

export const GameOverContext = createContext(null);
export const PetNameContext = createContext("");
export const IllnessesContext = createIllnessContext();

export const App = () => {
  const [canStartPlaying, setCanStartPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameCount, setGameCount] = useState(0);

  const { savePetName, savedPetName, isNameValid } = useSavePetName();

  const restartGame = () => {
    setCanStartPlaying(false);
    setGameCount((prev) => prev + 1);
    savePetName(DEFAULT_NAME);
    setGameOver(false);
  };

  useEffect(restartGame, [gameOver, savePetName]);

  return (
    <GameOverContext.Provider value={setGameOver}>
      <IllnessesContext.Provider value={process.env.REACT_APP_ILLNESSES}>
        <PetNameContext.Provider value={savedPetName}>
          <PetName
            petName={savedPetName}
            setCanContinue={setCanStartPlaying}
            savePetName={savePetName}
            isNameValid={isNameValid}
          />
          {canStartPlaying && (
            // remount all components, drop their state
            <div key={gameCount}>
              <PetImage />
              <PetIndicators />
            </div>
          )}
        </PetNameContext.Provider>
      </IllnessesContext.Provider>
    </GameOverContext.Provider>
  );
};
