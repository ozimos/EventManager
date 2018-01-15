export default (sequelize, DataTypes) => {
  const Events = sequelize.define('events', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    estimatedAttendance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  // Associates with user  and center tables
  Events.associate = (models) => {
    Events.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Events.belongsTo(models.Centers, {
      foreignKey: 'centerId',
      onDelete: 'CASCADE'
    });
  };

  return Events;
};
