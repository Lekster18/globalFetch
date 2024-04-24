const pool = require("../db/db");

const addTrip = async (req, res) => {
  try {
    const { start_date } = req.body;
    const newTrip = await pool.query(
      "INSERT INTO trip (start_date) VALUES($1) RETURNING *",
      [start_date]
    );
    res.json(newTrip);
  } catch (err) {
    console.error(err.message);
  }
};

const getTrip = async (req, res) => {
  try {
    const allTrips = await pool.query("SELECT * FROM trip");
    res.json(allTrips.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const getTripById = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await pool.query("SELECT * FROM trip WHERE id = $1", [id]);
    res.json(trip.rows[0]);
  } catch (err) {
    console.error(err.mesaage);
  }
};

const updateTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const { start_date } = req.body;
    const updateTrip = await pool.query(
      "UPDATE trip SET start_date = $1 WHERE id = $2",
      [start_date, id]
    );
    res.json("Trip updated");
  } catch (err) {
    console.error(err.mesaage);
  }
};

const deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTrip = await pool.query("DELETE FROM trip WHERE id = $1", [id]);
    res.json("Trip deleted");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { addTrip, getTrip, getTripById, updateTrip, deleteTrip };
