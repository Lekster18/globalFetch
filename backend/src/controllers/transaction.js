const pool = require("../db/db");

const addTransaction = async (req, res) => {
  try {
    const { seller_name, buyer_name } = req.body;
    const newTransaction = await pool.query(
      "INSERT INTO transaction (seller_name, buyer_name) VALUES($1, $2) RETURNING *",
      [seller_name, buyer_name]
    );
    res.json(newTransaction);
  } catch (err) {
    console.error(err.message);
  }
};

const getUserTransaction = async (req, res) => {
  try {
    const { seller_name } = req.params;
    const transaction = await pool.query(
      "SELECT * FROM transaction WHERE seller_name = $1",
      [seller_name]
    );
    res.json(transaction.rows);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { addTransaction, getUserTransaction };
