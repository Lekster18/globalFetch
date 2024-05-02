const pool = require("../db/db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, country, city, role FROM users"
    );
    const users = result.rows;

    const outputArray = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      country: user.country,
      city: user.city,
      role: user.role,
    }));

    res.json(outputArray);
  } catch (error) {
    console.error(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [
      id,
    ]);
    res.json("User deleted");
  } catch (err) {
    console.error(err.message);
  }
};

const register = async (req, res) => {
  try {
    const auth = await pool.query("SELECT * FROM users WHERE name = $1", [
      req.body.name,
    ]);
    if (auth.rowCount > 0) {
      return res.status(400).json({
        status: "error",
        msg: "This username has already been taken. Please choose another username.",
      });
    }
    const hash = await bcrypt.hash(req.body.password, 12);
    await pool.query(
      "INSERT INTO users (name, password, email, country, city, role) VALUES($1, $2, $3, $4, $5, $6)",
      [
        req.body.name,
        hash,
        req.body.email,
        req.body.country,
        req.body.city,
        req.body.role || "User",
      ]
    );
    res.json({ status: "ok", msg: "User created successfully." });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error registering" });
  }
};

const login = async (req, res) => {
  try {
    const auth = await pool.query("SELECT * FROM users WHERE name = $1", [
      req.body.name,
    ]);
    if (auth.rowCount === 0) {
      return res.status(400).json({
        status: "error",
        msg: "Username/Password is incorrect. Please try again.",
      });
    }
    const result = await bcrypt.compare(
      req.body.password,
      auth.rows[0].password
    );
    if (!result) {
      console.error("username or password error");
      return res.status(401).json({
        status: "error",
        msg: "Username/Password is incorrect. Please try again",
      });
    }
    const claims = {
      name: auth.rows[0].name,
      role: auth.rows[0].role,
    };
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });
    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });
    res.json({ access, refresh });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error login" });
  }
};

const refresh = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);

    const claims = {
      name: decoded.name,
      role: decoded.role,
    };
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });
    res.json({ access });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error refresh" });
  }
};

module.exports = { getAllUsers, deleteUser, register, login, refresh };
