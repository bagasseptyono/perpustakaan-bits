const AuthService = require("../services/auth.service");

class AuthController {
    static async registerUser(req, res, next){
        const data = req.body;
        const role = "member";
        try {
            const createUser = await AuthService.createUser(data, role);
            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'User data created successfully',
                data : createUser,
            });
        } catch (error) {
            next(error);
        }
    }

    static async loginUser(req, res, next){
        const data = req.body;
        try {
            const loginUser = await AuthService.loginUser(data);
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'User login successfully',
                data : loginUser,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthController;