'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.renameColumn('urls', 'shortUrl', 'alias');
    await queryInterface.renameColumn('urls', 'longUrl', 'url');
  },
  down: async (queryInterface) => {
    await queryInterface.renameColumn('urls', 'alias', 'shortUrl');
    await queryInterface.renameColumn('urls', 'url', 'longUrl');
  },
};
