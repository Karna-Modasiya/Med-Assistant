const Joi = require('joi');

const registerValidation = (user) => {
    const schema = Joi.object({
        usertype: Joi.string()
            .required(),
        username: Joi.string()
            .min(4)
            .max(15)
            .required(),
        email: Joi.string()
            .min(10)
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(5)
            .max(255)
            .required()
    });
    
    return schema.validate(user);
}

const loginValidation = (user) => {
    const schema = Joi.object({
        usertype: Joi.string()
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(5)
            .max(255)
            .required()
    });
    
    return schema.validate(user);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;