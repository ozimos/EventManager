export default (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
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
  Event.associate = (models) => {
    Event.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Event.belongsTo(models.Center, {
      foreignKey: 'centerId',
      onDelete: 'CASCADE'
    });
  };

  return Event;
};
