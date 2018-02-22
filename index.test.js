
const ProductList = require('./productList');
const Cart = require('./cart');

describe('Products list', () => {

    test('Getting item by ID', () => {
        expect(ProductList.getItemByID(0)).toEqual({id: 0, name: "coffee", price: 250});
    });
});

describe('Cart: creating', () => {

    test('Creating cart without filling', () => {
        let cart = new Cart();
        let expectedCart = {
            itemsInCart: {},
            discountPercent: 0
        };
        expect(cart).toEqual(expectedCart);
    });

    test('Creating cart filling from dictionary ', () => {
        let itemsForCart = {
            0: {id: 0, name: "coffee", price: 250, count: 10},
            4: {id: 1, name: "tea", price: 150},
            2: {id: 2, price: 50, count: 60, discountPercent: 10},
            3: {name: "bread", price: 40, count: 2, discountPercent: 15},
            1: {id: 1, name: "tea", price: 150, count: 2, discountPercent: 15}
        };
        let cart = new Cart(itemsForCart);
        let expectedItemsInCart = {
            0: {name: "coffee", price: 250, count: 10, discountPercent: 0},
            1: {name: "tea", price: 150, count: 2, discountPercent: 15},
        };
        expect(cart.itemsInCart).toEqual(expectedItemsInCart);
    });

    test('Creating cart filling from array ', () => {
        let itemsForCart = [
            {id: 0, name: "coffee", price: 250, count: 10},
            {id: 1, name: "tea", price: 150},
            {id: 2, price: 50, count: 60, discountPercent: 10},
            {name: "bread", price: 40, count: 2, discountPercent: 15},
            {id: 1, name: "tea", price: 150, count: 2, discountPercent: 15}
        ];
        let cart = new Cart(itemsForCart);
        let expectedItemsInCart = {
            0: {name: "coffee", price: 250, count: 10, discountPercent: 0},
            1: {name: "tea", price: 150, count: 2, discountPercent: 15},
        };
        expect(cart.itemsInCart).toEqual(expectedItemsInCart);
    });

    test('Creating cart filling from array and with total discount', () => {
        let itemsInCart = {
            0: {id: 0, name: "coffee", price: 250, count: 10},
            1: {id: 1, name: "tea", price: 150, count: 20}
        };
        let cart = new Cart(itemsInCart, 20);
        let sumWithDiscount = cart.culcTotalSumWithDiscount();
        expect(sumWithDiscount).toBe(4400);
    });
});

describe('Cart: adding item', () => {

    test('Adding item', () => {
        let cart = new Cart();
        let item = {id: 0, name: "coffee", price: 250};
        cart.addItem(item, 20);
        let itemInCart = cart.itemsInCart[0];
        expect(itemInCart).toEqual({name: "coffee", price: 250, count: 20, discountPercent: 0});
    });

    test('Adding item count', () => {
        let cart = new Cart([{id: 0, name: "coffee", price: 250, count: 20}]);
        let item = {id: 0, name: "coffee", price: 250};
        cart.addItem(item, 10);
        expect(cart.itemsInCart).toEqual({0: {name: "coffee", price: 250, count: 30, discountPercent: 0}});
    });

    test('Adding 2 different item', () => {
        let cart = new Cart([{id: 0, name: "coffee", price: 250, count: 20}]);
        let item1 = {id: 0, name: "coffee", price: 250};
        let item2 = {id: 1, name: "tea", price: 150};
        cart.addItem(item1, 10);
        cart.addItem(item2, 15);
        let expectedItemsInCart = {
            0: {name: "coffee", price: 250, count: 30, discountPercent: 0},
            1: {name: "tea", price: 150, count: 15, discountPercent: 0},
        };
        expect(cart.itemsInCart).toEqual(expectedItemsInCart);
    });

    test('Increasing count by negative value', () => {
        let cart = new Cart({id: 0, name: "coffee", price: 250, count: 15});
        let item = {id: 0, name: "coffee", price: 250};
        let itemBefore = cart.itemsInCart[0];
        cart.addItem(item, -15);
        let itemAfter = cart.itemsInCart[0];
        expect(itemBefore).toEqual(itemAfter);
    });

    test('Increasing count by 0 value', () => {
        let cart = new Cart({id: 0, name: "coffee", price: 250, count: 15});
        let item = {id: 0, name: "coffee", price: 250};
        let itemBefore = cart.itemsInCart[0];
        cart.addItem(item, 0);
        let itemAfter = cart.itemsInCart[0];
        expect(itemBefore).toEqual(itemAfter);
    });

    test('Adding item without id', () => {
        let cart = new Cart();
        let item = {name:"milk", price: 240};
        cart.addItem(item, 50);
        expect(cart.itemsInCart).toEqual({});
    });

    test('Adding item without name', () => {
        let cart = new Cart();
        let item = {id: 3, price: 240};
        cart.addItem(item, 50);
        expect(cart.itemsInCart).toEqual({});
    });

    test('Adding item without price', () => {
        let cart = new Cart();
        let item = {id: 3, name: "milk"};
        cart.addItem(item, 50);
        expect(cart.itemsInCart).toEqual({});
    });
});

