const express = require("express");
const {
  addTransaction,
  getUserTransaction,
} = require("../controllers/transaction");
const router = express.Router();
const { authUser, authAdmin } = require("../middleware/auth");

router.post("/transaction", authUser, addTransaction);
router.get("/transaction/:seller_name", authUser, getUserTransaction);

module.exports = router;
