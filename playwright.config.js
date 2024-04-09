const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    reporter: 'html',
    // if CI environment then retry 2 times, else: retry 1 times 
    retries: process.env.CI ? 2 : 1,
    use: {
        actionTimeout: 5 * 1000, // the same as implicit wait in Selenium
        trace: 'on-first-retry',
        video: 'on-first-retry',
        screenshot: 'only-on-failure',
    },
});