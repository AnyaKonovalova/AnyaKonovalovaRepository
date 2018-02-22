
function getItemByID(id){
    if(id < 0 || id >= Object.keys(allProducts).length)
        return undefined;
    else
        return {id: id, name: allProducts[id].name, price: allProducts[id].price};
}
module.exports.getItemByID = getItemByID;

let allProducts = {
    0: { name : "coffee", price : 250},
    1: { name : "tea", price : 150},
    2: { name : "milk", price : 55}
};
module.exports.allProducts = allProducts;




