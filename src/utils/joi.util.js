const Joi = require("joi");

class JoiUtil {
    static registerUser = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        role: Joi.string(),
        phone_number: Joi.string(),
        address: Joi.string(),
    });

    static loginUser = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    static editUser = Joi.object({
        name: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string(),
        phone_number: Joi.string(),
        address: Joi.string(),
    });

    static editMember = Joi.object({
        name: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string(),
        role: Joi.string(),
        phone_number: Joi.string(),
        address: Joi.string(),
        membership_start_date: Joi.date(),
        membership_expiry_date: Joi.date(),
    });

    static addMember = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phone_number: Joi.string(),
        address: Joi.string(),
        membership_start_date: Joi.date(),
        membership_expiry_date: Joi.date(),
    });

    static addBook = Joi.object({
        title: Joi.string().max(255).required(),
        author: Joi.string().max(255).required(),
        publisher: Joi.string().max(255).required(),
        category: Joi.string().max(255).required(),
        description: Joi.string().optional().allow(null, ""), 
        ISBN: Joi.string().required(), 
        stock: Joi.number().integer().min(0).required(),
    });

    static updateBook = Joi.object({
        title: Joi.string().max(255),
        author: Joi.string().max(255),
        publisher: Joi.string().max(255),
        category: Joi.string().max(255),
        description: Joi.string().optional().allow(null, ""), 
        ISBN: Joi.string(), 
        stock: Joi.number().integer().min(0),
    })

    static borrowBook = Joi.object({
        book_id: Joi.number().integer().required(),
        user_id: Joi.number().integer().required(),
    })

    static returnBook = Joi.object({
        transaction_id: Joi.number().integer().required(),
    })
}

module.exports = JoiUtil;
