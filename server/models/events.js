export default (sequelize, Sequelize) => {
  const Events = sequelize.define('events', {
    name: {
      types: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      types: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    duration: {
      types: Sequelize.INTEGER,
      allowNull: false,
    },
    startDate: {
      types: Sequelize.DATEONLY,
      allowNull: false,
    },
    estimatedAttendance: {
      types: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  // Associates with user table
  Events.associate = (models) => {
    Events.belongsTo(models.Users);
  };
  // Associates with center table

  Events.associate = (models) => {
    Events.belongsTo(models.Centers);
  };
  return Events;
};
