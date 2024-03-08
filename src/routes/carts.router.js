

const express = require("express");
const router = express.Router();
const CartsManager = require("../controllers/carts-manager-db");
const cartmanager = new CartsManager();

//crear-inicializar carrito con array de productos vacio
router.post("/", async (req,res) => {
    
    try {
       const nuevocarrito = await cartmanager.createCart();
       
       res.json(nuevocarrito);
       //res.json({message: "carrito creado con exito"});
    } catch (error) {
       console.log("error al agregar carrito", error);
       res.status(500).json({error: "error del servidor"});
    }

})
//**------------------------------------------------------------------------- */

// agregar producto a carrito ingresando
router.post("/:cid/productos/:pid", async (req,res) => {
 
 let cId = req.params.cid;  // guardamos los parametros en cId y pId
 let pId = req.params.pid;
 try {
   const carrito = await cartmanager.AddProductToCart(cId,pId);  //llama al metodo AddProductToCart
       console.log(carrito);
       res.status(201).json({message: " producto agregado al carrito"});
   
 } catch (error) {
   console.log("error al cargar producto en el carrito",error);
   res.status(500).json({error: "error del servidor"});
 }
})
//**------------------------------------------------------------------------------ */
// mostrar todos los carritos
router.get("/", async (req,res) => {
   const carts = await cartmanager.GetCart();
   res.json(carts);
   console.log(carts);
})
//**------------------------------------------------------------------------------- */
// mostrar el carrito correspondiente a su id
router.get("/:cid", async (req,res) => {
    let cId = req.params.cid;
   try {
       const cart = await cartmanager.GetCartById(cId);
       res.json(cart);
       res.status(201).json({message: " carrrito encontrado"});
       console.log(cart);
   } catch (error) {
       console.log("error al buscar carrito",error);
       res.status(500).json({error: "error del servidor"});
   }
})
//**--------------------------------------------------- */
// mostrar los productos correspondiente al carrito id

router.get("/:cid", async (req, res) => {
    const cartId = req.params.cid;

    try {
        const carrito = await CartModel.findById(cartId)
            
        if (!carrito) {
            console.log("No existe ese carrito con el id");
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        return res.json(carrito.products);
    } catch (error) {
        console.error("Error al obtener el carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
//**----------------------------------------------------------------------------------- */

//eliminar producto de determinado carrito
router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        const updatedCart = await cartmanager.eliminarProductoDelCarrito(cartId, productId);

        res.json({
            status: 'success',
            message: 'Producto eliminado del carrito correctamente',
            updatedCart,
        });
    } catch (error) {
        console.error('Error al eliminar el producto del carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});
//**-------------------------------------------------------------- */

//actualizar producto del carrito
router.put('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const updatedProducts = req.body;
    // Debes enviar un arreglo de productos en el cuerpo de la solicitud

    try {
        const updatedCart = await cartmanager.actualizarCarrito(cartId, updatedProducts);
        res.json(updatedCart);
    } catch (error) {
        console.error('Error al actualizar el carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});
//**---------------------------------------------------------------- */

//actualizar las cantidades del producto de determinado carrito
router.put('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const newQuantity = req.body.quantity;

        const updatedCart = await cartmanager.actualizarCantidadDeProducto(cartId, productId, newQuantity);

        res.json({
            status: 'success',
            message: 'Cantidad del producto actualizada correctamente',
            updatedCart,
        });
    } catch (error) {
        console.error('Error al actualizar la cantidad del producto en el carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});
//**--------------------------------------------------------------------------- */

//vaciar carrito
router.delete('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        
        const updatedCart = await cartmanager.vaciarCarrito(cartId);

        res.json({
            status: 'success',
            message: 'Todos los productos del carrito fueron eliminados correctamente',
            updatedCart,
        });
    } catch (error) {
        console.error('Error al vaciar el carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});



module.exports = router;