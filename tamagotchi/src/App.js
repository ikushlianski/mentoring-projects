import { createContext, useState } from "react";
import { PetName } from "./name/PetName";
import { PetImage } from "./image/PetImage";
import { PetIndicators } from "./controls/PetIndicators";
import { useSavePetName } from "./name/useSavePetName";

export const PetNameContext = createContext("");

export const App = () => {
  const [canStartPlaying, setCanStartPlaying] = useState(false);

  const { savePetName, savedPetName, isNameValid } = useSavePetName();

  return (
    <PetNameContext.Provider value={savedPetName}>
      <>
        <PetName
          petName={savedPetName}
          setCanContinue={setCanStartPlaying}
          savePetName={savePetName}
          isNameValid={isNameValid}
        />
        {canStartPlaying && (
          <div>
            <PetImage />
            <PetIndicators />
          </div>
        )}
      </>
    </PetNameContext.Provider>
  );
};
