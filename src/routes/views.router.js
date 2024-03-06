

const express = require("express");
const router = express.Router();

router.get("/", async(req,res) => {
    
    res.render("productos", {

        productos : productoResultadoFinal,
        hasPrevPage: Productos.hasPrevPage,
        hasNextPage: Productos.hasNextPage,
        prevPage: Productos.prevPage,
        nextPage: Productos.nextPage,
        currentPage: Productos.page,
        totalPages: Productos.totalPages

})


})

module.exports = router;