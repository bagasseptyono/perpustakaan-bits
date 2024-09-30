const MemberService = require("../services/member.service");

class MemberController {
    static async getAllMember(req, res, next){
        try {
            const members = await MemberService.getAllMember();
            const updatedMembers = members.map(member => {
                if (member.photo) {
                    member.photo = `${req.protocol}://${req.get('host')}/public/images/members/${member.photo}`;
                }
                return member; 
            });
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Members data retrieved successfully',
                data : updatedMembers,
            });
        } catch (error) {
            next(error)
        }
    }

    static async getDetailMember(req, res, next){
        try {
            const id = req.params.id;
            const member = await MemberService.getDetailMember(+id);
            member.photo = member.photo ? `${req.protocol}://${req.get('host')}/public/images/members/${member.photo}` : null;
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Member data retrieved successfully',
                data : member,
            });
        } catch (error) {
            next(error)
        }
    }

    static async updateMember(req, res, next){
        const id = req.params.id;
        const data = req.body;
        if (req.file) {
            data.photo = req.file.filename;
        }
        try {
            const member = await MemberService.updateMember(+id,data);
            member.photo = member.photo ? `${req.protocol}://${req.get('host')}/public/images/members/${member.photo}` : null;
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Member data updated successfully',
                data : member,
            });
        } catch (error) {
            next(error)
        }
    }

    static async addMember(req, res, next){
        const data = req.body;
        if (req.file) {
            data.photo = req.file.filename;
        }
        try {
            const member = await MemberService.addMember(data);
            const response = {
                name : data.name,
                membership_number : member.membership_number,
                membership_start_date : member.membership_start_date,
                membership_expiry_date : member.membership_expiry_date,
            }
            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'Member data created successfully',
                data : response,
            });
        } catch (error) {
            next(error)
        }
    }

    static async deleteMember(req, res, next){
        try {
            const id = req.params.id;
            const member = await MemberService.deleteMember(+id);
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Member data deleted successfully',
                data : null,
            });
        } catch (error) {
            next(error)
        }
    }

}

module.exports = MemberController;