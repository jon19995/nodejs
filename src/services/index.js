const fs = require("fs/promises");
const path = require("path");
const jwt = require("jsonwebtoken");

const usersFilePath = path.resolve(__dirname, "../db/users.dev.json");

async function signup(newUser) {
    const db = require(usersFilePath);
    const requireFields = ['username', 'password'];
    const includesRequireFields = requireFields.every((field) => newUser.hasOwnProperty(field));

    if (!includesRequireFields) {
        throw new Error('Не заполнены обязательные поля.');
    }

    const findUser = db.users.find((user) => _userMatch(user, newUser));
    const accessToken = _makeToken(newUser);

    if (findUser) {
        findUser.accessToken = accessToken;
    } else {
        newUser.accessToken = accessToken;
        db.users.push(newUser);
    }

    await fs.writeFile(usersFilePath, JSON.stringify(db, null, 2), "utf-8");

    return accessToken;
}

async function signin(user) {
    const db = require(usersFilePath);
    const findUser = db.users.find((u) => _userMatch(u, user));

    if (!findUser) {
        throw new Error('Пользователь с таким логином и паролем не найден.');
    }

    const accessToken = _makeToken(user);
    user.accessToken = accessToken;
    findUser.accessToken = accessToken;

    await fs.writeFile(usersFilePath, JSON.stringify(db, null, 2), "utf-8");

    return { accessToken };
}

async function info(req) {
    const { users } = require(usersFilePath);
    const accessToken = req.headers.authorization?.split(' ')[1];
    const user =  users.find((user) => user.accessToken === accessToken);

    if (!user || !accessToken) {
        throw new Error('Требуется авторизация.');
    }

    return user.username;
}

async function logout(req) {
    const db = require(usersFilePath);
    const accessToken = req.headers.authorization?.split(' ')[1];
    const user = db.users.find((user) => user.accessToken === accessToken);
    const all = req.query.all;

    if (!accessToken || !user) {
        throw new Error('Требуется авторизация.');
    }

    if (all) {
        db.users.forEach((user) => delete user.accessToken);
    } else {
        delete user.accessToken;
    }

    await fs.writeFile(usersFilePath, JSON.stringify(db, null, 2), "utf-8");

    return { status: 200 };
}

function _userMatch(userFirst, userSecond) {
    return userFirst.username === userSecond.username && userFirst.password === userSecond.password;
}

function _makeToken(user) {
    return jwt.sign({ ...user }, process.env.ACCESS_TOKEN_SECRET);
}

module.exports = {
    signin,
    signup,
    info,
    logout,
};
