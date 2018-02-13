
var AllProducts = [
    {id : 0, name : "coffee", price : 250},
    {id : 1, name : "tea", price : 150},
    {id : 2, name : "milk", price : 55}
    ];
module.exports.AllProducts = AllProducts;

function GetItemByID(id)
{
    if(id < 0 || id >= AllProducts.length)
        return undefined;
    return new Item(AllProducts[id].id, AllProducts[id].name, AllProducts[id].price);
}
module.exports.GetItemByID = GetItemByID;

class Item
{
    constructor(id, name, price)
    {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class Cart
{
    constructor()
    {
        this.ItemsInCart = [];
        this.discountPercent = 0;
    }

    addItem(id, count)
    {
        if(GetItemByID(id) == undefined)
            throw new Error("Товар, который вы хотите добавить, не найден.");
        if(count <= 0)
            throw new Error("Попытка добавить нулевое или отрицательное кол-во.");

        var itemInCart = this.findItem(id);
        if (itemInCart == undefined)
        {

            itemInCart = GetItemByID(id);
            itemInCart.count = count;
            itemInCart.discountPercent = 0;
            this.ItemsInCart.push(itemInCart);
        }
        else
            itemInCart.count += count;
    }

    findItem(id)
    {
        for(var i = 0; i < this.ItemsInCart.length; i++)
            if(this.ItemsInCart[i].id == id)
                return this.ItemsInCart[i];

        return undefined;
    }

    removeItem(id, count)
    {
        if(count <= 0)
            throw Error("Попытка удалить нулевое или отрицательное кол-во.");
        var itemfound = false;
        for(var i = 0; i < this.ItemsInCart.length; i++)
        {
            if(this.ItemsInCart[i].id == id)
            {
                itemfound = true;
                if(this.ItemsInCart[i].count > count)
                    this.ItemsInCart[i].count -= count;
                else
                    this.ItemsInCart.splice(i, 1);
                return;
            }
        }
        if(!itemfound)
            throw new Error("Товар не найден в корзине");
    }

    applyItemDiscount(id, discountPercent)
    {
        var item;
        try
        {
            item = this.findItem(id);
        }
        catch(e)
        {
           throw new Error("Товар, для которого требуется скидка, не найден в корзине");
        }
        item.discountPercent = discountPercent;
    }


    removeItemDiscount(id)
    {
        var item;
        try
        {
            item = this.findItem(id);
        }
        catch(e)
        {
            throw new Error("Товар, для которого требуется скидка, не найден в корзине");
        }
        item.discountPercent = 0;
    }

    culcSumWithDiscount(item)
    {

        var sum = item.count * item.price;
        var sumWithDiscount = sum - ((sum * item.discountPercent) / 100);
        return sumWithDiscount;
    }

    culcTotalSumWithDiscount()
    {
        var totalSum = 0;
        for(var i = 0; i < this.ItemsInCart.length; i++)
            totalSum += this.culcSumWithDiscount(this.ItemsInCart[i]);

        var totalSumWithDiscount = totalSum - ((totalSum * this.discountPercent) / 100);
        return totalSumWithDiscount;
    }

    applyTotalDiscount(discountPercent)
    {
        this.discountPercent = discountPercent;
    }

    removeTotalDiscount()
    {
        this.discountPercent = 0;
    }

    print()
    {
        if(this.ItemsInCart.length == 0)
        {
            console.log("Товаров в коризне нет.");
            return;
        }
        console.log("Товары в корзине:");
        for(var i = 0; i < this.ItemsInCart.length; i++)
        {
            var count = this.ItemsInCart[i].count;
            var price = this.ItemsInCart[i].price;
            var sum = count * price;
            var sumWithDiscount = this.culcSumWithDiscount(this.ItemsInCart[i]);

            var str = "" + (i + 1) + " " + this.ItemsInCart[i].name + " " + count + " шт " + price + " р. " +
                sum + " р." ;
            if(sum != sumWithDiscount)
                str += ", со скидкой " + sumWithDiscount;
            console.log(str);
        }
        var totalSumWithDiscount = this.culcTotalSumWithDiscount();
        str = "Всего товаров " + this.ItemsInCart.length + "шт, на сумму c учетом скидок " + totalSumWithDiscount;
        console.log(str);
    }
}
module.exports.Cart = Cart;


var cart = new Cart();

console.log('Корзина пуста');
console.log('добавим кофе 20шт');
cart.addItem(0, 20);
console.log('добавим еще кофе 20шт');
cart.addItem(0, 20);
console.log('добавим чай 15шт');
cart.addItem(1, 15);
console.log('удалим кофе 10шт');
cart.removeItem(0, 10);
console.log('Теперь пробуем удалить больше кофе, чем есть, должен удалить строку с кофе из корзины и не ругаться');
console.log('Теперь пробуем удалить то, чего в корзине нет, должен сгенерить исключение');

try
{
    cart.removeItem(2, 50);
}
catch (e)
{
    console.log(e.message);
}
console.log('Теперь пробуем добавить не существующий товар, должен сгенерить исключение');
try
{
    cart.addItem(3, 50);
}
catch (e)
{
    console.log(e.message);
}

console.log('Добавили скидку на кофе 15%');
cart.applyItemDiscount(0,15);
console.log('Удалили скидку на кофе 15%');
cart.removeItemDiscount(0);
console.log('Добавили скидку на кофе 10%');
cart.applyItemDiscount(0,10);

cart.applyTotalDiscount(10);

cart.print();
try
{
    cart.addItem(0, -10);
}
catch(e)
{
    console.log(e.message);
}












