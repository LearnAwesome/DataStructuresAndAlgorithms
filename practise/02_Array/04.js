class Word {
  constructor() {
    this.dataStore = [];
  }
  get wholeWord() {
    return this.dataStore.join('');
  }
  addOne(w) {
    this.dataStore.push( w.toString() );
    return this;
  }
}

const word = new Word();
console.log(word.wholeWord); // ''

word.addOne('a').addOne(1).addOne('bb');
console.log(word.wholeWord); // 'a1bb'