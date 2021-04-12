const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  let response = await fetch("http://ip-api.com/json/");
  let place = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({ answer: "I'm in " + place.regionName + "!" })
  };
}
