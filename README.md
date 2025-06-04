## QA Automation Suite

This repository encompasses a comprehensive automation framework designed to validate the quality and performance of web applications. It contains:

- **UI Testing**: Automated the product purchasing flow tests using Cypress for the [SauceDemo](https://www.saucedemo.com/) website.
- **API Testing**: Automated API tests using [Newman](https://www.npmjs.com/package/newman) for the [Simple Grocery Store API](https://simple-grocery-api.store/).
- **Performance Testing**: Load and performance tests using [k6](https://k6.io/) .

---

#### Technologies Used

- **UI Testing**: Cypress
- **API Testing**: Postman collections executed via **Newman**
- **Performance Testing**: k6
- **Reporting**: [mochawesome](https://www.npmjs.com/package/mochawesome) for UI, **htmlxtra** for API
- **Design pattern** : Page Object Model
- **CI/CD**: GitHub Actions
- **dotenv** for secure config management

---

#### Project Structure

```
qa-candidate-assessment/
├── .github/workflows/       # CI/CD workflows
├── api-tests/               # Postman collections and environment files
├── performance-tests/       # k6 scripts for load testing
├── ui-tests/                # Cypress tests and configurations
├── cypress.config.js        # Cypress configuration file
├── package.json             # Project dependencies and scripts
├── sample.env               # environment variables (you need to create .env)
└── README.md                # Project documentation
```

---

### Setup Instructions

#### Prerequisites

Ensure the following are installed on your system:

- [Node.js (LTS version)](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [k6](https://k6.io/)
- Use an IDE like **Visual Studio Code**(optional)

---

#### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ashik-e-rabbani/qa-candidate-assessment.git
   ```
2. Change the Directory `cd qa-candidate-assessment`
3. **Install Dependencies**

   ```bash
   npm install
   ```
4. **Set Up Environment Variables**

   - Duplicate the `sample.env` file and rename it to `.env`;
   - Don't forget to replace dummy values of `.env` file with the actual one.

---

### Test Execution

#### 1. UI Tests (Cypress)

##### Run Tests in headless mode

```bash
npx cypress run
```

Or use the NPM script:

```npm run testUi
npm run testUi
```

##### Run Tests in GUI mode

```bash
npx cypress open
```

#### 2. API Tests (Newman)

##### Execute Postman Collection

```bash
newman run api-tests/Simple_Grocery_Store_API.postman_collection.json \
       -e api-tests/sgsEnv.postman_environment.json
newman run api-tests/collection.json -e api-tests/environment.json
```

Or **via NPM script:**

```
npm run testApi
```

##### Run API Tests with HTML Report

```bash
newman run api-tests/Simple_Grocery_Store_API.postman_collection.json \
       -e api-tests/sgsEnv.postman_environment.json \
       -r htmlextra --reporter-htmlextra-export=api-tests/reports/api-test-report.html
```

Or use **npm script**:

```bash
npm run testApiWithReport
```

*Replace `*_collection.json` and `*_environment.json` with your specific filenames if they differ.*

#### 3. Performance Tests (k6)

##### Run Load Test

```bash
k6 run performance-tests/tests/createOrderTest.js
```

This will perform a minimal load test on **POST /order** of the [Simple Grocery Store API](https://simple-grocery-api.store/).

Run load for the complete Cycle(Authenticate -> Pick products -> Add to carts -> Place order)

```
k6 run performance-tests/tests/createOrderTest.js --env fullCycle=true --env type=load
```

variable `fullCycle` can only be **true**, and `type` can be **load**, **spike** or **stress**

Also can be run by: `npm run testLoadFull`
<br>

##### GitHub Actions Workflow automates:

* Installing dependencies
* Running Cypress tests
* Running Postman collections with Newman
* Running K6 performance tests
* Generating Results and Report (Will be avaiable as downloadable in each actions)
---
by **Ashik E Rabbani**
