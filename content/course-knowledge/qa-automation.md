# QA Automation

## Automation strategy

Simple explanation:
QA automation is not about automating every test. It is about automating stable, repeatable checks that protect important user journeys.

Do this:
1. List the top business flows.
2. Mark which flows are repeated every release.
3. Pick stable flows first.
4. Keep exploratory and visual judgment tests manual.
5. Add automation to CI after the test is reliable locally.

Observe this:
The automation suite stays useful instead of becoming slow and noisy.

Practice this:
Choose five tests from a login and checkout module. Mark each as automate now, automate later, or keep manual.

Expected output:
You get a practical automation plan with clear priority.

## Test design for automation

Simple explanation:
Automated tests need clear input, action, and expected result. A vague test case becomes unstable automation.

Do this:
1. Write the precondition.
2. Write exact test data.
3. Write user actions in order.
4. Write one clear expected result.
5. Add cleanup steps if the test creates data.

Observe this:
The automated script becomes easier to code and easier to debug.

Practice this:
Convert a manual test for password reset into automation-ready steps.

Expected output:
The test has data, actions, assertions, and cleanup notes.

## CI execution

Simple explanation:
Running automation in CI helps catch issues early. CI tests should be reliable, fast enough, and easy to investigate when they fail.

Do this:
1. Run smoke tests on every commit.
2. Run full regression on schedule.
3. Save HTML reports, screenshots, and traces.
4. Tag flaky tests and fix them quickly.
5. Share failure summaries with developers.

Observe this:
The team trusts automation because failures come with useful evidence.

Practice this:
Create a CI checklist for a Playwright test suite.

Expected output:
The checklist includes trigger, browser, report, trace, and failure owner.
