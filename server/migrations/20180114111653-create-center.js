export default {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Centers', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
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
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
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
    }, {
      uniqueKeys: {
        Centers_unique: {
          fields: ['name', 'country', 'state', 'lga']
        }
      }
    });
  },
  down: queryInterface => queryInterface.dropTable('Centers'),
};