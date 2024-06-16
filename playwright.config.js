const {defineConfig, devices} = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    testMatch: '**/*.spec.ts',
    projects: [
        {
            name: 'chromium',
            use: {...devices['Desktop Chrome']},
        },
    ],
    reporter: [
        ['html'],
        ['allure-playwright'],
    ],
    // if CI environment then retry 2 times, else: retry 1 times 
    //retries: process.env.CI ? 2 : 1,
    use: {
        baseURL: 'https://demowebshop.tricentis.com',
        actionTimeout: 5 * 1000, // the same as implicit wait in Selenium
        trace: 'on-first-retry',
        video: 'on-first-retry',
        screenshot: 'only-on-failure',
    },
});