const { auth: authMiddleware } = require('./AuthMiddleware');
const { notFound: notFoundMiddleware } = require('./notFound');
const { errorHandler: errorMiddleware } = require('./ErrorHandler');

module.exports = {
    authMiddleware,
    notFoundMiddleware,
    errorMiddleware,
}