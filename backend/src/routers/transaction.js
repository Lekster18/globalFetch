const express = require("express");
const {
  addTransaction,
  getUserTransaction,
  getTransaction,
  updateTransaction,
} = require("../controllers/transaction");
const router = express.Router();
const { authUser, authAdmin } = require("../middleware/auth");

router.post("/transaction", authUser, addTransaction);
router.post("/transaction/:seller_name", authUser, getUserTransaction);
router.get("/transaction/", authAdmin, getTransaction);
router.put("/transaction/:id", authAdmin, updateTransaction);

module.exports = router;
