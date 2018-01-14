
export default (sequelize, DataTypes) => {
  const centers = sequelize.define('centers', {
    name: {
      types: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      types: DataTypes.STRING,
      allowNull: false,
    },
  cost: {
    types: DataTypes.INTEGER,
    allowNull: false,
  },
  capacity: Joi.number().integer(),
  country: Joi.string(),
  state: Joi.string(),
  lga: Joi.string(),
  amenities: Joi.alternatives().try(arraySchema, Joi.string()),
  eventType: Joi.alternatives().try(arraySchema, Joi.string()),
    location: DataTypes.STRING,
    capacity: {
      types: DataTypes.INTEGER,
      allowNull: false,
    },
    cost: {
      types: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  // Associates with user table
  centers.associate = (models) => {
    centers.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
  };
  return centers;
};
