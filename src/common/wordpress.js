const WPAPI = require("wpapi");
require("dotenv").config();

module.exports.wp = new WPAPI({
  endpoint: "https://theideaofnorth2.com/wordpress/wp-json",
  username: process.env.WORDPRESS_USERNAME,
  password: process.env.WORDPRESS_PASSWORD,
});
