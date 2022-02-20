import { useState } from "react";
import { PetName } from "./name/PetName";
import { PetImage } from "./pet/PetImage";

export const App = () => {
  const [canContinue, setCanContinue] = useState(false);

  return (
    <>
      <PetName setCanContinue={setCanContinue} />
      {canContinue && <div>Here will be pet image and indicators!</div>}
      <PetImage />
      {/*<PetIndicators />*/}
    </>
  );
};
