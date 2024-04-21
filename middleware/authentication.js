const { verifyToken } = require("../utils");
const { fetchOne } = require("../models/users");

const authenticate = async (req, res, next) => {
    try {
        const authorizationHeader = req.get('Authorization');
        if (!authorizationHeader)
            return res.error("AUTHORIZATION_TOKEN_IS_REQUIRED");
        const token = authorizationHeader.replace('Bearer ', '');
        const decodedToken = verifyToken(token);
        const userConditions = { _id: decodedToken.id};
        const user = await fetchOne(userConditions);
        if (!user)
            return res.error("NOT_AUTHORIZED");
        if (user.status === "inactive")
            return res.error("ACCOUNT_INACTIVE");
        req.user = user;
        req.token = token;
        next();
    }
    catch (error) {
        res.error("INVALID_TOKEN");
    }
};
module.exports = authenticate;