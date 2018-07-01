const request = require("request");
const DirectusRemoteInstance = require("directus-sdk-javascript/remote");
require("dotenv").config();

module.exports.getDirectusClient = async () => {
  const apiUri = process.env.DIRECTUS_API_URI;
  const getDirectusToken = async () =>
    new Promise((resolve, reject) => {
      const authRequestPayload = {
        headers: { "content-type": "application/x-www-form-urlencoded" },
        url: `${apiUri}auth/request-token`,
        form: {
          email: process.env.DIRECTUS_EMAIL,
          password: process.env.DIRECTUS_PASSWORD,
        },
      };
      request.post(authRequestPayload, (error, response, body) => {
        if (error) return reject(error);
        return resolve(JSON.parse(body).data.token);
      });
    });

  const directusToken = await getDirectusToken();

  return new DirectusRemoteInstance({
    url: apiUri,
    accessToken: [directusToken],
  });
};
