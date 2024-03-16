
const CustomError = require("../util/customError");

module.exports = func => async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      console.error(error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    }
  };
