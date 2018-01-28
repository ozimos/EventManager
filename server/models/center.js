export default (sequelize, DataTypes) => {
  const Center = sequelize.define('Center', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'Centers_unique'
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
      unique: 'Centers_unique'
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'Centers_unique'
    },
    lga: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'Centers_unique'
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
  Center.associate = (models) => {
    Center.hasMany(models.Event, {
      foreignKey: 'centerId',
    });
    Center.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };

  return Center;
};
