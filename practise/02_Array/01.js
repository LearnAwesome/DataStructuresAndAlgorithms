class Grade {
  constructor() {
    this.store = [];
  }
  get average() {
    let total = 0;
    let length = this.store.length === 0 ? 1 : this.store.length;
    for (const score of this.store) {
      total += score; 
    }
    return total / length;
  }
  addOne(n) {
    if (typeof n !== 'number') {
      throw TypeError('Added score must be a [number]');
    }
    this.store.push(n);
    return this;
  }
}

const grade = new Grade();
console.log(grade.average); // 0
grade.addOne(2);
console.log(grade.average); // 2
grade.addOne(3).addOne(4);
console.log(grade.average); // 3