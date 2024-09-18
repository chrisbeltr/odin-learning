function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pages}, ${read}`;
  };
}

function Animal(species, sound) {
  this.species = species;
  this.sound = sound;
  this.makeSound = function () {
    console.log(this.sound);
  };
}

function Dog(name) {
  Animal.call(this, "Dog", "bark!");
  this.name = name;
}

// functions in prototypes can be made separately
// Animal.prototype.makeSound = function () {
//   console.log(this.sound);
// };

// if a function in prototype was made separately, we can
// inherit it by setting the prototypes of the new object
// to the prototype of the old object
// Object.setPrototypeOf(Dog.prototype, Animal.prototype);

var max = new Dog("Max");
max.makeSound();

let head = {
  glasses: 1,
};

let table = {
  pen: 3,
};

let bed = {
  sheet: 1,
  pillow: 2,
};

let pockets = {
  money: 2000,
};

table.__proto__ = head;
bed.__proto__ = table;
pockets.__proto__ = bed;

let car = {
  brand: "Honda",
  getBrand: function () {
    return this.brand;
  },
};

let bike = {
  brand: "BikeBrand",
};

let brand = car.getBrand.bind(bike);
console.log(brand());

function getBrand() {
  return this.brand;
}

console.log(getBrand.call(car));

// do not use arrow functions inside objects, they set
// `this` to reference the global object.

const Car = function (color) {
  this.color = color;
};

Car.prototype = {
  getColor() {
    return this.color;
  },
};

const ToyCar = function () {};
Object.setPrototypeOf(ToyCar.prototype, Car.prototype);
let toyCar = new ToyCar();
