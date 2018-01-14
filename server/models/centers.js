export default (sequelize, Sequelize) => {
  const Centers = sequelize.define('centers', {
    name: {
      types: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      types: Sequelize.STRING,
      allowNull: false,
    },
    cost: {
      types: Sequelize.INTEGER,
      allowNull: false,
    },
    capacity: {
      types: Sequelize.INTEGER,
      allowNull: false,
    },
    country: {
      types: Sequelize.STRING,
      allowNull: false,
    },
    state: {
      types: Sequelize.STRING,
      allowNull: false,
    },
    lga: {
      types: Sequelize.STRING,
      allowNull: false,
    },
    amenities: {
      types: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    eventType: {
      types: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },

  });

  // Associates with user table
  Centers.associate = (models) => {
    Centers.belongsTo(models.Users);
  };
  // Relations
  Centers.associate = (models) => {
    // 1 to many with Events
    Centers.hasMany(models.Events);
  };
  return Centers;
};
