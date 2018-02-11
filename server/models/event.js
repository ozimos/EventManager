export default (sequelize, DataTypes) => {
  const EventModel = sequelize.define('Event', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    numOfDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    dates: {
      type: DataTypes.RANGE(DataTypes.DATEONLY),
      allowNull: false,
    },
    estimatedAttendance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });


  // Associates with user  and center tables
  EventModel.associate = (models) => {
    EventModel.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    EventModel.belongsTo(models.Center, {
      foreignKey: 'centerId',
      onDelete: 'CASCADE'
    });
  };

  return EventModel;
};
