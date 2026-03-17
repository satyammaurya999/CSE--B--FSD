const { login } = require("../services/authService");
const { parseBody } = require("../utils/helpers");

async function loginController(req, res) {
    try {
        const { username, password } = await parseBody(req);

        const result = await login(username, password);

        if (result.error) {
            res.writeHead(401, { "Content-Type": "application/json" });
            return res.end(JSON.stringify(result));
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));

    } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err }));
    }
}

module.exports = { loginController };
