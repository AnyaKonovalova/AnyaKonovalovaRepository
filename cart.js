const ProductList = require('./productList');

class Cart {
    constructor() {
        this.itemsInCart = [];
        this.discountPercent = 0;
    }

    addItem(cartItem, count)
    {
        if(!cartItem)
            return;
        if(count <= 0)
            return;
        let itemInCart = this.findItem(cartItem);
        if(!itemInCart) {
            let newItemInCart = {'cartItem': cartItem, 'count': count, 'discountPercent': 0};
            this.itemsInCart.push(newItemInCart);
        }
        else
            itemInCart.count += count;
    }

    addItemById(id, count) {
        let cartItem = ProductList.getItemByID(id);
        if(!cartItem)
            return;
        if(count <= 0)
            return;
        this.addItem(cartItem, count);
    }

    findItemById(id) {
        for(let i = 0; i < this.itemsInCart.length; i++)
            if(this.itemsInCart[i].cartItem.id == id)
                return this.itemsInCart[i];
        return undefined;
    }

    findItem(cartItem) {
        return this.findItemById(cartItem.id);
        return undefined;
    }

    getItemIndexInCart(cartItem){
        return this.getItemIndexInCartById(cartItem.id);
        return undefined;
    }

    getItemIndexInCartById(id){
        for(let i = 0; i < this.itemsInCart.length; i++){
            if(this.itemsInCart[i].cartItem.id == id){
                return i;
            }
        }
        return undefined;
    }

    removeItemById(id, count) {
        if(count <= 0)
            return;

        let i = this.getItemIndexInCartById(id);
        if(i !== undefined){
            if(this.itemsInCart[i].count > count)
                this.itemsInCart[i].count -= count;
            else
                this.itemsInCart.splice(i, 1);
            return;
        }
    }

    removeItem(cartItem, count){
        if(count <= 0)
            return;
        let i = this.getItemIndexInCart(cartItem);
        if(i !== undefined){
            if(this.itemsInCart[i].count > count)
                this.itemsInCart[i].count -= count;
            else
                this.itemsInCart.splice(i, 1);
        }
    }

    applyItemDiscountByItemId(id, discountPercent) {
        let item = this.findItemById(id);
        if(item)
            item.discountPercent = discountPercent;
    }

    removeItemDiscountByItemId(id) {
        let item = this.findItemById(id);
        if(item)
            item.discountPercent = 0;
    }

    applyItemDiscount(cartItem, discountPercent) {
        let itemInCart = this.findItem(cartItem);
        if(itemInCart)
            itemInCart.discountPercent = discountPercent;
    }

    removeItemDiscount(cartItem) {
        let itemInCart = this.findItem(cartItem);
        if(itemInCart)
            itemInCart.discountPercent = 0;
    }

    culcSumWithDiscount(item) {

        let sum = item.count * item.cartItem.price;
        let discountPercent = (item.discountPercent > this.discountPercent) ? item.discountPercent : this.discountPercent;
        let sumWithDiscount = sum - ((sum * discountPercent) / 100);
        return sumWithDiscount;
    }

    culcTotalSumWithDiscount() {
        let totalSum = 0;
        for(let i = 0; i < this.itemsInCart.length; i++)
            totalSum += this.culcSumWithDiscount(this.itemsInCart[i]);
        return totalSum;
    }

    applyTotalDiscount(discountPercent) {
        this.discountPercent = discountPercent;
    }

    removeTotalDiscount() {
        this.discountPercent = 0;
    }

    print() {
        if(this.itemsInCart.length == 0) {
            console.log("Товаров в коризне нет.");
            return;
        }
        console.log("Товары в корзине:");
        for(let i = 0; i < this.itemsInCart.length; i++) {
            let count = this.itemsInCart[i].count;
            let price = this.itemsInCart[i].cartItem.price;
            let sum = count * price;
            let sumWithDiscount = this.culcSumWithDiscount(this.itemsInCart[i]);
            let str = `${i + 1} ${this.itemsInCart[i].cartItem.name} ${count} шт ${price} р. ${sum} р.`;
            if(sum !== sumWithDiscount)
                str += `, со скидкой ${sumWithDiscount}`;
            console.log(str);
        }
        let totalSumWithDiscount = this.culcTotalSumWithDiscount();
        let str = "Всего товаров " + this.itemsInCart.length + "шт, на сумму c учетом скидок " + totalSumWithDiscount;
        console.log(str);
    }
}
module.exports.Cart = Cart;
