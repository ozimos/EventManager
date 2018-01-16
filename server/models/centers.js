export default (sequelize, DataTypes) => {
  const Centers = sequelize.define('centers', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeIndex'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeIndex'
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeIndex'
    },
    lga: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeIndex'
    },
    amenities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    eventType: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },

  });

  // Relations
  Centers.associate = (models) => {
    Centers.hasMany(models.Events, {
      foreignKey: 'centerId',
    });
    Centers.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
  };

  return Centers;
};
