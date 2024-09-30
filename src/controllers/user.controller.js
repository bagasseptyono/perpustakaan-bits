const UserService = require("../services/user.service");

class UserController {
    static async getDetailUser(req, res, next){
        const id = req.user.id;
        try {
            const user = await UserService.getDetailUser(id);
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'User data retrieved successfully',
                data : user,
            });
        } catch (error) {
            next(error)
        }
    }

    static async updateUser(req, res, next){
        const id = req.user.id;
        const data = req.body;
        try {
            const user = await UserService.updateUser(id,data);
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'User data updated successfully',
                data : user,
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController;