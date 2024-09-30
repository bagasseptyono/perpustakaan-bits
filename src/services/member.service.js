const MemberRepository = require("../repositories/member.repository");
const UserRepository = require("../repositories/user.repository");
const ErrHandler = require("../utils/error.util");
const bcrypt = require("bcrypt");
const MembershipUtil = require("../utils/membership.util");
const FsUtil = require("../utils/fs.util");

class MemberService {
    static async addMember(payload) {
        const getUser = await UserRepository.findUserByEmail(payload.email);
        if (getUser) throw new ErrHandler(400, "Email has been Used");

        const password = await bcrypt.hash(payload.password, 10);
        payload.password = password;

        payload.role = "member";
        const userData = {
            name: payload.name,
            email: payload.email,
            password: payload.password,
            role: payload.role,
            phone_number: payload.phone_number,
            address: payload.address,
            photo: payload.photo || null
        };
        const createUser = await UserRepository.addUser(userData);
        if (!createUser) throw new ErrHandler(500, "Error When add user");

        const membershipNumber = await MembershipUtil.generateMembershipNumber(
            createUser.id
        );
        const membershipStartDate = payload.membership_start_date
            ? new Date(payload.membership_start_date)
            : new Date();
        let membershipExpiryDate;
        if (payload.membership_expiry_date) {
            membershipExpiryDate = new Date(payload.membership_expiry_date);
        } else {
            membershipExpiryDate = new Date(membershipStartDate.getTime());
            membershipExpiryDate.setFullYear(membershipStartDate.getFullYear() + 5);
        }

        const member = {
            user_id: createUser.id,
            membership_number: membershipNumber,
            membership_start_date: membershipStartDate,
            membership_expiry_date: membershipExpiryDate,
        };

        const createMember = await MemberRepository.addMember(member);
        if (!createMember) throw new ErrHandler(500, "Error When add Member");

        return createMember;
    }

    static async getDetailMember(id) {
        const user = await UserRepository.findUserById(id);
        if (!user) throw new ErrHandler(404, "User Not Found");

        const { password, created_at, updated_at, ...userData } = user;

        return userData;
    }
    static async getAllMember() {
        const users = await UserRepository.findAllMembers();
        const sanitizedUsers = users.map((user) => {
            const { password, created_at, updated_at, ...userData } = user;
            return userData;
        });

        return sanitizedUsers;
    }

    static async updateMember(id, payload) {
        const getUser = await UserRepository.findUserById(id);
        if (!getUser) throw new ErrHandler(404, "Member Not Found");

        if (payload.email) {
            const getUserEmail = await UserRepository.findUserByEmail(
                payload.email
            );
            if (getUserEmail && getUserEmail.id !== parseInt(id))
                throw new ErrHandler(400, "Email has been used");
        }
        
        if (payload.password) {
            const password = await bcrypt.hash(payload.password, 10);
            payload.password = password;
        }

        if (payload.photo) {
            await FsUtil.deleteFileExists(getUser.photo,"members");
        }

        const userData = {
            name: payload.name || getUser.name,
            email: payload.email || getUser.email,
            password: payload.password || getUser.password,
            role: payload.role || getUser.role,
            phone_number: payload.phone_number || getUser.phone_number,
            address: payload.address || getUser.address,
            photo: payload.photo || getUser.photo
        }


        const user = await UserRepository.updateUserById(getUser.id, userData);
        if (!user) throw new ErrHandler(500, "Error when update member");

        const getMember = await MemberRepository.findMemberByUserId(getUser.id);

        const membershipStartDate = payload.membership_start_date
            ? new Date(payload.membership_start_date)
            : new Date();
        let membershipExpiryDate;
        if (payload.membership_expiry_date) {
            membershipExpiryDate = new Date(payload.membership_expiry_date);
        } else {
            membershipExpiryDate = new Date(membershipStartDate.getTime());
            membershipExpiryDate.setFullYear(membershipStartDate.getFullYear() + 5);
        }

        const memberData = {
            membership_start_date: membershipStartDate || getMember.membership_start_date,
            membership_expiry_date: membershipExpiryDate || getMember.membership_expiry_date,
        };

        const updatedMember = await MemberRepository.updateMemberByUserId(getUser.id, memberData);
        if (!updatedMember) throw new ErrHandler(500, "Error When Update Member");

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone_number: user.phone_number,
            address: user.address,
            photo: user.photo,
            membership_number : updatedMember.membership_number,
            membership_start_date: updatedMember.membership_start_date,
            membership_expiry_date: updatedMember.membership_expiry_date,
        };
    }

    static async deleteMember(id){
        const getUser = await UserRepository.findUserById(id);
        if (!getUser) throw new ErrHandler(404, "Member Not Found");

        if (getUser.photo) {
            await FsUtil.deleteFileExists(getUser.photo,"members");
        }

        const deleteUser = await UserRepository.deleteUserById(id);
        if (!deleteUser) throw new ErrHandler(500, "Error when delete ");
        return deleteUser
        
    }
}

module.exports = MemberService;
