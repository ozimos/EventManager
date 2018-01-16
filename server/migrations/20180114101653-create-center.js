
export default {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Center', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id',
          as: 'userId',
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'compositeIndex'
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cost: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'compositeIndex'
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'compositeIndex'
      },
      lga: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amenities: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      eventType: {
        type: Sequelize.ARRAY(Sequelize.STRING),
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
  down: queryInterface => queryInterface.dropTable('Center'),
};
