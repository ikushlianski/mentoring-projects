export function checkIllnessesConfig() {
  const illnesses = process.env.REACT_APP_ILLNESSES;

  if (!illnesses) throw new Error("No illnesses provided! Stopping the app...");
}
