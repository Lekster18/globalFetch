const pool = require("../db/db");

const addTransaction = async (req, res) => {
  try {
    const { seller_name, buyer_name, request_id, status } = req.body;
    const newTransaction = await pool.query(
      "INSERT INTO transaction (seller_name, buyer_name, request_id, status) VALUES($1, $2, $3, $4) RETURNING *",
      [seller_name, buyer_name, request_id, status]
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
      "SELECT * FROM transaction JOIN request ON transaction.request_id = request.id WHERE seller_name = $1",
      [seller_name]
    );
    res.json(transaction.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const getTransaction = async (req, res) => {
  try {
    const allTransactions = await pool.query("SELECT * FROM transaction");
    res.json(allTransactions.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updateTransaction = await pool.query(
      "UPDATE Transaction SET status='approved' WHERE id = $1 RETURNING *",
      [id]
    );
    res.json(updateTransaction.rows[0]);
  } catch (err) {
    console.error(err.mesaage);
  }
};
module.exports = {
  addTransaction,
  getUserTransaction,
  getTransaction,
  updateTransaction,
};
