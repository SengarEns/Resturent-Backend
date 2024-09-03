import joi from "joi";

export const NewCostumerValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    phone: joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res
      .status(200)
      .json({ success: false, message: "Validation error", error });
  }
  next();
};

export const AlreadyCostumerValidation = (req, res, next) => {
  const schema = joi.object({
    phone: joi.string(),
    email: joi.string().email(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).json({ message: "Bad request", error });
  }
  next();
};
