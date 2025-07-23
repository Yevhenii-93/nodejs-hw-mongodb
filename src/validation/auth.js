import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().trim(),
  email: Joi.string().email().min(3).max(20).required().trim(),
  password: Joi.string().min(3).max(20).required(),
});
