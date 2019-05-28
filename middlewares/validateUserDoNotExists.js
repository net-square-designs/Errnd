import Sequelize from 'sequelize';
import { StatusResponse } from '../helpers';
import model from '../models';

const { users } = model;
const { Op } = Sequelize;

// This function checks to see whether a user exist or not
const validateUserDoNotExists = async (req, res, next) => {
  const { email, username } = req.body;
  const user = await users.findAndCountAll({
    where: {
      [Op.or]: [{ email }, { username }]
    },
  });

  if (user.count < 1) {
    StatusResponse.notfound(res, {
      status: 404,
      data: {
        error: 'User not found, please register user onto the platform',
      }
    });
  } else {
    return next();
  }
};

export default validateUserDoNotExists;
