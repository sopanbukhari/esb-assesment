## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd esb-assessment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Configuration

The project uses the following configuration files:

- `playwright.config.ts`: Main Playwright configuration
- `test.config.ts`: Test configuration with application URL and credentials

### Key Configuration Settings

- **Test Directory**: `./tests`
- **Browser**: Chromium (Desktop Chrome)
- **Headless Mode**: Disabled (tests run with visible browser)
- **Screenshots**: Captured on test failure
- **Videos**: Recorded for all tests
- **Traces**: Collected on first retry
- **Reporters**: HTML, Allure, Dot, List

## Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test File
```bash
npx playwright test tests/Login.spec.ts
```

### Run Tests with Specific Tag
```bash
npx playwright test --grep "@datadriven"
```

### Run Tests in Headless Mode
```bash
npx playwright test --headed=false
```

### Run Tests in Debug Mode
```bash
npx playwright test --debug
```

### Run Tests with UI Mode
```bash
npx playwright test --ui
```

## Generating Reports

### HTML Report
After test execution, view the HTML report:
```bash
npx playwright show-report
```

### Allure Report
1. Generate Allure results:
   ```bash
   npx playwright test
   ```

2. Generate and open Allure report:
   ```bash
   allure generate allure-results --clean
   allure open
   ```

## Project Structure

```
├── pages/                 # Page Object Models
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckOutPage.ts
├── tests/                 # Test specifications
│   ├── Login.spec.ts
│   ├── checkout.spec.ts
│   └── sorting.spec.ts
├── utils/                 # Utility functions
│   └── dataProvider.ts
├── testdata/              # Test data files
│   └── logindata.json
├── playwright.config.ts   # Playwright configuration
├── test.config.ts         # Test configuration
└── package.json           # Project dependencies
```

## Test Data

Test data is stored in JSON format in the `testdata/` directory. The project supports data-driven testing using the `DataProvider` utility.

Example test data structure (`testdata/logindata.json`):
```json
[
  {
    "testName": "Valid Login",
    "email": "standard_user",
    "password": "secret_sauce",
    "expected": "success"
  }
]
```

## CI/CD Integration

The configuration includes settings optimized for CI environments:
- Retries enabled on CI
- Single worker on CI
- Forbidden test.only in CI

## Contributing

1. Follow the existing code structure and naming conventions
2. Add appropriate test data for new test cases
3. Update this README if new features are added
4. Ensure all tests pass before submitting changes

## Troubleshooting

- If browsers are not installed, run `npx playwright install`
- For permission issues, ensure Node.js and npm are properly installed
- Check the HTML report or Allure report for detailed test failure information
