export default (sequelize, Sequelize) => {
  const Users = sequelize.define('users', {
    fullname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      default: false,
    },
  });

  // Relations
  Users.associate = (models) => {
    // 1 to many with Events
    Users.hasMany(models.Events);
  };

  // Relations
  Users.associate = (models) => {
    // 1 to many with Centers
    Users.hasMany(models.Centers);
  };

  return Users;
};
