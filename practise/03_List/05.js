const fs = require('fs');
const path = require('path');

function createResourceArray(url) {
    const file = fs.readFileSync( path.resolve(__dirname, url), 'utf-8' );
    return file.split('\n');
}

class List {
    constructor() {
        if (new.target === List) throw new Error('Abstract class List can not be instantiated directly.');
        this.listSize = 0;
        this.pos = 0;
        this.posStore = null;
        this.dataStore = [];
    }
    get currPos() {
        return this.pos;
    }
    get length() {
        return this.listSize;
    }
    contains(element) {
        for (const item of this.dataStore) {
            if (item.includes(element)) return true;
        }
        return false;
    }
    append(element) {
        this.dataStore[this.listSize++] = element;
    }
    remove(element) {
        const foundAt = this.findIndex(element);
        if (foundAt > -1) {
            this.dataStore.splice(foundAt, 1);
            --this.listSize;
            return true;
        }
        return false;
    }
    insert(element, after) {
        const insertPos = this.findIndex(after);
        if (insertPos > -1) {
            this.dataStore.splice(insertPos + 1, 0, element);
            ++this.listSize;
            return true;
        }
        return false;
    }
    clear() {
        this.pos = 0;
        this.listSize = 0;
        this.dataStore = [];
    }
    front() {
        this.pos = 0;
    }
    end() {
        this.pos = this.listSize - 1;
    }
    prev() {
        --this.pos; 
    }
    next() {
        ++this.pos;
    }
    hasPrev() {
        return this.pos > 0;
    }
    hasNext() {
        return this.pos < this.listSize;
    }
    moveTo(pos) {
        this.pos = pos;
    }
    getElement() {
        return this.dataStore[this.pos];
    }
    storePos() {
        this.posStore = this.pos;
    }
    recoverPos() {
        this.moveTo(this.posStore);
        this.posStore = null;
    }
    *[Symbol.iterator]() {
        this.storePos();
        for (this.front(); this.currPos < this.length; this.next()) {
            yield this.getElement();
        }
        this.recoverPos();
    }
}

class MovieList extends List {
    constructor() {
        super();
    }
    findIndex(element) {
        for (let i = 0; i < this.length; ++i) {
            if (this.dataStore[i].includes(element)) return i;
        }
        return -1;
    }
    displayList() {
        for (const item of this) {
            console.log(item);
        }
    }
}

class CustomerList extends List {
    constructor() {
        super();
    }
    findIndex(element) {
        for (let i = 0; i < this.length; ++i) {
            if (this.dataStore[i].movie.includes(element)) return i;
        }
        return -1;
    }
    displayList() {
        for (const item of this) {
            console.log(item.name + ', ' + item.movie);
        }
    }
}

class Customer {
    constructor(name, movie) {
        this.name = name;
        this.movie = movie;
    }
}

function checkout(name, movie, movieList, customerList) {
    const pos = movieList.findIndex(movie);
    movieList.moveTo(pos);
    movie = movieList.getElement();
    
    const c = new Customer(name, movie);
    customerList.append(c);
    movieList.remove(movie);

    console.log('\nRental lists: \n');
    customerList.displayList();
}

function checkin(name, movie, movieList, customerList) {
    const pos = customerList.findIndex(movie);
    customerList.moveTo(pos);
    movie = customerList.getElement().movie;
    
    movieList.append(movie);
    customerList.remove(movie);

    console.log('\nRental lists: \n');
    customerList.displayList();
}

const movies = createResourceArray('films.txt');

const movieList = new MovieList();
const customerList = new CustomerList();
for (const movie of movies) {
    movieList.append(movie);
}

console.log('Available movies: \n');
movieList.displayList();
checkout('Michael', 'Inception', movieList, customerList);
checkout('John', '12 Angry Men', movieList, customerList);
checkin('Michael', 'Inception', movieList, customerList);