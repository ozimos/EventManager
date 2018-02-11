export default {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Events', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      },
      centerId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Centers',
          key: 'id',
          as: 'centerId',
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      numOfDays: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      startDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      dates: {
        type: Sequelize.RANGE(Sequelize.DATEONLY),
        allowNull: false,
      },
      estimatedAttendance: {
        type: Sequelize.INTEGER,
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
