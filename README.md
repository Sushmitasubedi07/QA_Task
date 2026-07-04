# Signup Automation using Playwright

## Project Description

This project automates the signup process for the Authorized Partner website using Playwright.

Website:
https://authorized-partner.vercel.app/

## Technologies

- Node.js
- Playwright
- JavaScript

## Installation

Clone the repository

```
git clone <repository-link>
```

Install dependencies

```
npm install
```

Install Playwright browsers

```
npx playwright install
```

## Running the test

Run all tests

```
npx playwright test
```

Run only signup test

```
npx playwright test tests/signup.spec.js --headed
```

## Browser Support

- Chromium
- Firefox
- WebKit

## Test Data

The script generates a unique email using Date.now().

## Known Issue

The signup process requires an OTP sent through email.

Note: The script generates a unique email address and phone number on every execution to avoid duplicate account errors. The signup flow requires an OTP sent to the registered email. Since no test OTP endpoint or API was provided, the automation cannot complete the OTP verification without access to the mailbox.


