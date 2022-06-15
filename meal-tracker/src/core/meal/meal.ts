interface IMeal {
  id: string;
  time: Date;
  eaten: boolean;
}

export interface IRawMeal {
  id: string;
  time: string;
  eaten: boolean;
}

// todo separate meal from DB and meal as a domain object
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
    this.eaten = false;
  }

  markEaten() {
    this.eaten = true;
    this.updateTime(new Date());
  }

  updateTime(newTime: Date) {
    this.time = newTime;
  }
}