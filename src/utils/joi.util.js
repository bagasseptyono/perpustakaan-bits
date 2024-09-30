const Joi = require('joi');

class JoiUtil {
    static registerUser = Joi.object({
        name : Joi.string().required(),
        email : Joi.string().email().required(),
        password : Joi.string().required(),
        role : Joi.string(),
        phone_number : Joi.string(),
        address : Joi.string(),
    });

    static loginUser = Joi.object({
        email : Joi.string().email().required(),
        password : Joi.string().required(),
    });

    static editUser = Joi.object({
        name : Joi.string(),
        email : Joi.string().email(),
        password : Joi.string(),
        phone_number : Joi.string(),
        address : Joi.string(),
    });

    static editMember = Joi.object({
        name : Joi.string(),
        email : Joi.string().email(),
        password : Joi.string(),
        role : Joi.string(),
        phone_number : Joi.string(),
        address : Joi.string(),
        membership_start_date : Joi.date(),
        membership_expiry_date : Joi.date()
    });

    static addMember = Joi.object({
        name : Joi.string().required(),
        email : Joi.string().email().required(),
        password : Joi.string().required(),
        phone_number : Joi.string(),
        address : Joi.string(),
        membership_start_date : Joi.date(),
        membership_expiry_date : Joi.date()
    });
}


module.exports = JoiUtil;