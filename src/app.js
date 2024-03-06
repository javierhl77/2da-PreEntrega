//** 2da PreEntrega */
// alumno : JAVIER LEZCANO 
// comision: 50045

const express = require("express");

const app = express();
const productsRouter = require("./routes/products.Router.js");
const cartsRouter = require ("./routes/carts.router.js");
const mongoose = require("mongoose");

const viewsRouter = require("./routes/views.router");

//const coneccion = require("./database.js");

//const socket = require("socket.io");

const PUERTO = 8080;
 const exphbs = require ("express-handlebars");

 //configurar handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//
//conectar con base de datos
mongoose.connect("mongodb+srv://javier1977:coderhouse@cluster0.mryvwa7.mongodb.net/E-commerce?retryWrites=true&w=majority&appName=Cluster0 ")
  .then(() => console.log("coneccion exitosa"))
  .catch( () => console.log("error en la coneccion"));


//middleware

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));

//routing
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

//guardar una referencia de express 
const httpServer = app.listen(PUERTO, () => {
    console.log(`escuchando en el puerto : ${PUERTO}` );
})