const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const MongooseUsers = require("./src/daos/daoMongoSession");
const containerUser = new MongooseUsers();

passport.use(
  "register",
  new LocalStrategy(async (username, password, callback) => {
    const users = await containerUser.getAll();
    const userFound = users.find((us) => us.username == username);
    if (userFound) return callback();
    const passHashed = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = { username, password: passHashed };
    await containerUser.save(newUser);
    callback(null, newUser);
  })
);
passport.use(
  "autenticate",
  new LocalStrategy(async (username, password, callback) => {
    const users = await containerUser.getAll();
    const userFound = users.find((us) => us.username == username);
    if (!userFound || !bcrypt.compareSync(password, userFound.password)) return callback();
    callback(null,userFound)
  })
);
passport.serializeUser((newUser, callback) => {
  callback(null, newUser.username);
});

passport.deserializeUser(async (username, callback) => {
  const users = await containerUser.getAll();
  const user = users.find((us) => us.username == username);
  callback(null, user);
});

module.exports = passport;
