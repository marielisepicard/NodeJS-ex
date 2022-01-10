const axios = require("axios");

const utils = require("../utils");

exports.getJobOffers = async (req, res) => {
  const { company } = req.params,
    url = `https://api.lever.co/v0/postings/${company}?mode=json`;
  axios
    .get(url)
    .then((result) =>
      res.status(200).json(utils.formatJobOffers(result.data, company, url))
    )
    .catch((error) =>
      res
        .status(404)
        .json(
          utils.generateErrorMessage("We don't have any data for this company")
        )
    );
};

exports.missingCompany = (req, res) => {
  res
    .status(200)
    .json(utils.generateErrorMessage("We need a company name to find data"));
};
