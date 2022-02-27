import { useState } from "react";
import { PetName } from "./name/PetName";
import { PetImage } from "./image/PetImage";
import { PetIndicators } from "./controls/PetIndicators";

export const App = () => {
  const [canStartPlaying, setCanStartPlaying] = useState(false);

  return (
    <>
      <PetName setCanContinue={setCanStartPlaying} />
      {canStartPlaying && (
        <div>
          <PetImage />
          <PetIndicators />
        </div>
      )}
    </>
  );
};
