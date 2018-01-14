
export default {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Centers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        default: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      },
      name: {
        types: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        types: Sequelize.STRING,
        allowNull: false,
      },
      cost: {
        types: Sequelize.INTEGER,
        allowNull: false,
      },
      capacity: {
        types: Sequelize.INTEGER,
        allowNull: false,
      },
      country: {
        types: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        types: Sequelize.STRING,
        allowNull: false,
      },
      lga: {
        types: Sequelize.STRING,
        allowNull: false,
      },
      amenities: {
        types: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      eventType: {
        types: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: queryInterface => queryInterface.dropTable('Centers'),
};