describe('Cart: removing item', () => {

    test('Decreasing count', () => {
        let cart = new Cart([{id: 0, name: "coffee", price: 250, count: 10}]);
        let newItem = {id: 0, name: "coffee", price: 250};
        cart.decreaseCountOfItem(newItem, 5);
        expect(cart.itemsInCart[0]).toEqual({name: "coffee", price: 250, count: 5, discountPercent: 0});
    });

    test('Decreasing count by 0 value', () => {
        let cart = new Cart([{id: 0, name: "coffee", price: 250, count: 10}]);
        let newItem = {id: 0, name: "coffee", price: 250};
        let itemBefore = cart.itemsInCart[0];
        cart.decreaseCountOfItem(newItem, 0);
        let itemAfter = cart.itemsInCart[0];
        expect(itemBefore).toEqual(itemAfter);
    });

    test('Decreasing count by negative value', () => {
        let cart = new Cart([{id: 0, name: "coffee", price: 250, count: 10}]);
        let newItem = {id: 0, name: "coffee", price: 250};
        let itemBefore = {name: "coffee", price: 250, count: 10, discountPercent: 0};
        cart.decreaseCountOfItem(newItem, -15);
        let itemAfter = cart.itemsInCart[0];
        expect(itemBefore).toEqual(itemAfter);
    });

    test('Decreasing count by the same value', () => {
        let cart = new Cart([{id: 0, name: "coffee", price: 250, count: 10}]);
        let newItem = {id: 0, name: "coffee", price: 250};
        cart.decreaseCountOfItem(newItem, 10);
        expect(cart.itemsInCart).toEqual({});
    });

    test('Removing item', () => {
        let cart = new Cart([{id: 0, name: "coffee", price: 250, count: 10}]);
        let newItem = {id: 0, name: "coffee", price: 250};
        cart.removeItem(newItem);
        expect(cart.itemsInCart).toEqual({});
    });

    test('Removing item which is not in cart', () => {
        let cart = new Cart([{id: 0, name: "coffee", price: 250, count: 10}]);
        let itemWgichisNotInCart = {id: 1, name: "tea", price: 150};
        cart.removeItem(itemWgichisNotInCart);
        expect(cart.itemsInCart).toEqual({0: {name: "coffee", price: 250, count: 10, discountPercent: 0}});
    });

    test('Removing incorrect item (without id)', () => {
        let cart = new Cart([{id: 0, name: "coffee", price: 250, count: 10}]);
        let itemWithoutId = {name: "coffee", price: 250};
        cart.removeItem(itemWithoutId);
        expect(cart.itemsInCart).toEqual({0: {name: "coffee", price: 250, count: 10, discountPercent: 0}});
    });

    test('Removing item (without name)', () => {
        let cart = new Cart([{id: 0, name: "coffee", price: 250, count: 10}]);
        let itemWithoutName = {id: 0, price: 250};
        cart.removeItem(itemWithoutName);
        expect(cart.itemsInCart).toEqual({});
    });

    test('Removing item (without price)', () => {
        let cart = new Cart([{id: 0, name: "coffee", price: 250, count: 10}]);
        let itemWithoutPrice = {id: 0, name: "coffee"};
        cart.removeItem(itemWithoutPrice);
        expect(cart.itemsInCart).toEqual({});
    });
});

describe('Cart: discount', () => {

    test('Applying item discount', () => {
        let cart = new Cart([{id: 0, name: "coffee", price: 250, count: 10}]);
        let item = {id: 0, name: "coffee", price: 250};
        cart.applyItemDiscount(item, 15);
        let sumWithDiscount = cart.culcSumWithDiscount(cart.itemsInCart[0]);
        expect(sumWithDiscount).toBe(2125);
    });

    test('Removing item discount', () => {
        let cart = new Cart([{id: 0, name: "coffee", price: 250, count: 10}]);
        let item = {id: 0, name: "coffee", price: 250};
        cart.applyItemDiscount(item, 15);
        cart.removeItemDiscount(item);
        let sumWithDiscount = cart.culcSumWithDiscount(cart.itemsInCart[0]);
        expect(sumWithDiscount).toBe(2500);
    });

    test('Adding total discount', () => {
        let itemsInCart = {
            0: {id: 0, name: "coffee", price: 250, count: 10},
            1: {id: 1, name: "tea", price: 150, count: 20}
        };
        let cart = new Cart(itemsInCart);
        cart.applyTotalDiscount(20);
        let sumWithDiscount = cart.culcTotalSumWithDiscount();
        expect(sumWithDiscount).toBe(4400);
    });

    test('Removing total discount', () => {
        let itemsInCart = {
            0: {id: 0, name: "coffee", price: 250, count: 10},
            1: {id: 1, name: "tea", price: 150, count: 20}
        };
        let cart = new Cart(itemsInCart);
        cart.applyTotalDiscount(20);
        cart.removeTotalDiscount();
        let sumWithDiscount = cart.culcTotalSumWithDiscount();
        expect(sumWithDiscount).toBe(5500);
    });

    test('Adding item and total discount', () => {
        let itemsInCart = {
            0: {id: 0, name: "coffee", price: 250, count: 10, discountPercent: 25},
            1: {id: 1, name: "tea", price: 150, count: 20}
        };
        let cart = new Cart(itemsInCart);
        cart.applyTotalDiscount(20);
        let sumWithDiscount = cart.culcTotalSumWithDiscount();
        expect(sumWithDiscount).toBe(4275);
    });
});
