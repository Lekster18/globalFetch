const express = require("express");
const {
  addTrip,
  getTrip,
  getTripById,
  updateTrip,
  deleteTrip,
} = require("../controllers/trip");
const router = express.Router();

router.post("/trip", addTrip);
router.get("/trip", getTrip);
router.get("/trip/:id", getTripById);
router.put("/trip/:id", updateTrip);
router.delete("/trip/:id", deleteTrip);

module.exports = router;
