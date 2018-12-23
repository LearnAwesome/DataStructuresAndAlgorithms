class MonthTemps {
  constructor() {
    this.dataStore = [
      this._createWeek(1),
      this._createWeek(2),
      this._createWeek(3),
      this._createWeek(4),
      this._createWeek(5)
    ];
  }
  get days() {
    return this._flatten()
      .filter(item => this._valuable(item))
      .length;
  }
  addDayData(n) {
    if (this.days < 31) {
      this.dataStore[Math.floor(this.days / 7)][this.days % 7] = n;
    } else {
      console.log('this month is too full to add!');
    }
  }
  getMonthAverage() {
    return this._flatten().reduce((prev, next) => {
      return prev + next;
    }) / this.days;
  }
  getWeekAverage(nth) {
    if (nth > 5) nth = 5;
    const days = this.dataStore[nth - 1].length;
    return this.dataStore[nth - 1].reduce((prev, next) => {
      return prev + next;
    }) / days;
  }
  _flatten() {
    return Array.prototype.concat(null, ...this.dataStore);
  }
  _valuable(item) {
    return typeof item === 'number' && item !== 0;
  }
  _createWeek(nth) {
    if (nth === 5) {
      return new Array(3).fill(0);
    }
    return new Array(7).fill(0);
  }
}

const monthTemps = new MonthTemps();
console.log(monthTemps.dataStore);
/*
[ [ 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0 ] ]
*/

for (let i = 0; i < 40; i ++) {
  monthTemps.addDayData( Math.round(Math.random() * 100) );
}
console.log(monthTemps.dataStore);
/*
[ [ 38, 26, 16, 68, 14, 74, 68 ],
  [ 62, 81, 40, 32, 50, 57, 99 ],
  [ 60, 90, 25, 2, 21, 17, 76 ],
  [ 44, 43, 10, 48, 47, 27, 9 ],
  [ 44, 63, 49 ] ]
*/

console.log( monthTemps.getMonthAverage() ); // 45.16129032258065

console.log( monthTemps.getWeekAverage(2) ); // 60.142857142857146