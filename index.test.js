
const ProductList = require('./productList');
const Cart = require('./cart');

describe('Products list', () => {

    test('Getting item by ID', () => {
        expect(ProductList.getItemByID(0)).toEqual({id: 0, name: "coffee", price: 250});
    });
});

describe('Cart: adding item', () => {

    test('Adding item by id', () => {
        let cart = new Cart.Cart();
        cart.addItemById(0, 20);
        let item = cart.findItemById(0);
        let count = item.count;
        expect(count).toBe(20);
    });

    test('Adding item', () => {
        let cart = new Cart.Cart();
        let itemWithId0 = ProductList.getItemByID(0);
        cart.addItem(itemWithId0, 20);
        let itemInCart = cart.findItem(itemWithId0);
        let count = itemInCart.count;
        expect(count).toBe(20);
    });

    test('Adding item count', () => {
        let cart = new Cart.Cart();
        cart.addItemById(0, 20);
        cart.addItemById(0, 10);
        let itemInCartWithId0 = cart.findItemById(0);
        let count = itemInCartWithId0.count;
        expect(count).toBe(30);
    });

    test('Increasing count by negative value', () => {
        let cart = new Cart.Cart();
        cart.addItemById(0, 15);
        let itemBefore = cart.findItemById(0);
        cart.addItemById(0, -15);
        let itemAfter = cart.findItemById(0);
        expect(itemBefore).toEqual(itemAfter);
    });

    test('Increasing count by 0 value', () => {
        let cart = new Cart.Cart();
        cart.addItemById(1, 15);
        let itemBefore = cart.findItemById(1);
        cart.addItemById(1, 0);
        let itemAfter = cart.findItemById(1);
        expect(itemBefore).toEqual(itemAfter);
    });

    test('Adding nonexistent item', () => {
        let cart = new Cart.Cart();
        let cartItemsCountBefore = cart.itemsInCart.length;
        cart.addItemById(3, 50);
        let cartItemsCountAfter = cart.itemsInCart.length;
        expect(cartItemsCountBefore).toBe(cartItemsCountAfter);
    });
});

describe('Cart: removing item', () => {

    test('Decreasing count', () => {
        let cart = new Cart.Cart();
        cart.addItemById(0, 10);
        cart.removeItemById(0, 5);
        let itemWithId0 = cart.findItemById(0);
        let count = itemWithId0.count;
        expect(count).toBe(5);
    });

    test('Decreasing count by 0 value', () => {
        let cart = new Cart.Cart();
        cart.addItemById(0, 10);
        let itemBefore = cart.findItemById(0);
        cart.removeItemById(0, 0);
        let itemAfter = cart.findItemById(0);
        expect(itemBefore).toEqual(itemAfter);
    });

    test('Decreasing count by negative value', () => {
        let cart = new Cart.Cart();
        cart.addItemById(0, 10);
        let itemBefore = cart.findItemById(0);
        cart.removeItemById(0, -15);
        let itemAfter = cart.findItemById(0);
        expect(itemBefore).toEqual(itemAfter);
    });

    test('Removing item by id', () => {
        let cart = new Cart.Cart();
        cart.addItemById(0, 10);
        cart.removeItemById(0, 10);
    });

    test('Removing item', () => {
        let cart = new Cart.Cart();
        let itemWithId0 = ProductList.getItemByID(0);
        cart.addItem(itemWithId0, 20);
        cart.removeItem(itemWithId0, 20);
        let itemInCart = cart.findItem(itemWithId0);
        expect(itemInCart).toBe(undefined);
    });
});

