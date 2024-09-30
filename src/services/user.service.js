const UserRepository = require("../repositories/user.repository");
const ErrHandler = require("../utils/error.util");
const bcrypt = require("bcrypt");

class UserService {
    static async getDetailUser(id) {
        const user = await UserRepository.findUserById(id);
        if (!user) throw new ErrHandler(404, "User Not Found");
        const { password, created_at, updated_at, ...userData } = user;

        return userData;
    }

    static async updateUser(id, payload) {
        const getUser = await UserRepository.findUserById(id);
        if (!getUser) throw new ErrHandler(404, "User Not Found");

        if (payload.email) {
            const getUserEmail = await UserRepository.findUserByEmail(payload.email)
            if (getUserEmail && getUserEmail.id !== parseInt(id)) throw new ErrHandler(400, "Emaail has been used");
        }

        if (payload.password) {
            const password = await bcrypt.hash(payload.password, 10);
            payload.password = password;
        }

        const user = await UserRepository.updateUserById(id, payload);
        if (!user) throw new ErrHandler(500, "Error when update user");

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone_number: user.phone_number,
            address: user.address,
            photo: user.photo,
        };
    }
}

module.exports = UserService;
