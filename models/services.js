export default (sequelize, DataTypes) => {
  const Services = sequelize.define('services', {
    category: DataTypes.STRING,
    subcategory: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    days: DataTypes.INTEGER,
    media: DataTypes.STRING,
    packageoptions: DataTypes.STRING
  }, {});
  Services.associate = (models) => {
    Services.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'user'
    });
  };
  return Services;
};