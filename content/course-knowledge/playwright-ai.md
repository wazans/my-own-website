# Playwright AI and Automation

## Playwright locators

Simple explanation:
Playwright locators find page elements the way a real user would: by role, label, text, placeholder, or test id. Good locators make tests stable because they describe the element clearly instead of depending on fragile page structure.

Do this:
1. Open a Playwright test file.
2. Prefer `page.getByRole('button', { name: 'Login' })` for buttons.
3. Prefer `page.getByLabel('Email')` for form fields.
4. Use `page.getByText('Payment successful')` for visible confirmation text.
5. Use `page.getByTestId('submit-order')` only when user-facing locators are not enough.

Observe this:
The test reads like a user workflow. If the CSS class changes, the locator can still work.

Practice this:
Create a login test with locators for email, password, login button, and dashboard heading.

Expected output:
The test fills login fields, clicks Login, and verifies that the dashboard heading is visible.

## Playwright assertions

Simple explanation:
Assertions confirm the result of an action. A test is incomplete if it clicks buttons but does not verify what changed.

Do this:
1. Perform one action, such as clicking Save.
2. Add an assertion for the result.
3. Use `await expect(page.getByText('Saved')).toBeVisible()`.
4. Use URL assertions after navigation.
5. Use count assertions when lists or table rows matter.

Observe this:
Failures become easier to debug because the test explains what result was expected.

Practice this:
Write a test that adds an item to a cart and verifies the cart count.

Expected output:
The test fails if the item is not added or the cart count is wrong.

## AI support for Playwright

Simple explanation:
AI can help draft Playwright test ideas, selectors, and assertions, but the QA engineer must review and run the result.

Do this:
1. Paste a requirement into an AI tool.
2. Ask for positive, negative, and edge test scenarios.
3. Ask for Playwright TypeScript test code.
4. Review locators and assertions.
5. Run the test locally and fix any incorrect assumptions.

Observe this:
AI speeds up the first draft, but execution and validation still decide quality.

Practice this:
Use AI to draft tests for a registration form, then improve the locators manually.

Expected output:
You get a working Playwright test that covers required fields, invalid email, and successful registration.
