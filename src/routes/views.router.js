

const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/product-manager-db");
const CartManager = require("../controllers/carts-manager-db.js");

const cartManager = new CartManager();
const productManager = new ProductManager();


//vista para los productos
router.get("/products", async (req,res) => {

    try {
        
        const { page = 1, limit = 2 } = req.query;
        
        const productos = await productManager.getProducts({
           page: parseInt(page),
           limit: parseInt(limit)
        });

        const nuevoArray = productos.docs.map(producto => {
            const { _id, ...rest } = producto.toObject();
            return rest;
         });

         res.render("productos", {
            productos: nuevoArray,
            hasPrevPage: productos.hasPrevPage,
            hasNextPage: productos.hasNextPage,
            prevPage: productos.prevPage,
            nextPage: productos.nextPage,
            currentPage: productos.page,
            totalPages: productos.totalPages
         });
   

    } catch (error) {
        console.log("error al mostrar los productos por id", error);
            throw error;
    }

})
//**--------------------------------------------------------------- */



// vista para los carritos
router.get("/carts/:cid", async (req, res) => {
    const cartId = req.params.cid;
 
    try {
       const carrito = await cartManager.GetCartById(cartId); // me traigo el carrito(id) en carrito
 
       if (!carrito) {
          console.log("No existe ese carrito con el id");
          return res.status(404).json({ error: "Carrito no encontrado" });
       }
 
       const productosEnCarrito = carrito.products.map(item => ({
          product: item.product.toObject(),
          //Lo convertimos a objeto para pasar las restricciones de Exp Handlebars. 
          quantity: item.quantity
       }));
 
 
       res.render("carts", { productos: productosEnCarrito });
    } catch (error) {
       console.error("Error al obtener el carrito", error);
       res.status(500).json({ error: "Error interno del servidor" });
    }
 });
 

module.exports = router;