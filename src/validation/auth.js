import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().trim(),
  email: Joi.string().email().min(3).required().trim(),
  password: Joi.string().min(3).max(20).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().min(3).required().trim(),
  password: Joi.string().min(3).max(20).required(),
});

export const requestPasswordResetSchema = Joi.object({
  email: Joi.string().email().min(3).required().trim(),
});
