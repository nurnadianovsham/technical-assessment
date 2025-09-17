# Technical Assessment – Playwright Tests

This project contains automated tests for the XYZ bank app using **Playwright** with **TypeScript**.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Install Playwright browsers:

   ```bash
   npx playwright install
   ```

## Run Tests

- Run all tests:

  ```bash
  npx playwright test
  ```

- Run in headed mode:

  ```bash
  npx playwright test --headed
  ```

- Show last report:

  ```bash
  npx playwright show-report
  ```

- Open reports
 
  On macOS:
  ```bash
  open reports/index.html
  ```

   On Windows:

   ```bash
   start reports\index.html
   ```

## Project Structure

- `pages/` – Page Object classes
- `tests/` – Test scripts
- `screenshots/` – Test evidence
- `playwright-report/` – HTML reports
