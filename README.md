## Environment Settings

- Setup Node.Js(LTE version) on your machine or Server
- Make sure git is installed
- IDE (Visual Studio Code is prefferable)

## Cypress UI Automation Suite

This repository contains a Cypress-based product purchasing flow's UI test automation framework for testing the [SauceDemo](https://www.saucedemo.com/) website. It follows best practices such as the Page Object Model (POM), custom commands, environment configuration, CI/CD integration, and test data management.

---

## ⚙️ Setup Instructions

#### 1. Clone the Repository

```bash
git clone https://github.com/ashik-e-rabbani/QA-Automation-suite
cd QA-Automation-suite
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Set Environment Variables

Create a `.env` file in the root directory:

```env
CYPRESS_username=<YOUR_USERNAME>
CYPRESS_password=<YOUR_PASS>
CYPRESS_baseUrl=https://www.saucedemo.com
```

> ⚠️ **Important:** Do not commit `.env` to version control. Add it to `.gitignore`.

---

## Running Tests

#### Run All Tests in CLI

```bash
npx cypress run
```

#### Run Tests in Cypress Test Runner (GUI)

```bash
npx cypress open
```

---

#### Test Reports

This project uses the [Mochawesome](https://github.com/adamgruber/mochawesome) reporter.

Reports will be generated in:

```
ui-tests/reports/mochawesome.html
```

To view the report, open the HTML file in your browser.

---

## CI/CD Integration

GitHub Actions workflow is used for CI.

- Install dependencies
- Run Cypress tests in headless mode
- Upload screenshots and videos on failure (conditionally)
- Generate test report

> Check the `.github/workflows/` directory for the CI workflow file.

---

## Practices Followed

- ✅ Page Object Model (POM)
- ✅ dotenv for secrets management
- ✅ Fixtures for test data
- ✅ Custom Cypress commands
- ✅ CI/CD with GitHub Actions
- ✅ Failure screenshot handling
- ✅ Timeout configuration
- ✅ Code modularization and reuse

---

## Contributors

- **Ashik E Rabbani** – [Senior QA Engineer]
