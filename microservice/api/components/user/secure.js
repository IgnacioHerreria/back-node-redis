const auth = require("../../../auth");

module.exports = function checkAuth(action) {
    function middleware(req, res, next) {
        switch (action) {
            case "edit":
                //
                auth.check.own();
                break;
            default:
                next();
        }
    }

    return { middleware };
};