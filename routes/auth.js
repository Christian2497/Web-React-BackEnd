const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/user");
const uploadCloud = require("../config/cloudinary");

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require("../helpers/middlewares");


router.post(
  "/signup",
  isNotLoggedIn(),
  validationLoggin(),
  async (req, res, next) => {
    const { username, email, weight, goal, password, repeatPassword } = req.body;

    try {
      const emailExists = await User.findOne({ email }, "email");
      if (emailExists) {
        return next(createError(400))
      } else if (password !== repeatPassword) {
        return next(createError(400))
      }
      else {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPass = bcrypt.hashSync(password, salt);
        const newUser = await User.create({ username, email, weight, goal, password: hashPass });
        req.session.currentUser = newUser;
        res
          .status(200) 
          .json(newUser);
      }
    } catch (error) {
      next(error);
    }
  }
);

//'/login'


router.post(
  "/login",
  isNotLoggedIn(),
  validationLoggin(),
  async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        next(createError(404));
      }
      else if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.status(200).json(user);
        return;
      } else {
        next(createError(401));
      }
    } catch (error) {
      next(error);
    }
  }
);
 //log out
router.post("/logout", isLoggedIn(), (req, res, next) => {
  req.session.destroy();
  res
    .status(204)
    .send();
  return;
});

//'/private'

router.get("/profile", isLoggedIn(), (req, res, next) => {
  res
    .status(200)
    .json({ message: " User is logged in" });
});

// GET '/me'

// chequea si el usuario está logueado usando la función helper (chequea si existe la sesión)
router.get("/me", isLoggedIn(), (req, res, next) => {
  // si está logueado, previene que el password sea enviado y devuelve un json con los datos del usuario (disponibles en req.session.currentUser)
  req.session.currentUser.password = "*";
  res.json(req.session.currentUser);
});

module.exports = router;
