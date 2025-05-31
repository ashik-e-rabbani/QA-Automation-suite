## QA Automation Suite

This repository contains

1. A Cypress based UI automation framework for the **product purchasing flow** on [SauceDemo](https://www.saucedemo.com/).
2. API test of [Simple Grocery Store API](https://simple-grocery-api.store/) using newman
3. Load test

### Environment Setup

* Install **Node.js** (LTS version recommended)
* Ensure **Git** is installed
* Install [k6](https://grafana.com/docs/k6/latest/set-up/install-k6/) (MacOS: `brew install k6`)
* Use an IDE like **Visual Studio Code** (recommended)

### - Getting Started -

#### Clone the Repository

```bash
git clone https://github.com/ashik-e-rabbani/QA-Automation-suite
```

#### Navigate to the Project Directory

```bash
cd QA-Automation-suite
```

#### Install Project Dependencies

```bash
npm install
```

#### Configure Environment Variables

Create a `.env` file in the project root:

```env
CYPRESS_username=<YOUR_USERNAME>
CYPRESS_password=<YOUR_PASSWORD>
CYPRESS_baseUrl=https://www.saucedemo.com
```

---

### Running UI Tests

#### Run Tests via CLI

```bash
npx cypress run
```

Or use the NPM script:

```bash
npm run testUi
```

#### Run Tests in Cypress Test Runner (GUI)

```bash
npx cypress open
```

---

### Running API Tests

#### Run Tests via CLI

```bash
newman run api-tests/Simple_Grocery_Store_API.postman_collection.json \
       -e api-tests/sgsEnv.postman_environment.json
```

Or via NPM script:

```bash
npm run testApi
```

#### Run API Tests with HTML Report

```bash
newman run api-tests/Simple_Grocery_Store_API.postman_collection.json \
       -e api-tests/sgsEnv.postman_environment.json \
       -r htmlextra --reporter-htmlextra-export=api-tests/reports/api-test-report.html
```

Or use:

```bash
npm run testApiWithReport
```

### CI/CD Integration (GitHub Actions)

Workflow automates:

* Installing dependencies
* Running Cypress tests (headless mode)
* Capturing & uploading failure artifacts
* Running Postman collections with Newman
* Generating API test HTML reports
* Load testing setup *(inprogress)*

Workflow location: `.github/workflows/`

---

### Practices followed

* Page Object Model (**POM** )
* **dotenv** for secure config management
* Reusable **fixtures** for test data
* Custom Cypress **commands**
* CI/CD via **GitHub Actions**
* Failure **screenshot and video capture**
* Modular and maintainable test structure

---

by **Ashik E Rabbani**
