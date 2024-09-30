const prisma = require('../config/prisma.config');
const ErrHandler = require('../utils/error.util');

class MemberRepository {
    static async addMember(payload){
        return await prisma.members.create({ data: payload });
    }

    static async updateMemberByUserId(userId, payload){
        return await prisma.members.update({
            where: {
                user_id: userId,
            },
            data: {...payload}
        })
    }

    static async findMemberByUserId(userId){
        return await prisma.members.findUnique({
            where: {
                user_id: userId
            }
        })
    }

    static async deleteMemberByUserId(userId) {
        try {
            const member = await prisma.members.findUnique({
                where: {
                    user_id: userId,
                },
            });
            
            if (!member) {
                throw new ErrHandler(404, "Member not found");
            }
            return await prisma.members.delete({
                where: {
                    user_id: userId,
                },
            });
        } catch (error) {
            throw new ErrHandler(500, "Error deleting member");
        }
    }

}

module.exports = MemberRepository