const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../db/users");

const SECRET_KEY = "mysecretkey";

async function login(username, password) {
    const user = users.find(u => u.username === username);

    if (!user) {
        return { error: "User not found" };
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return { error: "Invalid password" };
    }

    const token = jwt.sign(
        { id: user.id, username: user.username },
        SECRET_KEY,
        { expiresIn: "1h" }
    );

    return { token };
}

module.exports = { login };
