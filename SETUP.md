# Setup guide

## 1. Copy the files

Copy everything in this folder into your project root and let it overwrite your existing files.
Note: `.env.dev`, `.env.qa`, `.env.example` and `.gitignore` start with a dot (hidden in some file managers).

Delete the old files, they are replaced:

- `src/pages/FirstCheckoutPage.ts`, `SecondCheckoutPage.ts`, `ThankyouPage.ts`
- the old `src/models/Sortoption.ts` (the new one is `SortOption.ts`, same casing as the import)
- `_env.dev`, `_env.qa`, `_gitignore`, `eslint_config.mts`, `playwright_config.ts` if they are in your project (those were upload names)

## 2. Install packages

```
npm i -D typescript cross-env eslint-plugin-playwright jiti
npm uninstall @eslint/json prettier dotenv @faker-js/faker
npm i -D prettier dotenv @faker-js/faker
npx playwright install
```

## 3. Replace the "scripts" block in package.json

```json
"scripts": {
    "test": "cross-env ENV=qa playwright test",
    "test:dev": "cross-env ENV=dev playwright test",
    "test:qa": "cross-env ENV=qa playwright test",
    "test:headed": "cross-env ENV=qa playwright test --headed",
    "test:ui": "cross-env ENV=qa playwright test --ui",
    "test:smoke": "cross-env ENV=qa playwright test --grep @smoke",
    "test:regression": "cross-env ENV=qa playwright test --grep @regression",
    "test:api": "cross-env ENV=qa playwright test --project=api",
    "test:chromium": "cross-env ENV=qa playwright test --project=chromium",
    "report": "playwright show-report",
    "typecheck": "tsc --noEmit",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write \"src/**/*.ts\" \"tests/**/*.ts\" \"*.ts\" \"*.mts\"",
    "format:check": "prettier --check \"src/**/*.ts\" \"tests/**/*.ts\" \"*.ts\" \"*.mts\""
}
```

## 4. Check everything

```
npm run format
npm run typecheck
npm run lint
npm run test:chromium
```

Then `npm test` to run all three browsers and `npm run report` to open the HTML report.

## Troubleshooting

- "BASE_URL is missing": the file `.env.qa` (or `.env.dev`) is not in the project root, or is named `_env.qa`.
- Tests fail with "storage state not found": the `setup` project did not run. Run without `--no-deps`, and keep the tags on the setup test.
- `ERR_REQUIRE_ESM` mentioning faker: use Node 22 or newer.
- ESLint says it cannot load `eslint.config.mts`: make sure `jiti` is installed.
- A selector fails: open the page in the browser (`npx playwright codegen https://www.saucedemo.com`) and compare with the locator in the page class.
