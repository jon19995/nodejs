const { info } = require("./info");
const { ping } = require("./ping");
const { signin } = require("./signin");
const { signup } = require("./signup");
const { logout } = require("./logout");

module.exports = {
    info,
    ping,
    logout,
    signin,
    signup,
};