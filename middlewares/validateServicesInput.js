// Helpers
import { StatusResponse } from '../helpers';

// This function validates input from a user
const validateServicesInput = (req, res, next) => {
  const {
    category, subcategory, title, price, days,
  } = req.body;

  if (
    !category
      || !subcategory
      || !title
      || !price
      || !days
  ) {
    StatusResponse.badRequest(res, {
      status: 400,
      data: {
        error: {
          category: !category ? 'category must be filled' : '',
          subcategory: !subcategory ? 'subcategory must be filled' : '',
          title: !title ? 'title must be filled' : '',
          price: !price ? 'price must be filled' : '',
          days: !days ? 'days to deliver must be filled' : '',
        }
      }
    });
  } else if (!Number(price) || !Number(days)) {
    StatusResponse.badRequest(res, {
      status: 400,
      data: {
        error: {
          price: !Number(price) ? 'price must be a number' : '',
          days: !Number(days) ? 'days must be a number' : '',
        },
      }
    });
  } else {
    return next();
  }
};

export default validateServicesInput;
