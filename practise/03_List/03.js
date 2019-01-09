class Person {
    constructor(name, sex) {
        this.name = name;
        this.sex = sex;
    }
}

class List {
    constructor() {
        this.listSize = 0;
        this.dataStore = [];
    }
    displayList(sex) {
        console.log(this.dataStore.filter(item => item.sex === sex));
    }
    find(element) {
        return this.dataStore.findIndex(element);
    }
    append(element) {
        this.dataStore[this.listSize++] = element;
    }
    remove(element) {
        const removeAt = this.find(element);
        if (removeAt > -1) {
            this.dataStore.splice(removeAt, 1);
        }
    }
}

const list = new List();
for (let i = 0; i < 13; i ++) {
    const name = 'Michael' + i;
    const sex = ['male', 'famale'][Math.round(Math.random())];
    const p = new Person(name, sex);
    list.append(p);
}
list.displayList('male');