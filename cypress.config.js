const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  defaultCommandTimeout: 15000,
  pageLoadTimeout: 60000,
  requestTimeout: 10000,
  // reporter: 'mochawesome',
  // reporterOptions: {
  //   reportDir: 'ui-tests/reports',
  //   overwrite: true,
  //   html: true,
  //   json: true,
  // },

  env: {
    username: process.env.CYPRESS_username || 'standard_user',
    password: process.env.CYPRESS_password || 'secret_sauce'

  },

  e2e: {
    specPattern: 'ui-tests/e2e/**/*.cy.{js,ts}',
    supportFile: 'ui-tests/support/e2e.js',
    fixturesFolder: 'ui-tests/fixtures',
    baseUrl: process.env.CYPRESS_baseUrl || 'https://www.saucedemo.com',
    screenshotsFolder: 'ui-tests/screenshots',
    videosFolder: 'ui-tests/videos',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
