const MongooseProducts = require("./daos/products/daoMongooseProducts");
const MongooseCart= require("./daos/carts/daoCartMongoose");
const FirebaseProducts = require("./daos/products/daoFirebaseProducts");
const FirebaseCart= require("./daos/carts/daoCartFirebase");

let containerCart;
let containerProd;


if (process.env.DB == "mongoose") {
   containerCart=  new MongooseCart();
   containerProd= new MongooseProducts();
} else {
    containerCart= new FirebaseCart();
    containerProd= new FirebaseProducts();
};


module.exports = {containerCart, containerProd}

