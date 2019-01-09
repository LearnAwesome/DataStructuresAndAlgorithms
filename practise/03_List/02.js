class List {
    constructor() {
        this.listSize = 0;
        this.min = null;
        this.dataStore = [];
    }
    displayList() {
        console.log(this.dataStore);
    }
    append(element) {
        this.updateMin(element);
        this.dataStore[this.listSize++] = element;
    }
    updateMin(element) {
        this.min = element;
    }
    isMin(element) {
        if (this.listSize === 0) {
            return true;
        }
        return element < this.min;
    }
    appendMin(element) {
        if (this.isMin(element)) {
            this.updateMin(element);
            this.append(element);
        }
    }
}

const list = new List();
list.append(1);
list.append(4);
list.append('b');
list.displayList();

list.appendMin(2);
list.displayList();

list.appendMin('ab');
list.displayList();