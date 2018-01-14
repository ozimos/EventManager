export default (sequelize, Sequelize) => {
  const Centers = sequelize.define('centers', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cost: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    capacity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lga: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    amenities: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    eventType: {
      type: Sequelize.ARRAY(Sequelize.STRING),
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
