interface IMeal {
  id: string;
  time: Date;
  eaten: boolean;
}

export class Meal implements IMeal {
  id: string;
  time: Date;
  eaten = false;

  static counter: number;

  constructor() {
    // increment an internal counter each time we create a new meal
    const counter = Meal.counter++;

    const date = new Date();
    const timestamp = +date;

    // guarantee a super-unique id of every meal
    this.id = `${timestamp}-${counter}`;
    this.time = date;
  }

  markEaten() {
    this.eaten = true;
  }

  updateTime(newTime: Date) {
    this.time = newTime;
  }
}
