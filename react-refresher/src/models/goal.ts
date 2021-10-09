class Goal {
  id: string;
  text: string;

  constructor(goalText: string) {
    this.text = goalText;
    this.id = (Math.random() * 10000000).toFixed();
  }
}

export default Goal;