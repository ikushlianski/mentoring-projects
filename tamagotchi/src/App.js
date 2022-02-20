import { useState } from "react";
import { PetName } from "./name/PetName";

export const App = () => {
  const [canContinue, setCanContinue] = useState(false);

  return (
    <>
      <PetName setCanContinue={setCanContinue} />
      {canContinue && <div>Here will be pet image and indicators!</div>}
      {/*<PetImage />*/}
      {/*<PetIndicators />*/}
    </>
  );
};
