module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('urls', {
      shortUrl: {
        type: Sequelize.STRING(16),
        primaryKey: true,
        allowNull: false,
      },
      longUrl: {
        type: Sequelize.STRING(2048),
        allowNull: false,
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('urls');
  },
};
