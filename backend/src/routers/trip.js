const express = require("express");
const {
  addTrip,
  getTrip,
  getTripByUser,
  updateTrip,
  deleteTrip,
} = require("../controllers/trip");
const router = express.Router();
const { authUser } = require("../middleware/auth");

router.post("/trip", authUser, addTrip);
router.get("/trip", authUser, getTrip);
router.get("/trip/:user_name", authUser, getTripByUser);
router.put("/trip/:id", authUser, updateTrip);
router.delete("/trip/:id", authUser, deleteTrip);

module.exports = router;
