const errorHandler = (err, req, res, next) => {
    const { message = 'Ошибка', status = 500 } = err;
    return res.status(status).json({ message })
}

module.exports = {
    errorHandler,
}