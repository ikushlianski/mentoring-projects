interface Human {
  name: string;
  age: number;
  say: () => string;
}

class HumanClass implements Human {
  name: string;
  age: number;
  car: string;

  constructor() {
    this.name = "ilya";
    this.age = 55;
    this.car = "efw";
  }

  say() {
    return "hello";
  }
}

class Manager extends HumanClass {
  car: string;

  constructor() {
    super();
    this.car = "my car";
  }

  fire() {
    // fire someone
  }
}

const ilya = new HumanClass();
const ilyaManager = new Manager();
ilyaManager.fire();
