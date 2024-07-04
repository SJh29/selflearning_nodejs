const crudService = require("../services/crudUser.services");
async function getTokenUsername(token) {
  jsonPayload = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  );
  //console.log(jsonPayload);
  const _id = jsonPayload.userId;

  var data = await crudService.findOneData({ _id });
  return data.username;
}
module.exports = { getTokenUsername };
