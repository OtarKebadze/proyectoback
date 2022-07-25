const express = require("express");
const passport = require("passport");
const router = express.Router();
const { containerCart } = require("./src/index");
const { containerProd } = require("./src/index");
const MongooseUsers = require("./src/daos/daoMongoSession");
const containerUser = new MongooseUsers();
const { autenticationUser, authorizeUser } = require("./src/middleware/admin");


// PRODUCTS
router.get("/", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/main", (req,res)=>{
    res.render("index");
})
router.post("/login", passport.authenticate("autenticate",
{failureRedirect: '/api/error_user',failureMessage: true}
),(req,res)=>{
    req.session.username = req.body.username;
    res.redirect("/api/main");
});
router.delete("/users", async (req, res) => {
  res.send(await containerUser.deleteAll());
});

router.get("/users", async (req, res) => {
  res.send(await containerUser.getAll());
});

router.get("/error_user", (req,res)=>{
  res.send(`
  <div>
  <h1>INVALID INFORMATION</h1>
  <a href="http://localhost:8080/api/register">GO TO REGISTER</a>
  </div>
  `)
})
router.post("/register", passport.authenticate("register",
{failureRedirect: '/api/error_user',failureMessage: true}
),(req, res) => {
  console.log(req.isAuthenticated())
  res.redirect("/api/")
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    console.log("HOPE TO SEE YOU SOON");
    if (req.session == undefined) {
      setTimeout(() => {
        res.redirect("/api/");
      }, 2000);
    }
  });
});

router.get("/products/:id?", async (req, res) => {
  const id = req.params.id;
  id == undefined
    ? res.send(await containerProd.getAll())
    : res.send(await containerProd.getById(id));
});

router.post("/products/create", async (req, res) => {
  await containerProd.save(req.body);
  res.send(await containerProd.getAll());
  console.log("PRODUCT ADDED SUCCESFULLY");
});

router.delete("/delete/:id?", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  if (id == undefined) {
    await containerProd.deleteAll();
    res.send(await containerProd.getAll());
  } else {
    await containerProd.deleteById(id);
    res.send(await containerProd.getAll());
  }
});

//  CART
router.get("/cart/:id?", async (req, res) => {
  const id = req.params.id;
  !id
    ? res.send(await containerCart.getAll())
    : res.send(await containerCart.getById(id));
});

router.post("/:id_cart/products/:id_prod", async (req, res) => {
  let idProd = req.params.id_prod;
  let idCart = req.params.id_cart;
  let data = await containerCart.getById(idCart);
  console.log(data);
  if (data == undefined || data.length <= 0) {
    let cart = await containerCart.createCart();
    console.log(cart);
    await containerCart.save(cart);
    res.status(404).send("CARRITO INEXISTENTE... creando...");
  } else {
    let prod = await containerProd.getById(idProd);
    let cart = await containerCart.getById(idCart);
    let arr = cart;
    if (arr.products == undefined) {
      console.log("MONGOOSE");
      arr[0].products.push(prod);
      let newArr = arr[0].products;
      console.log(newArr);
      console.log(arr[0].products);
      await containerCart.addProd(idCart, newArr);
      res.status(200).send(await containerCart.getAll());
    } else {
      console.log("FIREBASE");
      arr.products.push(prod);
      console.log(arr);
      console.log(arr.products);
      await containerCart.addProd(idCart, arr);
      res.status(200).send(await containerCart.getAll());
    }
  }
});

router.delete("/cart/delete/:id", async (req, res) => {
  let id = req.params.id;
  await containerCart.deleteById(id);
  res.status(200).send(await containerCart.getAll());
});

router.delete("/cart/delete", async (req, res) => {
  console.log(await containerCart.deleteAll());
});

module.exports = router;
