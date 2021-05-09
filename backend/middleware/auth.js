const jwt = require('jsonwebtoken');

const authUser = (request, response, next) => {
    let token = request.header('auth')
    jwt.verify(token, "thisismy#secret", (err, token) => {
        if (!err)
            next();
    })
}

    module.exports = authUser;