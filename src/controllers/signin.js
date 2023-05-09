const usersService = require("../services");

async function signin(request, response, next) {
    try {
        const responseUsers = await usersService.signin(request.body);
        return response.send(responseUsers);
    } catch (e) {
        next(e);
    }
}

module.exports = { signin };