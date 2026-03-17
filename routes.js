const { loginController } = require("./controllers/authController");

function routes(req, res) {

    if (req.method === "POST" && req.url === "/login") {
        return loginController(req, res);
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
}

module.exports = routes;
