class List {
    constructor() {
        this.listSize = 0;
        this.max = null;
        this.dataStore = [];
    }
    displayList() {
        console.log(this.dataStore);
    }
    append(element) {
        this.updateMax(element);
        this.dataStore[this.listSize++] = element;
    }
    updateMax(element) {
        this.max = element;
    }
    isMax(element) {
        if (this.listSize === 0) {
            return true;
        }
        return element > this.max;
    }
    appendMax(element) {
        if (this.isMax(element)) {
            this.updateMax(element);
            this.append(element);
        }
    }
}

const list = new List();
list.append(1);
list.append(4);
list.append('b');
list.displayList();

list.appendMax(2);
list.displayList();

list.appendMax('ab');
list.displayList();