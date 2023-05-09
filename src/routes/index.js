const router = new require('express').Router()
const { signup, signin, info, ping, logout } = require('../controllers');
const { authMiddleware } = require('../middlewares');

router.get("/ping", ping);
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/info", authMiddleware, info);
router.get("/logout", authMiddleware, logout);

module.exports = {
    router,
}