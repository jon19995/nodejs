const usersService = require("../services");

async function logout(request, response, next) {
    try {
        const responseUsers = await usersService.logout(request);
        return response.send(responseUsers);
    } catch(e) {
        next(e);
    }
}

module.exports = { logout };