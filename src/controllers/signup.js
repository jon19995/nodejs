const usersService = require("../services");

async function signup(request, response, next) {
    try {
        const responseUsers = await usersService.signup(request.body);
        return response.send(responseUsers);
    } catch(e) {
        next(e);
    }
}

module.exports = { signup };