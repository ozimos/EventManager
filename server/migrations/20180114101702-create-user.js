export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'userName'
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'email'
      },
      passwordHash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    },
    // migration files do not add unique constraints in the same way as model definitions
    // as documented at https://github.com/sequelize/cli/issues/272
    // using the queryInterface .addConstraints method in a separate migration file works
    // sometimes and fails inexplicably at others. uniqueKey preferrable
    {
      uniqueKeys: {
        userName: {
          fields: ['userName']
        },
        email: {
          fields: ['email']
        }
      }
    }
    ),

  down: queryInterface => queryInterface.dropTable('Users'),

};
