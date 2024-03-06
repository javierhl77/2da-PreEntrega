

const express = require("express");
const router = express.Router();

//importar productManager y crear una instancia de productmanager
const Productmanager = require("../controllers/product-manager-db.js");
const productManager = new Productmanager();

router.get("/", async (req, res) => {

    
    try {
        //const limit = req.query.limit;
        const productos = await productManager.getProducts(req.query.page || 1,
            req.query.limit || 10);

        
    } catch (error) {
        console.log("Error al obtener los productos", error);
        res.status(500).json({ error: "Error del servidor" });
    }

})

// devolver el producto correspondiente a su id
router.get("/:pid", async (req,res) => {
     let id = req.params.pid;
     try {
        const productos = await productManager.getProductsById(id)
        if (!productos){
            res.json({
                error: "producto no encontrado"
            })
        } else {
            res.json(productos)
        }
     } catch (error) {
        console.log("Error al obtener los productos", error);
        res.status(500).json({ error: "Error del servidor" });
     }


})

router.post("/", async (req,res) => {
     const nuevoProducto = req.body;
     console.log(nuevoProducto);
     try {
        await productManager.addProduct(nuevoProducto),
        res.status(201).json({message: "producto agregado con exito"});
     } catch (error) {
        console.log("error al agregar producto", error);
        res.status(500).json({error: "error del servidor"});
     }

})

router.put("/:pid", async(req,res) => {
    let id = req.params.pid;
    const productoActualizado = req.body;
    try {
        await productManager.updateProduct(id,productoActualizado )
        res.json({message: "producto actualizado corectanmente"});
    } catch (error) {
        console.log("no pudo actualizar");
        res.status(500).json({error: "error del server"});

    }
});

router.delete("/:pid", async(req,res) => {

    const id = req.params.pid;

    try {
        await productManager.deleteProduct(id);
        res.json({
            message: "producto eliminado con exito"
        })
    } catch (error) {
        console.error("error al eliminar producto, error");
        res.status(500).json({
            error: "error nterno del servidor"
        });
    }
});


module.exports = router;
