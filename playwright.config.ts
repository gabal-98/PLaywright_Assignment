import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

/**
 * The environment is chosen with the ENV variable:
 *   npm run test:qa   or   npm run test:dev
 * Defaults to "qa". Values come from .env.<ENV> (never committed).
 */
const environment = process.env.ENV ?? 'qa';
dotenv.config({ path: path.resolve(__dirname, `.env.${environment}`), quiet: true });

if (!process.env.BASE_URL) {
    throw new Error(`BASE_URL is missing. Check that .env.${environment} exists and defines it.`);
}

export default defineConfig({
    testDir: './tests',
    timeout: 30_000,
    expect: { timeout: 10_000 },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['list'],
        ['html', { open: 'never' }],
        ['junit', { outputFile: 'results/junit.xml' }],
    ],
    use: {
        baseURL: process.env.BASE_URL,
        testIdAttribute: 'data-test',
        actionTimeout: 10_000,
        navigationTimeout: 30_000,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    projects: [
        // Logs in once and saves the session to playwright/.auth/user.json
        {
            name: 'setup',
            testDir: './tests/setup',
            testMatch: /.*\.setup\.ts/,
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'chromium',
            testDir: './tests/ui',
            use: { ...devices['Desktop Chrome'] },
            dependencies: ['setup'],
        },
        {
            name: 'firefox',
            testDir: './tests/ui',
            use: { ...devices['Desktop Firefox'] },
            dependencies: ['setup'],
        },
        {
            name: 'webkit',
            testDir: './tests/ui',
            use: { ...devices['Desktop Safari'] },
            dependencies: ['setup'],
        },
        // API tests do not need a browser
        {
            name: 'api',
            testDir: './tests/api',
            use: { baseURL: process.env.API_BASE_URL },
        },
    ],
});