describe('Cart: Discount', () => {

    test('Applying item discount', () => {
        let cart = new Cart.Cart();
        let itemWithId0 = ProductList.getItemByID(0);
        let count = 10;
        cart.addItem(itemWithId0, count);
        let discountPercent = 15;
        cart.applyItemDiscount(itemWithId0, discountPercent);
        let itemWithId0InCart = cart.findItem(itemWithId0);
        let sumWithDiscount = cart.culcSumWithDiscount(itemWithId0InCart);
        let expectedSumWithDiscount = (count * itemWithId0.price) * (100 - discountPercent) / 100;
        expect(sumWithDiscount).toBe(expectedSumWithDiscount);
    });

    test('Applying item discount by item id', () => {
        let cart = new Cart.Cart();
        let count = 10;
        cart.addItemById(0, count);
        let discountPercent = 15;
        cart.applyItemDiscountByItemId(0, discountPercent);
        let itemWithId0InCart = cart.findItemById(0);
        let sumWithDiscount = cart.culcSumWithDiscount(itemWithId0InCart);
        let expectedSumWithDiscount = (count * itemWithId0InCart.cartItem.price) * (100 - discountPercent) / 100;
        expect(sumWithDiscount).toBe(expectedSumWithDiscount);
    });

    test('Removing item discount', () => {
        let cart = new Cart.Cart();
        let itemWithId0 = ProductList.getItemByID(0);
        let count = 10;
        cart.addItem(itemWithId0, count);
        let discountPercent = 15;
        cart.applyItemDiscount(itemWithId0, discountPercent);
        cart.removeItemDiscount(itemWithId0);
        let itemWithId0InCart = cart.findItem(itemWithId0);
        let sumWithDiscount = cart.culcSumWithDiscount(itemWithId0InCart);
        let expectedSumWithDiscount = (count * itemWithId0.price);
        expect(sumWithDiscount).toBe(expectedSumWithDiscount);
    });

    test('Removing item discount by item id', () => {
        let cart = new Cart.Cart();
        let count = 10;
        cart.addItemById(0, count);
        let discountPercent = 15;
        cart.applyItemDiscountByItemId(0, discountPercent);
        cart.removeItemDiscountByItemId(0);
        let itemWithId0InCart = cart.findItemById(0);
        let sumWithDiscount = cart.culcSumWithDiscount(itemWithId0InCart);
        let expectedSumWithDiscount = (count * itemWithId0InCart.cartItem.price);
        expect(sumWithDiscount).toBe(expectedSumWithDiscount);
    });

    test('Adding total discount', () => {
        let cart = new Cart.Cart();
        let itemWithId0 = ProductList.getItemByID(0);
        let count = 10;
        cart.addItem(itemWithId0, count);
        let discountPercent = 20;
        cart.applyTotalDiscount(discountPercent);
        let sumWithDiscount = cart.culcTotalSumWithDiscount();
        let expectedTotalSumWithDiscount = (count * itemWithId0.price) * (100 - discountPercent) / 100;
        expect(sumWithDiscount).toBe(expectedTotalSumWithDiscount);
    });

    test('Removing total discount', () => {
        let cart = new Cart.Cart();
        let itemWithId0 = ProductList.getItemByID(0);
        let count = 10;
        cart.addItem(itemWithId0, count);
        let discountPercent = 20;
        cart.applyTotalDiscount(discountPercent);
        cart.removeTotalDiscount();
        let sumWithDiscount = cart.culcTotalSumWithDiscount();
        let expectedTotalSumWithDiscount = (count * itemWithId0.price);
        expect(sumWithDiscount).toBe(expectedTotalSumWithDiscount);
    });

    test('Adding item and total discount', () => {
        let cart = new Cart.Cart();
        let itemWithId0 = ProductList.getItemByID(0);
        let tea = ProductList.getItemByID(1);
        cart.addItem(itemWithId0, 10);
        cart.addItem(tea, 20);
        let itemDiscountPercent = 20;
        cart.applyItemDiscount(itemWithId0, itemDiscountPercent);
        let itemWithId0InCart = cart.findItem(itemWithId0);
        let teaInCart = cart.findItem(tea);
        let totalDiscountPercent = 15;
        cart.applyTotalDiscount(totalDiscountPercent);
        let sumWithDiscount = cart.culcTotalSumWithDiscount();
        let expectedTotalSumWithDiscount = (itemWithId0InCart.count * itemWithId0.price) * (100 - Math.max(itemWithId0InCart.discountPercent, totalDiscountPercent)) / 100 +
            (teaInCart.count * tea.price) * (100 - Math.max(teaInCart.discountPercent, totalDiscountPercent)) / 100;
        expect(sumWithDiscount).toBe(expectedTotalSumWithDiscount);
    });

});
