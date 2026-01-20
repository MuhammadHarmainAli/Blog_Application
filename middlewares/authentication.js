const { validateToken } = require("../services/authentication");

const checkAuth = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        req.user = null;
        return next();
    }

    try {
        const user = validateToken(token);
        req.user = user
    } catch (error) {
        req.user = null;
    }

    next();
}

module.exports = checkAuth