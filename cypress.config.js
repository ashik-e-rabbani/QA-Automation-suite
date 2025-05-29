const { defineConfig } = require("cypress");

module.exports = defineConfig({
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
