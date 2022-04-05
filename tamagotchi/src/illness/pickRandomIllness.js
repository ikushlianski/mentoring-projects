export const pickRandomIllness = (illnessList) => {
  const list = illnessList.split(",");

  return list[Math.floor(Math.random() * list.length)];
};
