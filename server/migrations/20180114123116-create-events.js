
export default {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Events', {
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
      centerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Centers',
          key: 'id',
          as: 'centerId',
        },
      },
      name: {
        types: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        types: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      duration: {
        types: Sequelize.INTEGER,
        allowNull: false,
      },
      startDate: {
        types: Sequelize.DATEONLY,
        allowNull: false,
      },
      estimatedAttendance: {
        types: Sequelize.INTEGER,
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
  down: queryInterface => queryInterface.dropTable('Events'),
};
