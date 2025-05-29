const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  env: {
    username: process.env.CYPRESS_username || 'Declare in .env',
    password: process.env.CYPRESS_password || 'Check .env',
    baseUrl: process.env.CYPRESS_baseUrl || 'https://www.saucedemo.com'
  },
  e2e: {
    specPattern: 'ui-tests/e2e/**/*.cy.{js,ts}',
    supportFile: 'ui-tests/support/e2e.js',
    fixturesFolder: 'ui-tests/fixtures',
    baseUrl: 'https://www.saucedemo.com/',
    screenshotsFolder: 'ui-tests/screenshots',
    videosFolder: 'ui-tests/videos',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
