const UserRepository = require("../repositories/user.repository");
const ErrHandler = require("../utils/error.util");
const JWTUtil = require("../utils/jwt.util");

class AuthMiddleware {
    static async authentication(req, res, next) {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if(!token) throw new ErrHandler(410, 'Unauthenticated');

            const decoded = await JWTUtil.verifyToken(token);
            const user = await UserRepository.findUserById(decoded.id);
            if(!user) throw new ErrHandler(410, 'Unauthenticated');

            req.user = {
                id: user.id,
                role: user.role
            }
            console.log(req.user)

            next();

        } catch (error) {
            next(error)
        }
    }

    static async authenticationAdmin(req, res, next){
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if(!token) throw new ErrHandler(410, 'Unauthenticated');

            const decoded = await JWTUtil.verifyToken(token);
            const user = await UserRepository.findUserById(decoded.id);
            if(!user) throw new ErrHandler(410, 'Unauthenticated');

            if (user.role != "admin") throw new ErrHandler(403, "Unauthorized")

            req.user = {
                id: user.id,
                role: user.role
            }
            console.log(req.user)

            next();

        } catch (error) {
            next(error)
        }
    }
}

module.exports = AuthMiddleware;
