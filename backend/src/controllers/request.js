const pool = require("../db/db");

const addRequest = async (req, res) => {
  try {
    const { description, price, date, country, city } = req.body;
    console.log(
      "INSERT INTO request (description, price, date, country, city) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [description, price, date, country, city]
    );
    const newRequest = await pool.query(
      "INSERT INTO request(description, price, date, country, city) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [description, parseInt(price, 10), date, country, city]
    );
    res.json(newRequest);
  } catch (err) {
    console.error(err.message);
  }
};

const getRequest = async (req, res) => {
  try {
    const allRequests = await pool.query("SELECT * FROM request");
    res.json(allRequests.rows);
  } catch (err) {
    console.error(err.message);
  }
};

// const getTripById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const trip = await pool.query("SELECT * FROM trip WHERE id = $1", [id]);
//     res.json(trip.rows[0]);
//   } catch (err) {
//     console.error(err.mesaage);
//   }
// };

const updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, price, date, country, city } = req.body;
    const updateRequest = await pool.query(
      "UPDATE request SET description=$1, price=$2, date=$3, country=$4, city=$5 WHERE id = $6",
      [description, price, date, country, city, id]
    );
    res.json("Request updated");
  } catch (err) {
    console.error(err.mesaage);
  }
};

const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRequest = await pool.query(
      "DELETE FROM request WHERE id = $1",
      [id]
    );
    res.json("Request deleted");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { addRequest, getRequest, updateRequest, deleteRequest };
