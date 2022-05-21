const f = function oneOrZero(num: number): boolean | number {
  if (num) {
    return 1;
  }

  // you have to provide a second return to cover all possible type scenarios
  return 0;
};

function add(a: number, b: number) {
  return a + b;
}

const result = add(5, 6);
// const result = add(5, null); // invalid as null is not a number
// const result = add(5, undefined); // invalid as undefined is not a number
