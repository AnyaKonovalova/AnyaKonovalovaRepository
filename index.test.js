
const index = require('./index');


//1. GetItemByID(0) - находит coffee
test('GetItemByID(0) to equal {"id": 0, "name": "coffee", "price": 250}', () => {
    expect(index.GetItemByID(0)).toEqual({id: 0, name: "coffee", price: 250});
});

//2. addItem(0, 20) - добавляем 20, проверяем, что кол-во стало 20
test('addItem(0, 20) adds item', () => {
    let cart = new index.Cart();
    cart.addItem(0, 20);
    let item = cart.findItem(0);
    let count = item.count;
    expect(count).toBe(20);
});

//3. addItem(0, 10) - сначала добаляем 20, потом еще 10, проверяем, что кол-во стало 30
test('addItem(0, 10) increase count', () => {
    let cart = new index.Cart();
    cart.addItem(0, 20);
    cart.addItem(0, 10);
    let item = cart.findItem(0);
    let count = item.count;
    expect(count).toBe(30);
});

//4. addItem(0, -15) - проверяем, что сгенерилось исключение при добавлении отрицательного кол-ва
test('addItem(0, -15) throw exception', () => {
    let cart = new index.Cart();
    expect(() => {cart.addItem(0, -15)}).toThrow();
});

//5. addItem(1, 0) - проверяем, что сгенерилось исключение при добавлении нулевого кол-ва
test('addItem(1, 0) throw exception', () => {
    let cart = new index.Cart();
    expect(() => {cart.addItem(1, 0)}).toThrow();
});

//6. addItem(3, 50) - проверяем, что сгенерилось исключение
test('addItem(3, 50) throw exception', () => {
    let cart = new index.Cart();
    expect(() => {cart.addItem(3, 50)}).toThrow();
});


//7. removeItem(0, 5) - проверяем, что удалилось 5 шт coffee
test('removeItem(0, 5) reduce count', () => {
    let cart = new index.Cart();
    cart.addItem(0, 10);
    cart.removeItem(0, 5);
    let item = cart.findItem(0);
    let count = item.count;
    expect(count).toBe(5);
})

//8. removeItem(0, 0) - проверяем, что сгенерилось исключение
test('removeItem(0, 0) throw exception', () => {
    let cart = new index.Cart();
    cart.addItem(0, 10);
    expect(() => {cart.removeItem(0, 0)}).toThrow();
});

//9. removeItem(0, -5) - проверяем, что сгенерилось исключение
test('removeItem(0, -5) throw exception', () => {
    let cart = new index.Cart();
    cart.addItem(0, 10);
    expect(() => {cart.removeItem(0, -5)}).toThrow();
});

//10. removeItem(0, 10) - проверяем, что строка удалилась
test('removeItem(0, 10) removes item', () => {
    let cart = new index.Cart();
    cart.addItem(0, 10);
    cart.removeItem(0, 10);

});
