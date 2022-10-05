const { default: axios } = require("axios");
const { biositeLink } = require("../constants");

const biositeClient = axios.create({
  baseURL: biositeLink,
});

module.exports = biositeClient;
