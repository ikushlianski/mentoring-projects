// interfaces are more suitable for extending in the future
export interface IHuman {
  name: string;
  age: number;
  eyeColor: string;
  isBelarusCitizen: false;
}

// types are similar to interfaces, but you cannot go back from types to interfaces once you made that switch
export type Human = {
  name: string;
  age: number;
  eyeColor: string;
  isBelarusCitizen: false;
};

export type Employee = {
  salary: number;
};

export type UnionOfHumanAndEmployee = Human & Employee;
