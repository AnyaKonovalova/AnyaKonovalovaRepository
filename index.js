const Cart = require('./cart');

let cart = new Cart.Cart();

console.log('Корзина пуста');
console.log('добавим кофе 20шт');
cart.addItemById(0, 20);
console.log('добавим еще кофе 25шт');
cart.addItemById(0, 25);
console.log('добавим чай 15шт');
cart.addItemById(1, 15);
console.log('удалим кофе 10шт');
cart.removeItemById(0, 10);

console.log('Теперь пробуем удалить больше кофе, чем есть, должен удалить строку с кофе из корзины и не ругаться');
cart.removeItemById(0, 100);

console.log('добавим кофе 20шт');
cart.addItemById(0, 20);

console.log('Теперь пробуем удалить то, чего в корзине нет, ничего не происходит');
cart.removeItemById(2, 50);


console.log('Теперь пробуем добавить не существующий товар, ничего не происходит');
cart.addItemById(3, 50);

console.log('Добавили скидку на кофе 15%');
cart.applyItemDiscountByItemId(0,15);

console.log('Удалили скидку на кофе 15%');
cart.removeItemDiscountByItemId(0);

console.log('Добавили скидку на кофе 20%');
cart.applyItemDiscountByItemId(0,20);

console.log('Добавили общую скидку 10%');
cart.applyTotalDiscount(10);

cart.print();













