const usersService = require("../services");

async function info(request, response, next) {
    try {
        const responseUsers = await usersService.info(request);
        return response.send(responseUsers);
    } catch(e) {
        next(e);
    }
}

module.exports = { info };