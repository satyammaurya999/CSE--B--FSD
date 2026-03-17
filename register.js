const bcrypt = require("bcrypt");
const users = require("./users");
const { parseBody } = require("./helper");

async function register(req, res) {
    try {
        const { username, password } = await parseBody(req);

        const exists = users.find(u => u.username === username);

        if (exists) {
            res.writeHead(400, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ error: "User already exists" }));
        }

        const hashed = await bcrypt.hash(password, 10);

        users.push({
            id: users.length + 1,
            username,
            password: hashed
        });

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User registered" }));

    } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: err }));
    }
}

module.exports = register;
