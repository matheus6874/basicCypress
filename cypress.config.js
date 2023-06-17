const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    longText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
    viewportHeight: 880,
    viewportWidth: 1280,
});
