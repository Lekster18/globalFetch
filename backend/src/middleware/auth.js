const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", msg: "no token found" });
  }

  const token = req.headers["authorization"].replace("Bearer ", "");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      req.decoded = decoded;
      req.user_id = decoded.id;
      next();
    } catch (error) {
      console.error(error.message);
      return res.status(401).json({ status: "error", msg: "unauthorised" });
    }
  } else {
    return res.status(403).json({ status: "error", msg: "missing token" });
  }
};

const authAdmin = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", msg: "no token found" });
  }

  const token = req.headers["authorization"].replace("Bearer ", "");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      if (decoded.role === "admin") {
        req.decoded = decoded;
        req.user_id = decoded.user_id;
        next();
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error.message);
      return res.status(401).json({ status: "error", msg: "unauthorised" });
    }
  } else {
    return res.status(403).json({ status: "error", msg: "missing token" });
  }
};

module.exports = { authUser, authAdmin };
