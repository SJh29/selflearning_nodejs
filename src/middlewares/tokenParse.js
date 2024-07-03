const jwt = require("jsonwebtoken");
const crudService = require("../services/crud.services");
async function getTokenUsername(token) {
  jsonPayload = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  );
  //console.log(jsonPayload);
  _id = jsonPayload.userId;

  var data = await crudService.findOneData({ _id });
  return data.username;
}
module.exports = { getTokenUsername };
