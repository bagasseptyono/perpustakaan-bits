const UserRepository = require("../repositories/user.repository");
const bcrypt = require('bcrypt');
const ErrHandler = require("../utils/error.util");
const jwt = require("jsonwebtoken");
const { JWTSECRET } = require("../config/app.config");
const JWTUtil = require("../utils/jwt.util");
const MembershipUtil = require("../utils/membership.util");
const MemberRepository = require("../repositories/member.repository");

class AuthService {
    static async createUser (payload, role) {
        const getUser = await UserRepository.findUserByEmail(payload.email);

        if (getUser) {
            throw new ErrHandler(400 , 'Email has been Used')
        }

        const password = await bcrypt.hash(payload.password,10);
        payload.password = password;

        payload.role = role ? role : "member";

        const createUser = await UserRepository.addUser(payload);
        if (!createUser) {
            throw new ErrHandler(500 ,'Error When add user')
        }

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

        return {
            name : createUser.name,
            email : createUser.email,
            role : createUser.role
        };  
    }

    static async loginUser (payload) {
        const getUser = await UserRepository.findUserByEmail(payload.email);
        if (!getUser) {
            throw new ErrHandler(401 , 'Invalid Credentials')
        }

        const passwordMatch = await bcrypt.compare(payload.password, getUser.password);
        if (!passwordMatch) {
            throw new ErrHandler(401 , 'Invalid Credentials')
        }

        const token = await JWTUtil.generateToken(getUser);
        
        return {token};

    }
}

module.exports = AuthService;