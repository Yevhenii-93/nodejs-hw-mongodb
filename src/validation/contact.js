import Joi from 'joi';

export const contactSchema = Joi.object({
  name: Joi.string().trim().min(3).max(20).required(),
  phoneNumber: Joi.string().trim().min(3).max(20).required(),
  email: Joi.string().email().trim().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().trim().valid('work', 'home', 'personal'),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().trim().min(3).max(20),
  phoneNumber: Joi.string().trim().min(3).max(20),
  email: Joi.string().email().trim().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().trim().valid('work', 'home', 'personal'),
});
