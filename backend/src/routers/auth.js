const express = require("express");
const {
  getAllUsers,
  deleteUser,
  register,
  login,
  refresh,
} = require("../controllers/auth");
const router = express.Router();
const { authAdmin } = require("../middleware/auth");

router.post("/register", register);
router.get("/users", authAdmin, getAllUsers);
router.delete("/users/:id", authAdmin, deleteUser);
router.post("/login", login);
router.put("/refresh", refresh);

module.exports = router;
