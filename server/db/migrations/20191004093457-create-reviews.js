module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      revieweeId: {
        allowNull: false,
        type: Sequelize.UUIDV4,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      reviewerId: {
        allowNull: false,
        type: Sequelize.UUIDV4,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      rating: {
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: 'TIMESTAMP',
      },
      updatedAt: {
        allowNull: false,
        type: 'TIMESTAMP',
      },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('Reviews');
  },
};
