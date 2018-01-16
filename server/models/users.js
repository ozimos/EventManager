// use DataTypes instead of Sequelize because module exports a function
// which is consumed in a module that actually imports Sequelize
// and calls the sequelize.import method. This method accepts function arguments
export default (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
  });

  // Relations
  Users.associate = (models) => {
    Users.hasMany(models.Events, {
      foreignKey: 'userId',
    });
    Users.hasMany(models.Centers, {
      foreignKey: 'userId',
    });
  };

  return Users;
};
