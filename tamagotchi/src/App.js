import { useState } from "react";
import { PetName } from "./name/PetName";
import { PetImage } from "./image/PetImage";
import { PetIndicators } from "./controls/PetIndicators";

export const App = () => {
  const [canContinue, setCanContinue] = useState(false);

  return (
    <>
      <PetName setCanContinue={setCanContinue} />
      {canContinue && (
        <div>
          <PetImage />
          <PetIndicators />
        </div>
      )}
    </>
  );
};
