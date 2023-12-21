const express = require("express");
const router = express.Router();

const {
  handleUserSignup,
  handleUserLogin,
  handleLogout,
} = require("../controllers/user");

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/signup", handleUserSignup);

router.post("/login", handleUserLogin);

router.get("/logout", handleLogout);

module.exports = router;
