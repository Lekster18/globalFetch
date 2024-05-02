const express = require("express");
const {
  addRequest,
  getRequest,
  getRequestByUser,
  updateRequest,
  deleteRequest,
} = require("../controllers/request");
const router = express.Router();
const { authUser } = require("../middleware/auth");

router.post("/request", authUser, addRequest);
router.get("/request", authUser, getRequest);
router.get("/request/:user_name", authUser, getRequestByUser);
router.put("/request/:id", authUser, updateRequest);
router.delete("/request/:id", authUser, deleteRequest);

module.exports = router;
