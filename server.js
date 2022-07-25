const express = require("express");
require("dotenv").config();
const passport = require("./passport");
const router = require("./router");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const coockieParser = require("cookie-parser");
const advanceOptions = { useNewUrlParser: true, useUnifiedTopology: true };
app.use(coockieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost/sessions",
      mongoOptions: advanceOptions,
    }),
    secret: "Otar",
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      maxAge: 60000,
      secure: true
    },
  })
);
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.set("views", "./public/views/");
app.set("view engine", "ejs");
app.use("/api", router);

// ENDPOINTS PARA PRODUCTOS

app.use("/api", router);
// ENDPOINTS PARA CARRITO

app.use("/api/cart", router);

// INICIO SERVIDOR
app.listen(port, () => {
  console.log(`ESTOY CORRIENDO EN EL PUERTO : http://localhost:${port}`);
});
