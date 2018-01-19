// use DataTypes instead of Sequelize because module exports a function
// which is consumed in a module that actually imports Sequelize
// and calls the sequelize.import method. This method accepts function arguments
export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Invalid Email Address'
        }
      }
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
  });

  // Relations
  User.associate = (models) => {
    User.hasMany(models.event, {
      foreignKey: 'userId',
    });
    User.hasMany(models.center, {
      foreignKey: 'userId',
    });
  };

  return User;
};
