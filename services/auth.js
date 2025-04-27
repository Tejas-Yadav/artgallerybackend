const jwt = require('jsonwebtoken'); // assuming you have DB access set up
const jwtSecret = process.env.jwt_secret_key;

exports.login = (req, res) => {
    const { userid, password } = req.query;

    if (userid == 'tejas' && password == 'tej123') {
        // 6. Generate JWT
        const token = jwt.sign(
            { userid: userid },
            jwtSecret,
            { expiresIn: process.env.jwt_expiration }
        );

        // 7. Return response
        res.status(200).json({
            message: 'Login success',
            token: token
        });
    }

    else {
        res.status(404).json({
            message: 'Username or password is incorrect'
        });
    }

}

exports.auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({
            status: 'fail',
            message: 'Unauthorized!',
        });
    }

    try {
        console.log("authHeader", req.headers);
        const token = authHeader.split(' ')[1];
        console.log('jwt_secret_key', process.env.jwt_secret_key);
        const user = jwt.verify(token, process.env.jwt_secret_key);
        req.user = user;
        console.log('user', user);
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({
            status: 'fail',
            message: 'Unauthorized!',
        });
    }
};