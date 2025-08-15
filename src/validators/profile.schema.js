import Joi from 'joi';
export const profileSchema = Joi.object({
  nickname: Joi.string().alphanum().min(3).max(24).allow(null),
  email_visible: Joi.boolean().allow(null)
});
