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
                transactions: true
            },
        });
    }

    static async findAllMembers(filters) {
        const whereClause = {
            ...(filters.name && { name: { contains: filters.name } }), 
            ...(filters.email && { email: { contains: filters.email } }), 
            ...(filters.phone_number && { phone_number: { contains: filters.phone_number } }), 
            role: "member",
            member: {
                ...(filters.membership_number && { membership_number: { equals: filters.membership_number } }), 
                ...(filters.membership_start_date && { membership_start_date: { gte: new Date(filters.membership_start_date) } }), 
                ...(filters.membership_expiry_date && { membership_expiry_date: { lte: new Date(filters.membership_expiry_date) } }), 
            }
        };
        return await prisma.users.findMany({
            where: whereClause,
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
