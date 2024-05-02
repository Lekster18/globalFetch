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
const {
  validateRegistrationData,
  validateLoginData,
  validateRefreshToken,
} = require("../../validators/auth");
const { errorCheck } = require("../../validators/errorCheck");

router.post("/register", register, validateRegistrationData, errorCheck);
router.get("/users", authAdmin, getAllUsers);
router.delete("/users/:id", authAdmin, deleteUser);
router.post("/login", login, validateLoginData, errorCheck);
router.put("/refresh", refresh, validateRefreshToken, errorCheck);

module.exports = router;
