(function () {
  'use strict';

  function example(title, code, explanation, language) {
    return { title: title, code: code, explanation: explanation, language: language || 'javascript' };
  }

  function topic(number, title, paragraphs, examples, ui) {
    return {
      id: 'playwright-notes-' + String(number).padStart(2, '0'),
      title: String(number).padStart(2, '0') + '. ' + title,
      paragraphs: paragraphs,
      practice: '',
      examples: examples || [],
      resources: [],
      ui: ui || []
    };
  }

  function flow(title, steps) {
    return { type: 'flow', title: title, steps: steps };
  }

  function checklist(title, items) {
    return { type: 'checklist', title: title, items: items };
  }

  window.TestNovaPlaywrightCurriculum = [
    topic(12, 'Run Your First Playwright Test', [
      'test() represents one test case. Its first argument is the test case name, and its second argument is the callback function containing the test steps.',
      'The import provides test for defining the test case and expect for assertions. async allows the callback to use await, while { page } gives the test a Playwright-controlled browser tab.',
      'The code inside the callback is the test body. page.goto() navigates the page to a URL.'
    ], [example('Your first test', "import { test, expect } from '@playwright/test';\n\ntest(\"My Test\", async ({ page }) => {\n  await page.goto(\"https://example.com\");\n});", 'Remember: one test() block is one test case.')]),

    topic(13, 'Page Fixture', [
      'The page fixture represents one browser page or tab. Playwright creates it automatically and passes it into the test callback.',
      'Before the test, Playwright prepares an isolated browser context and page. After the test, it closes and cleans them up. This isolation prevents cookies and session data from leaking between tests.'
    ], [], [flow('Page Fixture Lifecycle', ['Setup', 'Page Fixture', 'Test Steps', 'Cleanup'])]),

    topic(14, 'Async, Await and Promise', [
      'Browser operations take time, so Playwright APIs are asynchronous. page.goto() returns a Promise that completes after navigation finishes.',
      'await pauses the current test step until that Promise settles. Missing a required await can make later steps run too early, causing incorrect results or flaky failures.'
    ], [example('Wait for navigation', 'await page.goto("https://example.com");', 'Tip: use await with Playwright actions and asynchronous queries unless the API returns a locator or a synchronous value.')]),

    topic(15, 'Page Title and URL', [
      'page.title() asks the browser for the current document title and returns a Promise, so it needs await.',
      'page.url() immediately returns the current URL as a string, so it does not need await.'
    ], [
      example('Read the page title', 'const title = await page.title();\nconsole.log(title);', 'The title comes from the page document.'),
      example('Read the current URL', 'const url = page.url();\nconsole.log(url);', 'The current URL is available synchronously.')
    ]),

    topic(16, 'Basic Playwright Commands', [
      'Run commands from the project terminal. Normal mode is best for routine execution, headed mode shows the browser, and UI mode provides an interactive test runner.'
    ], [
      example('Run all tests', 'npx playwright test', 'Runs the Playwright test suite.', 'bash'),
      example('Run with a visible browser', 'npx playwright test --headed', 'Useful when you want to watch the test.', 'bash'),
      example('Open UI mode', 'npx playwright test --ui', 'Opens Playwright’s interactive test interface.', 'bash')
    ]),

    topic(17, 'Run an Individual Test', [
      '-g filters tests by title. Only test names matching the supplied text or pattern are selected.',
      'Add --headed when you also want to watch that matching test run in a browser window.'
    ], [
      example('Filter by test name', 'npx playwright test -g "Login Test"', 'Runs tests whose title matches Login Test.', 'bash'),
      example('Filter and show the browser', 'npx playwright test -g "Login Test" --headed', 'Runs the matching test in headed mode.', 'bash')
    ]),

    topic(18, 'Run Tests on a Specific Browser', [
      '--project selects a configured Playwright project. The webkit project uses WebKit, the browser engine behind Safari.',
      '--last-failed reruns only the tests that failed in the previous run. It can be combined with a project filter.'
    ], [
      example('Run WebKit tests', 'npx playwright test --project=webkit', 'Runs the selected tests with the WebKit project.', 'bash'),
      example('Rerun WebKit failures', 'npx playwright test --project=webkit --last-failed', 'Runs only the previously failed WebKit tests.', 'bash')
    ]),

    topic(19, 'Playwright Project & Test Result Files', [
      'playwright.config.js and playwright.config.ts configure test folders, browsers, timeouts, retries, reporters, and shared browser options. Use the extension that matches your JavaScript or TypeScript project.',
      'last-run.json records information about the latest run, including failed-test data used by --last-failed. The HTML report presents test status, duration, errors, steps, and attached artifacts in a browser-friendly format.'
    ], [], [checklist('Key Files', ['playwright.config.js — JavaScript configuration', 'playwright.config.ts — TypeScript configuration', 'last-run.json — latest run state', 'HTML report — readable test results and artifacts'])]),

    topic(20, 'Playwright Test for VS Code', [
      'The Playwright Test for VS Code extension lets you run and debug tests from the editor. Test Explorer shows available tests and their results.',
      'You can select a browser project and use Pick Locator to inspect an element in the browser and generate a suggested locator.'
    ], [], [checklist('Extension Features', ['Run a test', 'Debug a test', 'Browse tests in Test Explorer', 'Select a browser', 'Pick a locator'])]),

    topic(21, 'Assertions', [
      'Assertions compare an actual value produced by the application with an expected value. expect(actual).toBe(expected) performs an exact comparison.',
      'Playwright also provides matchers for booleans, numbers, strings, pages, and locators.'
    ], [
      example('Import the assertion API', "import { test, expect } from '@playwright/test';", 'expect is Playwright’s assertion function.'),
      example('Common value assertions', 'expect(10).toBe(10);\nexpect(true).toBeTruthy();\nexpect(false).toBeFalsy();\nexpect(10).toBeGreaterThan(5);\nexpect("Welcome to Playwright").toContain("Playwright");', 'The value inside expect() is actual; the matcher argument is expected.')
    ]),

    topic(22, 'Web-First Assertions', [
      'Web-first assertions inspect live browser state. Playwright automatically waits and retries until the expected condition is met or the assertion times out.',
      'This is more reliable than reading a value once while the page may still be updating.'
    ], [
      example('Check the title', 'await expect(page).toHaveTitle("Example");', 'Waits for the exact title.'),
      example('Check the URL', 'await expect(page).toHaveURL(/example/);', 'Waits for a URL containing example.')
    ]),

    topic(23, 'Assertion Timeout', [
      'Playwright web assertions wait and retry until the configured assertion timeout. A commonly used default is approximately 5 seconds unless expect.timeout is changed in configuration.',
      'If the condition is not reached in time, the assertion fails and the report shows the expected and received result.'
    ], [example('Configure assertion timeout', 'export default {\n  expect: { timeout: 5000 }\n};', 'Important: increase timeouts only when the application genuinely needs more time.')]),

    topic(24, 'Exact vs Partial Matching', [
      'A string checks the exact title. A regular expression can match part of the title.',
      'The i flag makes a regular expression case-insensitive, so /playwright/i matches Playwright, PLAYWRIGHT, or playwright.'
    ], [example('Exact and partial title checks', 'await expect(page).toHaveTitle("Playwright");\nawait expect(page).toHaveTitle(/Playwright/);\nawait expect(page).toHaveTitle(/playwright/i);', 'Choose exact matching when the full value is stable; use a regular expression for intentional partial matching.')]),

    topic(25, 'Locators Introduction', [
      'A locator describes how Playwright should find an element. Locators are lazy: Playwright finds the current matching element when an action or assertion runs.',
      'Before actions, Playwright automatically waits for the element to become ready.'
    ], [example('Find by placeholder and fill', 'await page.getByPlaceholder("Enter Email")\n  .fill("admin@email.com");', 'The locator targets the input by user-visible placeholder text.')]),

    topic(26, 'Actionability Checks', [
      'Before an action such as click(), Playwright checks that the locator resolves correctly and the element is visible, stable, not covered, enabled when required, and able to receive the action.',
      'These checks reduce timing problems and flaky automation because the action waits for a usable element instead of clicking too early.'
    ], [example('Click after actionability checks', 'await locator.click();', 'Playwright performs the required checks automatically.')], [checklist('Before the Action', ['Resolves correctly', 'Visible', 'Stable', 'Not obscured', 'Enabled when required', 'Able to receive the action'])]),

    topic(27, 'Locator Strictness', [
      'Actions are strict: if more than one element matches, Playwright reports an error instead of guessing.',
      'first() selects the first match and nth(1) selects the second match because indexes start at zero. A more specific semantic locator is normally preferable.'
    ], [example('Handle repeated text', 'await page.getByText("Sign in").click();\nawait page.getByText("Sign in").first().click();\nawait page.getByText("Sign in").nth(1).click();', 'Use first() or nth() only when selecting by position is intentional.')]),

    topic(28, 'Count Matching Elements', [
      'Creating a locator does not search the page immediately and does not require await. count() performs the browser query and returns a Promise, so count() does require await.'
    ], [example('Count matching elements', 'const locator = page.getByText("Sign in");\n\nconsole.log(await locator.count());', 'Remember: no await for locator creation; await the asynchronous count operation.')]),

    topic(29, 'getByPlaceholder()', [
      'getByPlaceholder() finds form controls by their placeholder text. It is useful when the placeholder is visible, meaningful, and stable.'
    ], [
      example('HTML input', '<input placeholder="Enter Email">', 'The input exposes Enter Email as its placeholder.', 'html'),
      example('Fill the input', 'await page.getByPlaceholder("Enter Email")\n  .fill("admin@email.com");', 'Playwright locates the input and fills it.')
    ]),

    topic(30, 'getByText()', [
      'getByText() finds an element by visible text. It is useful for unique labels, messages, menu items, and other text users can see.',
      'If several elements contain the same text, use a more specific locator to avoid strictness errors.'
    ], [example('Click visible text', 'await page.getByText("Sign in").click();', 'This is best when Sign in uniquely identifies the target element.')]),

    topic(31, 'getByRole()', [
      'getByRole() is usually the best locator because it targets the element as a user or assistive technology understands it.',
      'Common roles include button, link, textbox, checkbox, radio, and heading.',
      'Important: name means the element’s accessible name. It does not necessarily mean the HTML name attribute. The accessible name can come from visible text, a label, aria-label, or other accessibility information.'
    ], [example('Find a button by role and accessible name', "await page.getByRole('button', {\n  name: 'Sign in'\n}).click();", 'This targets the button role whose accessible name is Sign in.')], [checklist('Common Roles', ['button', 'link', 'textbox', 'checkbox', 'radio', 'heading'])]),

    topic(32, 'getByLabel()', [
      'getByLabel() finds a form control through its associated label. It is readable and encourages accessible forms.'
    ], [
      example('Labeled password input', '<label>\n  Password\n  <input type="password">\n</label>', 'The label is associated with the nested input.', 'html'),
      example('Fill by label', 'await page.getByLabel("Password").fill("test");', 'Playwright finds the password input through its label.')
    ]),

    topic(33, 'getByTitle()', [
      'getByTitle() finds an element by its HTML title attribute. Use it when the title communicates a stable, meaningful value.'
    ], [
      example('Element with a title', '<input title="Password must be 6 chars">', 'The title attribute describes the input.', 'html'),
      example('Fill by title', 'await page.getByTitle("Password must be 6 chars")\n  .fill("test");', 'The exact title identifies the element.')
    ]),

    topic(34, 'getByAltText()', [
      'getByAltText() finds images and image-like elements by alternative text. Good alt text makes images understandable when they cannot be seen.'
    ], [
      example('Image with alternative text', '<img alt="Company Logo">', 'The alt attribute provides the accessible text.', 'html'),
      example('Find the image', 'page.getByAltText("Company Logo");', 'Locator creation is synchronous and does not need await.')
    ]),

    topic(35, 'Locator Priority / Best Practices', [
      'Prefer semantic, accessibility-based locators because they resemble how users identify elements and are usually more stable than selectors tied to the DOM structure.',
      'Use test IDs when a stable user-facing locator is not available. Keep CSS and XPath as the final options for cases semantic locators cannot express.'
    ], [], [flow('Recommended Locator Priority', ['getByRole()', 'getByLabel()', 'getByPlaceholder()', 'getByText()', 'getByAltText() / getByTitle()', 'getByTestId()', 'CSS / XPath'])]),

    topic(36, 'Pick Locator', [
      'Pick Locator is available through the Playwright VS Code extension. It opens a browser for selecting an element and suggests a Playwright locator.',
      'Review the suggestion and prefer a stable, readable semantic locator.'
    ], [example('Example suggested locator', "page.getByRole('button', { name: 'Sign in' });", 'The picker commonly suggests role-based locators when accessibility information is available.')], [flow('Pick Locator Flow', ['Playwright Extension', 'Tools', 'Pick Locator', 'Browser', 'Select Element', 'Suggested Locator'])]),

    topic(37, 'SelectorsHub', [
      'SelectorsHub is a browser extension that opens from developer tools and helps inspect or generate selectors.',
      'It can help when investigating difficult elements, but prefer Playwright semantic locators whenever possible because they are more readable and user-focused.'
    ]),

    topic(38, 'XPath Introduction', [
      'XPath locates elements by their position, tag, attributes, or relationships in the document. Playwright accepts XPath directly when the selector starts with //.',
      'The explicit xpath= prefix is equivalent and can make the selector type clear.'
    ], [example('Two equivalent XPath forms', 'await page.locator("//input").fill("test");\nawait page.locator("xpath=//input").fill("test");', 'Both expressions locate matching input elements with XPath.')]),

    topic(39, 'XPath – Tag', [
      '//input selects input elements anywhere in the document. If several inputs exist, make the locator more specific before performing a strict action.'
    ], [
      example('XPath expression', '//input', 'Selects input tags.', 'xpath'),
      example('Playwright locator', 'page.locator("//input");', 'Creates a locator using that XPath expression.')
    ]),

    topic(40, 'XPath – Tag + Attribute', [
      'Add an attribute condition inside square brackets to narrow the matching tag.'
    ], [
      example('General syntax', "//tagname[@attribute='value']", 'Replace the tag, attribute, and value with the target element details.', 'xpath'),
      example('Select by name attribute', "//select[@name='state']", 'Finds select elements whose name is state.', 'xpath')
    ]),

    topic(41, 'XPath AND Condition', [
      'The and operator requires both attribute conditions to match the same element.'
    ], [example('Require two conditions', "//input[@type='text' and @name='email']", 'The input must have type text and name email.', 'xpath')]),

    topic(42, 'XPath OR Condition', [
      'The or operator matches when either condition is true. This can produce several matches, so confirm the result is specific enough.'
    ], [example('Allow either condition', "//input[@type='text' or @name='email']", 'An input matches when its type is text or its name is email.', 'xpath')]),

    topic(43, 'Dynamic XPath – contains()', [
      'contains() is useful when only part of a changing attribute is stable. IDs such as email, email1, and emailasdf all contain email.',
      'Use the stable portion carefully so the expression does not match unrelated elements.'
    ], [
      example('General syntax', "//tagname[contains(@attribute,'value')]", 'Checks whether an attribute contains the supplied text.', 'xpath'),
      example('Match a dynamic email ID', "//input[contains(@id,'email')]", 'Matches input IDs containing email.', 'xpath')
    ]),

    topic(44, 'CSS ID Locator', [
      'In CSS selectors, # represents an element ID. #gender2 selects the element whose id is gender2.',
      'IDs should be unique. Avoid an ID locator when the application generates a different ID on each run.'
    ], [example('Click by CSS ID', 'await page.locator("#gender2").click();', 'The locator targets id="gender2".')]),

    topic(45, 'Complete First Playwright Test', [
      'The test imports Playwright, defines one Login Test case, and receives an isolated page fixture.',
      'It navigates to the site, fills email and password fields with semantic locators, clicks the Sign in button by role and accessible name, then uses a retrying web-first assertion to verify the title.',
      'Each browser action is awaited so the steps run in the intended order.'
    ], [example('Complete login test', "import { test, expect } from '@playwright/test';\n\ntest(\"Login Test\", async ({ page }) => {\n  await page.goto(\"https://example.com\");\n\n  await page.getByPlaceholder(\"Enter Email\")\n    .fill(\"admin@email.com\");\n\n  await page.getByLabel(\"Password\")\n    .fill(\"password123\");\n\n  await page.getByRole(\"button\", {\n    name: \"Sign in\"\n  }).click();\n\n  await expect(page).toHaveTitle(/Example/);\n});", 'This combines navigation, fixtures, async actions, semantic locators, and a web-first assertion.')], [flow('Test Flow', ['Open page', 'Fill email', 'Fill password', 'Click Sign in', 'Verify title'])])
  ];
})();
