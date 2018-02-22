
class Cart {
    constructor(itemsInCart, discountPercent) {
        this.itemsInCart = {};
        for(let id in itemsInCart){
            if(itemsInCart[id].id === undefined || itemsInCart[id].name === undefined || itemsInCart[id].price === undefined || itemsInCart[id].count === undefined)
                continue;
            let newItemId = itemsInCart[id].id;
            let newItem = {name: itemsInCart[id].name, price: itemsInCart[id].price, count: itemsInCart[id].count, discountPercent: 0};
            this.itemsInCart[newItemId] = newItem;
            if(itemsInCart[id].discountPercent === undefined)
                this.itemsInCart[id].discountPercent = 0;
            else
                if(isNaN(itemsInCart[id].discountPercent))
                    continue;
                else
                    this.itemsInCart[newItemId].discountPercent = itemsInCart[id].discountPercent;
        }
        this.discountPercent = (this.discountPercentIsCorrect(discountPercent)) ? discountPercent : 0;
    }

    discountPercentIsCorrect(discountPercent){
        if(discountPercent === undefined){
            return false;
        }
        if(discountPercent === null){
            return false;
        }
        if(isNaN(discountPercent)){
            return false;
        }
        if(discountPercent < 0){
            return false;
        }
        return true;
    }

    addItem(cartItem)
    {
        this.addItem(cartItem, 1);
    }

    addItem(cartItem, count)
    {
        if(!cartItem)
            return;
        if(count <= 0)
            return;
        let id = cartItem.id;
        if(id === undefined || !cartItem.name || !cartItem.price)
            return;
        if(this.itemsInCart[id])
            this.itemsInCart[id].count += count;
        else{
            let newItem = {name: cartItem.name, price: cartItem.price, count: count, discountPercent: 0};
            this.itemsInCart[id] = newItem;// .push(key: id, value: );
        }
    }

    decreaseCountOfItem(cartItem, count){
        if(count <= 0)
            return;
        let id = cartItem.id;
        if(this.itemsInCart[id]){
            if(this.itemsInCart[id].count !== undefined)
                if(this.itemsInCart[id].count > count)
                    this.itemsInCart[id].count -= count;
                else
                    delete this.itemsInCart[id];
        }
    }

    removeItem(cartItem){
        if(!cartItem)
            return;
        if(cartItem.id === undefined)
            return;
        delete this.itemsInCart[cartItem.id];
    }

    applyItemDiscount(cartItem, discountPercent) {
        if(!cartItem)
            return;
        if(cartItem.id === undefined)
            return;
        let id = cartItem.id;
        if(this.itemsInCart[id] === undefined)
            return;
        if(this.discountPercentIsCorrect(discountPercent))
            this.itemsInCart[id].discountPercent = Number(discountPercent);
    }

    removeItemDiscount(cartItem) {
        if(!cartItem)
            return;
        if(cartItem.id === undefined)
            return;
        let id = cartItem.id;
        if(this.itemsInCart[id] === undefined)
            return;
        this.itemsInCart[id].discountPercent = 0;
    }

    culcSumWithDiscount(item) {

        let sum = item.count * item.price;
        let discountPercent = (item.discountPercent > this.discountPercent) ? item.discountPercent : this.discountPercent;
        let sumWithDiscount = sum - ((sum * discountPercent) / 100);
        return sumWithDiscount;
    }

    culcTotalSumWithDiscount() {
        let totalSum = 0;
        for(let i in this.itemsInCart)
            totalSum += this.culcSumWithDiscount(this.itemsInCart[i]);
        return totalSum;
    }

    applyTotalDiscount(discountPercent) {
        if(this.discountPercentIsCorrect(discountPercent))
            this.discountPercent = Number(discountPercent);
    }

    removeTotalDiscount() {
        this.discountPercent = 0;
    }

    print() {
        if(!Object.keys(this.itemsInCart).length) {
            console.log("Товаров в коризне нет.");
            return;
        }
        console.log("Товары в корзине:");
        for(let id in this.itemsInCart) {
            let count = this.itemsInCart[id].count;
            let price = this.itemsInCart[id].price;
            let sum = count * price;
            let sumWithDiscount = this.culcSumWithDiscount(this.itemsInCart[id]);
            let str = `${id} ${this.itemsInCart[id].name} ${count} шт ${price} р. ${sum} р.`;
            if(sum !== sumWithDiscount)
                str += `, со скидкой ${sumWithDiscount}`;
            console.log(str);
        }
        let totalSumWithDiscount = this.culcTotalSumWithDiscount();
        let str = "Всего товаров " + Object.keys(this.itemsInCart).length + "шт, на сумму c учетом скидок " + totalSumWithDiscount;
        console.log(str);
    }
}
module.exports = Cart;
