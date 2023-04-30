const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers["user-token"];

    if (!token) {
        return res.status(401).send("A token is required for authentication")
    }
    try {
        const decodedUser = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decodedUser;
    } catch (err) {
        return res.status(401).send("Invalid token")
    }
    return next();
};
