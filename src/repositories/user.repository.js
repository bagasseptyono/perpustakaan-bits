const prisma = require("../config/prisma.config");

class UserRepository {
    static async addUser(payload) {
        return await prisma.users.create({ data: payload });
    }
    static async findUserByEmail(email) {
        return await prisma.users.findUnique({
            where: {
                email: email,
            },
        });
    }
    static async findUserById(id) {
        return await prisma.users.findUnique({
            where: {
                id: id,
            },
            include: {
                member: true,
            },
        });
    }

    static async findAllMembers() {
        return await prisma.users.findMany({
            where: {
                role: "member",
            },
            include: {
                member: true,
            },
        });
    }

    static async updateUserById(id, payload) {
        return await prisma.users.update({
            where: {
                id: id,
            },
            data: { ...payload },
        });
    }

    static async deleteUserById(id) {
        return  await prisma.users.delete({
                where: {
                    id: id,
                },
            });
    }
}

module.exports = UserRepository;
