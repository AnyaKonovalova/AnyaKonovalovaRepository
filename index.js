const Cart = require('./cart');
const CartItem = require('./cartItem');
const AllProducts = require('./productList');

let itemsInCart1 = {
0: {id: 0, name: "coffee", price: 250, count: 10},
4: {id: 1, name: "tea", price: 150},
2: {id: 2, price: 50, count: 60, discountPercent: 10},
3: {name: "bread", price: 40, count: 2, discountPercent: 15},
1: {id: 1, name: "tea", price: 150, count: 2, discountPercent: 15}
};

let itemsInCart2 = [
    {id: 0, name: "coffee", price: 250, count: 10},
    {id: 1, name: "tea", price: 150},
    {id: 2,  price: 50, count: 60, discountPercent: 10},
    {name: "bread", price: 40, count: 2, discountPercent: 15},
    {id: 1, name: "tea", price: 150, count: 2, discountPercent: 15}
];

let itemsInCart3 = {id: 0, name: "coffee", price: 250, count: 10}; // не добавится
let itemsInCart4 = {};
let itemsInCart5 = null;
let itemsInCart6;

let cart1 = new Cart(itemsInCart1);

let cart3 = new Cart(itemsInCart3);
let cart4 = new Cart(itemsInCart4);
let cart5 = new Cart(itemsInCart5);
let cart6 = new Cart(itemsInCart6);


let cart = new Cart(itemsInCart2);

let coffeeItem = {id: 0, name: "coffee", price: 250};

let teaItem = AllProducts.getItemByID(1);
let milkItem = new CartItem(2, "milk", 50);
console.log('добавим кофе 20шт, чай 15шт');
cart.addItem(coffeeItem, 20);

cart.addItem(teaItem, 15);
console.log('добавим еще кофе 25шт');
cart.addItem(coffeeItem, 25);

console.log('удалим кофе 10шт');
cart.decreaseCountOfItem(coffeeItem, 10);

console.log('добавим молоко 40шт');
cart.addItem(milkItem, 40);
console.log('удалим молоко');
cart.removeItem(milkItem);
console.log('еще раз попробуем удалить молоко');
cart.removeItem(milkItem);

console.log('снова добавим молоко 40шт');
cart.addItem(milkItem, 40);
console.log('и так можно удалить молоко');
cart.removeItem({id:2});

cart.addItem(milkItem, 40);
console.log('удаляем объект без id');
cart.removeItem({name:"milk"});
cart.removeItem({name:"milk", price: 240});

console.log('Теперь пробуем удалить больше кофе, чем есть, должен удалить строку с кофе из корзины и не ругаться');
cart.decreaseCountOfItem(coffeeItem, 100);

console.log('добавим кофе 20шт');
cart.addItem(coffeeItem, 20);

console.log('Теперь пробуем удалить то, чего в корзине нет (id не тот), ничего не происходит');
cart.decreaseCountOfItem({id: 3, name: "coffee", price: 250});

console.log('Теперь пробуем добавить товар, котрого нет в продакт листе');
cart.addItem({id: 4, name: "bread", price: 50}, 10);

console.log('Добавили скидку на кофе 15%');
cart.applyItemDiscount(coffeeItem, 50);

console.log('Удалили скидку на кофе 15%');
cart.removeItemDiscount(coffeeItem);

console.log('Добавили скидку на кофе 20%');
cart.applyItemDiscount({id:0}, 20);

console.log('А вот так скидка на кофе не удалится');
cart.removeItemDiscount({id: 6, name: "coffee"});
console.log('И так тоже скидка на кофе не удалится');
cart.removeItemDiscount({name: "coffee"});

console.log('Добавили общую скидку 15%');
cart.applyTotalDiscount(10);

/*
console.log('Удалили общую скидку 10%');
cart.removeTotalDiscount();

console.log('Добавили общую скидку gdfg% - не добавится');
cart.applyTotalDiscount("gdfg");

console.log('Добавили общую скидку "10"%');
cart.applyTotalDiscount("10");

console.log('Добавили общую скидку {discountPercent: 25}% - не добавится');
cart.applyTotalDiscount({discountPercent: 25});
*/
cart.print();














