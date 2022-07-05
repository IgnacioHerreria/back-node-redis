const jwt = require("jsonwebtoken");
const auth = require("../api/components/auth");
const config = require("../config");
const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret);
}

function verify(token) {
    return jwt.verify(token, secret);
}

const check = {
    own: function(req, idOwner) {
        const decode = decodeHeader(req);
        console.log(decode);
    },
};

function decodeHeader(req) {
    const authorization = req.headers.authorization || "";
    const token = getToken(authorization);
    const decoded = verify(token);
    req.user = decoded;
    return req.user;
}

function getToken(authorization) {
    if (!auth) {
        throw new Error("There isn't token");
    }
    if (auth.indexOf("Bearer ") === -1) {
        throw new Error("The format of token is incorrect");
    }
    return auth.replace("Bearer ", "");
}

module.exports = { sign };