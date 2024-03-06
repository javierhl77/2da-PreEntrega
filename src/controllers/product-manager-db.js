

const ProductModel = require("../models/product.model");

class ProductManager {

    async addProduct({title, description, price, img, code, stock, category, thumbnails}) {
        try {
            if(!title || !description || !price || !code || !stock || !category ){
                console.log("completar todos los campos");
                return
            }
            const existeProducto = await ProductModel.findOne({code: code});
            if(existeProducto){
                console.log("el codigo debe ser unico");
                return;
            }

           const nuevoProducto = new ProductModel({
            title,
            description,
            price,
            code,
            stock,
            category,
            status: true,
            thumbnails: thumbnails || []
           });

           await nuevoProducto.save();

        } catch (error) {
            console.log("error al agregar un producto", error);
            throw error;
        }
    }

    async getProducts() {

    
        try {
            const Productos = await ProductModel.paginate( {}, {limit, page});
             //recuperamos el docs:
        const productoResultadoFinal = Productos.docs.map( prod => {
        const {_id, ...rest} = prod.toObject();
        return rest;
        })

   

        } catch (error) {
            console.log("error al mostrar los productos", error);
            throw error;
        }
    }

    async getProductsById(id) {
        try {
            const producto = await ProductModel.findById(id)
            if(!producto){
                console.log("producto no encontrado")
                return null;
            }

            console.log("producto encontrado");
            return producto;
        } catch (error) {
            console.log("error al mostrar los productos por id", error);
            throw error;
        }
    }

    async updateProduct(id, productoActualizado){
          
        try {
            const updateProduct = await ProductModel.findByIdAndUpdate(id, productoActualizado);
            if(!updateProduct) {
             console.log("producto no encontrado")
             return null;
            } 
            console.log("producto acualizado");
            return updateProduct;

        } catch (error) {
            console.log("error al actualizar  producto por id", error);
            throw error;
        }
    }
    async deleteProduct(id) {
        try {
            const deleteProduct = await ProductModel.findByIdAndDelete(id);
            if(!deleteProduct) {
             console.log("producto no encontrado")
             return null;
            } 
            console.log("producto eliminado");
            return deleteProduct;

        } catch (error) {
            console.log("error al eliminar producto por id", error);
            throw error;
        }


    }
}

module.exports = ProductManager;