const axios = require("axios");

const utils = require("../utils");

exports.wrongUrl = (req, res) => {
  res
    .status(200)
    .json(
      utils.generateErrorMessage("You are not using the good url to get data")
    );
};
