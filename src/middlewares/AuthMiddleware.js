const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            throw new Error('Требуется Авторизация')
        }

        next();
    } catch (e) {
        next(e)
    }
}

module.exports = {
    auth,
}