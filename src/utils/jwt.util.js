const jwt = require("jsonwebtoken");
const { JWTSECRET } = require("../config/app.config")

class JWTUtil {
    static async generateToken(user){
        return jwt.sign({ id: user.id, email: user.email}, JWTSECRET);
    }
    static async verifyToken(token){
        return jwt.verify(token, JWTSECRET);
    }
}

module.exports = JWTUtil;