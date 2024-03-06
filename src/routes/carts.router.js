

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
module.exports = router;