const pool = require("../db/db");

const addTrip = async (req, res) => {
  try {
    const { country, city, start_date, end_date, user_name } = req.body;
    const newTrip = await pool.query(
      "INSERT INTO trip (country, city, start_date, end_date, user_name) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [country, city, start_date, end_date, user_name]
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

const getTripByUser = async (req, res) => {
  try {
    const { user_name } = req.params;
    const trip = await pool.query("SELECT * FROM trip WHERE user_name = $1", [
      user_name,
    ]);
    res.json(trip.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const updateTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const { country, city, start_date, end_date } = req.body;
    const updateTrip = await pool.query(
      "UPDATE trip SET country = $1, city =$2, start_date=$3, end_date=$4 WHERE id = $5",
      [country, city, start_date, end_date, id]
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

module.exports = { addTrip, getTrip, getTripByUser, updateTrip, deleteTrip };
