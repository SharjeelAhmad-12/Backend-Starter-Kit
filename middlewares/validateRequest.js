const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(e => e.message);
      return res.status(400).json({ success: false, errors });
    }
    next();
  };
};

module.exports = validateRequest;
