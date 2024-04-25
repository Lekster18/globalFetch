const express = require("express");
const {
  addRequest,
  getRequest,
  updateRequest,
  deleteRequest,
} = require("../controllers/request");
const router = express.Router();

router.post("/request", addRequest);
router.get("/request", getRequest);
router.put("/request/:id", updateRequest);
router.delete("/request/:id", deleteRequest);

module.exports = router;
