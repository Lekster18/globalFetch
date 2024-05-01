const express = require("express");
const {
  getAllUsers,
  register,
  login,
  refresh,
} = require("../controllers/auth");
const router = express.Router();

router.post("/register", register);
router.get("/users", getAllUsers);
router.post("/login", login);
router.put("/refresh", refresh);

module.exports = router;
