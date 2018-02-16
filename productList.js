const CartItem = require('./cartItem');

function getItemByID(id){
    if(id < 0 || id >= Object.keys(allProducts).length)
        return undefined;
    else
        return new CartItem.CartItem(id, allProducts[id].name, allProducts[id].price);
}
module.exports.getItemByID = getItemByID;

var AllProducts = (function () {
    var instance;

    function createInstance() {
        var object = {
            0: { name : "coffee", price : 250},
            1: { name : "tea", price : 150},
            2: { name : "milk", price : 55}
        };
        return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

let allProducts = AllProducts.getInstance();

module.exports.allProducts = allProducts;




