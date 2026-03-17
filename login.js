const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("./users");
const { parseBody } = require("./helper");

const SECRET = "mysecretkey";

async function login(req, res) {
    try {
        const { username, password } = await parseBody(req);

        const user = users.find(u => u.username === username);

        if (!user) {
            res.writeHead(401, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ error: "User not found" }));
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            res.writeHead(401, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ error: "Wrong password" }));
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            SECRET,
            { expiresIn: "1h" }
        );

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ token }));

    } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: err }));
    }
}

module.exports = { login, SECRET };
