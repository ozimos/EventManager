export default (sequelize, Sequelize) => {
  const Events = sequelize.define('events', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    duration: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    estimatedAttendance: {
      type: Sequelize.INTEGER,
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
