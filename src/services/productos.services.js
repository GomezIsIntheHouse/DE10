const products = []
class Producto{
    constructor(){}

    getProducto(){
        return products
    }
    postProduct(product){
        products.push(product)
        return product
    }

}

module.exports = Producto;