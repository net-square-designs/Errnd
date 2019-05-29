import Sequelize from 'sequelize';
import model from '../models';

const { users } = model;
const { Op } = Sequelize;

const findUser = async (email, username) => {
  const returnedUser = await users.findAndCountAll({
    where: {
      [Op.or]: [{ email }, { username }],
    },
  });
  if (returnedUser.count < 1) {
    return false;
  }
  if (returnedUser.count > 0) {
    return returnedUser.rows[0].dataValues;
  }
};

export default findUser;
