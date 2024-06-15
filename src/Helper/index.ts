import Joi from "joi";

export const RegisterShema = Joi.object({
    Name:Joi.string().required(),
    Email:Joi.string().required().email().messages({
        'string.email': "Please enter your valid email"

    }),
    Password:Joi.string().required().pattern(

        new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$')

    )
 

})