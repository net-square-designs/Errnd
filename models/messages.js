/* eslint-disable no-unused-vars */
export default (sequelize, DataTypes) => {
  const Messages = sequelize.define('messages', {
    message: DataTypes.TEXT,
    senderusername: DataTypes.STRING,
    receiverusername: DataTypes.STRING
  }, {});
  Messages.associate = (models) => {};
  return Messages;
};
