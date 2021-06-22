import Joi from "@hapi/joi";

const registerValidation = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(10).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
const loginValidation = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().min(10).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

export { registerValidation, loginValidation };
