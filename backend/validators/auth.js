const { body } = require("express-validator");

const validateRegistrationData = [
  body("name", "name is required").not().isEmpty(),
  body("password", "password is required").not().isEmpty(),
  body("password", "password min is 1 and max is 20").isLength({
    min: 1,
    max: 20,
  }),
];

const validateLoginData = [
  body("name", "name is required").not().isEmpty().isEmail(),
  body("password", "password is required").not().isEmpty(),
];

const validateRefreshToken = [
  body("refresh", "refresh token is required")
    .not()
    .isEmpty()
    .isLength({ min: 1 }),
];

module.exports = {
  validateRegistrationData,
  validateLoginData,
  validateRefreshToken,
};
