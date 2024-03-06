

const CartModel = require("../models/cart.model.js");


class CartManager {

    async createCart() {
        try {
            const nuevoCarrito = new CartModel({
                products: []
            });
            await nuevoCarrito.save();
            return nuevoCarrito;
        } catch (error) {
            console.log("error al crear nuevo carrrito", error);
            throw error;
        }
    }

    async GetCartById(idcart) {
        try {
            const cart = await CartModel.findById(idcart);
            if(!cart){
                console.log("no hay carrito con ese id");
                return null;
            }
            return cart;
        } catch (error) {
            console.log("error al obtener un carrito por id", error);
            throw error;
        }
    }
    async AddProductToCart( idcart,idproduct, quantity = 1) {
               try {
                const carrito = await this.GetCartById(idcart);
                const existeProducto = carrito.products.find(item => item.product.toString() === idproduct);
                if(existeProducto) {
                    existeProducto.quantity += quantity;
                }else {
                    carrito.products.push({product: idproduct,quantity})
                }
                
                carrito.markModified("products");
                await carrito.save();
                return carrito;

               } catch (error) {
                  console.log("error al agregar un producto",error);
                  throw error;
               }
    }
}

module.exports = CartManager;