const GREEN = 120;
const RED = 0;

export function greenToRed(percent) {
  const a = percent / 100,
    b = (GREEN - RED) * a,
    c = b + RED;

  return `hsl(${c}, 100%, 50%)`;
}
