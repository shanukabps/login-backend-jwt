module.exports = function (req, res, next) {
    // 401 Unauthorized
    // 403 Forbidden 
    //can call 2 middle ware function using [auth,admin]
    if (!req.user.isAdmin) return res.status(403).send('Access denied.');

    next();
}