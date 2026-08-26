(function () {
  'use strict';

  function example(title, code, explanation, language) {
    return { title: title, code: code, explanation: explanation, language: language || 'javascript' };
  }

  function topic(number, title, paragraphs, examples, ui, resources) {
    return {
      id: 'playwright-notes-' + String(number).padStart(2, '0'),
      title: String(number).padStart(2, '0') + '. ' + title,
      paragraphs: paragraphs,
      practice: '',
      examples: examples || [],
      resources: resources || [],
      ui: ui || []
    };
  }

  function flow(title, steps) {
    return { type: 'flow', title: title, steps: steps };
  }

  function checklist(title, items) {
    return { type: 'checklist', title: title, items: items };
  }

  function table(title, headers, rows) {
    return { type: 'table', title: title, headers: headers, rows: rows };
  }

  function callout(title, tone, text) {
    return { type: 'callout', title: title, tone: tone, text: text };
  }

  window.TestNovaPlaywrightCurriculum = [
    topic(12, 'Run Your First Playwright Test', [
      'test() represents one test case. Its first argument is the test case name, and its second argument is the callback function containing the test steps.',
      'The import provides test for defining the test case and expect for assertions. async allows the callback to use await, while { page } gives the test a Playwright-controlled browser tab.',
      'The code inside the callback is the test body. page.goto() navigates the page to a URL.'
    ], [example('Your first test', "import { test, expect } from '@playwright/test';\n\ntest(\"My Test\", async ({ page }) => {\n  await page.goto(\"https://example.com\");\n});", 'Remember: one test() block is one test case.')]),

    topic(13, 'Page Fixture', [
      'The page fixture represents one browser page or tab. Playwright creates it automatically and passes it into the test callback.',
      'Before the test, Playwright prepares an isolated browser context and page. After the test, it closes and cleans them up. This isolation prevents cookies and session data from leaking between tests.',
      'The fixture is the initial tab, but its browser context can contain more pages. Normal CLI runs close fixture-owned pages during cleanup; use headed debug mode, UI mode, or page.pause() for temporary investigation.'
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
      'Run commands from the project terminal. By default, Playwright uses headless mode, so the browser UI is not displayed. Headed mode shows the browser, and UI mode provides an interactive test runner.',
      'UI mode helps run individual tests, inspect steps and errors, rerun tests, debug execution, and view traces.',
      'Debug mode opens Playwright Inspector for step-by-step execution, locator inspection, and page inspection. Codegen records browser interactions to create starter code, but generated code should always be reviewed.'
    ], [
      example('Run all tests', 'npx playwright test', 'Runs the Playwright test suite.', 'bash'),
      example('Run with a visible browser', 'npx playwright test --headed', 'Useful when you want to watch the test.', 'bash'),
      example('Open UI mode', 'npx playwright test --ui', 'Opens Playwright’s interactive test interface.', 'bash'),
      example('Open debug mode', 'npx playwright test --debug', 'Launches Playwright Inspector for step-by-step debugging.', 'bash'),
      example('Record starter code', 'npx playwright codegen https://example.com', 'Opens the site and generates code as you interact with it. Review and improve the result.', 'bash'),
      example('List discovered tests', 'npx playwright test --list', 'Shows the tests Playwright found without executing them.', 'bash'),
      example('Control parallel workers', 'npx playwright test --workers=1\nnpx playwright test --workers=4', 'Use one worker for sequential troubleshooting or several workers for parallel execution.', 'bash'),
      example('Open the HTML report', 'npx playwright show-report', 'Shows passed and failed tests, duration, errors, and configured artifacts.', 'bash')
    ], [table('Useful Playwright Commands - Quick Reference', ['Command', 'Purpose'], [
      ['npm init playwright@latest', 'Create a project with the latest Playwright version'],
      ['npm init playwright@1.62.0', 'Create a project with a specific version'],
      ['npx playwright install', 'Install Playwright browser binaries'],
      ['npx playwright test', 'Run tests'],
      ['npx playwright test --headed', 'Run tests with the browser visible'],
      ['npx playwright test --ui', 'Open UI mode'],
      ['npx playwright test --project=chromium', 'Run on Chromium'],
      ['npx playwright test --project=firefox', 'Run on Firefox'],
      ['npx playwright test --project=webkit', 'Run on WebKit'],
      ['npx playwright test example.spec.js', 'Run a specific test file'],
      ['npx playwright test -g "login"', 'Run tests whose titles match login'],
      ['npx playwright test --debug', 'Run in debug mode'],
      ['npx playwright codegen', 'Open Codegen'],
      ['npx playwright test --list', 'List discovered tests without running them'],
      ['npx playwright test --workers=1', 'Run with one worker']
    ])]),

    topic(17, 'Run an Individual Test', [
      '-g filters tests by title. Only test names matching the supplied text or pattern are selected.',
      'Add --headed when you also want to watch that matching test run in a browser window.',
      'You can also run one test file or list several test files when you do not want the complete suite.'
    ], [
      example('Filter by test name', 'npx playwright test -g "Login Test"', 'Runs tests whose title matches Login Test.', 'bash'),
      example('Filter and show the browser', 'npx playwright test -g "Login Test" --headed', 'Runs the matching test in headed mode.', 'bash'),
      example('Run one test file', 'npx playwright test example.spec.js', 'Runs tests found in the selected file.', 'bash'),
      example('Run multiple test files', 'npx playwright test example.spec.js registration.spec.js', 'Runs only the listed files.', 'bash')
    ]),

    topic(18, 'Run Tests on a Specific Browser', [
      '--project selects a browser project configured in playwright.config.js or playwright.config.ts. Common project names are chromium, firefox, and webkit. WebKit is the browser engine behind Safari.',
      '--last-failed reruns only the tests that failed in the previous run. Compatible options can be combined, such as a browser project with headed mode.'
    ], [
      example('Run each browser project', 'npx playwright test --project=chromium\nnpx playwright test --project=firefox\nnpx playwright test --project=webkit', 'Runs the suite with the selected configured browser project.', 'bash'),
      example('Rerun WebKit failures', 'npx playwright test --project=webkit --last-failed', 'Runs only the previously failed WebKit tests.', 'bash'),
      example('Combine compatible options', 'npx playwright test --project=chromium --headed', 'Runs the Chromium project with its browser window visible.', 'bash')
    ]),

    topic(19, 'Playwright Project & Test Result Files', [
      'playwright.config.js and playwright.config.ts configure test folders, browsers, timeouts, retries, reporters, and shared browser options. Use the extension that matches your JavaScript or TypeScript project.',
      'last-run.json records information about the latest run, including failed-test data used by --last-failed. The HTML report can present passed and failed tests, duration, error details, screenshots, traces, and attachments when those artifacts are configured.'
    ], [example('Open the latest HTML report', 'npx playwright show-report', 'Opens the browser-friendly report generated by the test run.', 'bash')], [checklist('Key Files', ['playwright.config.js — JavaScript configuration', 'playwright.config.ts — TypeScript configuration', 'last-run.json — latest run state', 'HTML report — readable test results and configured artifacts'])]),

    topic(20, 'Playwright Test for VS Code', [
      'The Playwright Test for VS Code extension lets you run and debug tests from the editor. Test Explorer shows available tests and their results.',
      'You can select a browser project and use Pick Locator to inspect an element in the browser and generate a suggested locator.',
      'For CLI debugging, npx playwright test --debug opens Playwright Inspector. Use either workflow to step through execution and understand failures.'
    ], [example('Debug from the terminal', 'npx playwright test --debug', 'Launches Playwright Inspector for the selected tests.', 'bash')], [checklist('Extension Features', ['Run a test', 'Debug a test', 'Browse tests in Test Explorer', 'Select a browser', 'Pick a locator'])]),

    topic(21, 'Assertions', [
      'Assertions compare an actual value produced by the application with an expected value. expect(actual).toBe(expected) performs an exact comparison.',
      'Playwright also provides matchers for booleans, numbers, strings, pages, and locators.'
    ], [
      example('Import the assertion API', "import { test, expect } from '@playwright/test';", 'expect is Playwright’s assertion function.'),
      example('Common value assertions', 'expect(10).toBe(10);\nexpect(true).toBeTruthy();\nexpect(false).toBeFalsy();\nexpect(10).toBeGreaterThan(5);\nexpect("Welcome to Playwright").toContain("Playwright");', 'The value inside expect() is actual; the matcher argument is expected.')
    ]),

    topic(22, 'Web-First Assertions', [
      'Web-first assertions inspect live browser state. Playwright automatically waits and retries until the expected condition is met or the assertion times out.',
      'This is more reliable than reading a value once while the page may still be updating.',
      'Use assertions for important expected outcomes and state changes. Playwright actions already wait for elements to become actionable, so avoid adding a visibility check after every step.'
    ], [
      example('Check the title', 'await expect(page).toHaveTitle("Example");', 'Waits for the exact title.'),
      example('Check the URL', 'await expect(page).toHaveURL(/example/);', 'Waits for a URL containing example.'),
      example('Common locator assertions', 'await expect(locator).toBeVisible();\nawait expect(locator).toBeHidden();\nawait expect(locator).toBeEnabled();\nawait expect(locator).toBeDisabled();\nawait expect(locator).toBeChecked();\nawait expect(locator).toHaveText("Welcome");\nawait expect(locator).toContainText("Welcome");\nawait expect(locator).toHaveValue("Mukesh");\nawait expect(locator).toHaveCount(5);', 'Matcher names are exact: use toBeEnabled() and toBeDisabled().')
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
      'Before actions, Playwright automatically waits for the element to become ready.',
      'For normal form entry, prefer fill(). Use pressSequentially() only when the application must receive individual keyboard events, such as an autocomplete or masked input.'
    ], [
      example('Find by placeholder and fill', 'await page.getByPlaceholder("Enter Email")\n  .fill("admin@email.com");', 'The locator targets the input by user-visible placeholder text.'),
      example('Send individual key events when required', 'await page.getByLabel("Email")\n  .pressSequentially("learner@example.com", { delay: 50 });', 'Use this only when the application depends on each keyboard event.')
    ]),

    topic(26, 'Actionability Checks', [
      'Before an action such as click(), Playwright checks that the locator resolves correctly and the element is visible, stable, not covered, enabled when required, and able to receive the action.',
      'These checks reduce timing problems and flaky automation because the action waits for a usable element instead of clicking too early.'
    ], [example('Click after actionability checks', 'await locator.click();', 'Playwright performs the required checks automatically.')], [checklist('Before the Action', ['Resolves correctly', 'Visible', 'Stable', 'Not obscured', 'Enabled when required', 'Able to receive the action'])]),

    topic(27, 'Locator Strictness', [
      'Actions are strict: if more than one element matches, Playwright reports an error instead of guessing.',
      'first() selects the first match and nth(1) selects the second match because indexes start at zero. Use positions only when order is part of the requirement and stable.',
      'A unique accessible name, a stable parent scope, filter(), or a test ID is normally safer than depending on position.'
    ], [
      example('Handle repeated text', 'await page.getByText("Sign in").click();\nawait page.getByText("Sign in").first().click();\nawait page.getByText("Sign in").nth(1).click();', 'Use first() or nth() only when selecting by position is intentional.'),
      example('Scope a repeated field', 'const billing = page.getByRole("group", {\n  name: "Billing address"\n});\nawait billing.getByLabel("City").fill("Pune");', 'Scoping expresses which City field the test means.')
    ]),

    topic(28, 'Count Matching Elements', [
      'Creating a locator does not search the page immediately and does not require await. count() performs the browser query and returns a Promise, so count() does require await.'
    ], [example('Count matching elements', 'const locator = page.getByText("Sign in");\n\nconsole.log(await locator.count());', 'Remember: no await for locator creation; await the asynchronous count operation.')]),

    topic(29, 'getByPlaceholder()', [
      'getByPlaceholder() finds an input or textarea by placeholder text. A placeholder is a hint shown inside an empty control; it is not the entered value and is not a replacement for a proper label.',
      'When a form control has an associated label, getByLabel() is usually the stronger choice.'
    ], [
      example('HTML input', '<input placeholder="Enter Email">', 'The input exposes Enter Email as its placeholder.', 'html'),
      example('Fill the input', 'await page.getByPlaceholder("Enter Email")\n  .fill("admin@email.com");', 'Playwright locates the input and fills it.')
    ]),

    topic(30, 'getByText()', [
      'getByText() finds an element by visible text. It is useful for unique labels, messages, menu items, and other text users can see.',
      'By default, text matching can find text within a longer string. Use { exact: true } when the complete text must match.',
      'Partial matching may find several elements, so use a more specific locator when needed to avoid strictness errors.'
    ], [
      example('Click visible text', 'await page.getByText("Sign in").click();', 'This is best when Sign in uniquely identifies the target element.'),
      example('Require exact text', 'await page.getByText("AI", { exact: true }).click();', 'Only an element whose text matches AI exactly is selected.'),
      example('Allow a partial text match', 'page.getByText("Sign up", { exact: false });', 'This can match longer text containing Sign up; confirm that the result is unique.')
    ]),

    topic(31, 'getByRole()', [
      'getByRole() is usually the best locator because it targets the element as a user or assistive technology understands it.',
      'Common roles include button, link, textbox, checkbox, radio, and heading.',
      'Important: name means the computed accessible name. It is not the HTML name attribute. The accessible name can come from visible text, a linked label, aria-label, aria-labelledby, alt text, or other accessibility rules.',
      'Use standard ARIA role names exactly. A valid but incorrect role usually matches nothing and times out; an unsupported role can be rejected.'
    ], [
      example('Find a button by role and accessible name', "await page.getByRole('button', {\n  name: 'Sign in'\n}).click();", 'This targets the button role whose accessible name is Sign in.'),
      example('HTML name is not the accessible name', '<label for="email">Work email</label>\n<input id="email" name="email">', 'Here the linked label gives the textbox its accessible name: Work email.', 'html'),
      example('Use the computed accessible name', 'await page.getByRole("textbox", {\n  name: "Work email"\n}).fill("a@b.com");', 'Playwright matches Work email, not the form-submission name value email.')
    ], [checklist('Common Roles', ['button', 'link', 'textbox', 'checkbox', 'radio', 'heading'])]),

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
      'getByAltText() finds images and image-like elements by alternative text. Good alt text makes images understandable when they cannot be seen.',
      'Alt text can legitimately repeat. When several images match, scope the locator to a stable card, row, region, or other container instead of relying on nth() when order may change.'
    ], [
      example('Image with alternative text', '<img alt="Company Logo">', 'The alt attribute provides the accessible text.', 'html'),
      example('Find the image', 'page.getByAltText("Company Logo");', 'Locator creation is synchronous and does not need await.')
    ]),

    topic(35, 'Locator Priority / Best Practices', [
      'Prefer semantic, accessibility-based locators because they resemble how users identify elements and are usually more stable than selectors tied to the DOM structure.',
      'Use test IDs when a stable user-facing locator is not available and the application provides a consistent testing contract. A test ID can still be unsuitable when it is dynamic or not unique.',
      'Keep CSS and XPath as the final options for cases semantic locators cannot express. Whatever strategy you choose, check uniqueness, stability, and readability.'
    ], [], [flow('Recommended Locator Priority', ['getByRole()', 'getByLabel()', 'getByPlaceholder()', 'getByText()', 'getByAltText() / getByTitle()', 'getByTestId()', 'CSS / XPath'])]),

    topic(36, 'Pick Locator', [
      'Pick Locator is available through the Playwright VS Code extension. It opens a browser for selecting an element and suggests a Playwright locator.',
      'It is also available in Playwright Inspector, which can be opened with --debug or page.pause(). The picker highlights matching elements while you inspect them.',
      'Do not trust generated output blindly. Review and simplify the suggestion, confirm that it uniquely matches, and practise writing locators manually.'
    ], [
      example('Open Inspector', 'npx playwright test --debug', 'Run in debug mode, then use Pick Locator from the Inspector toolbar.', 'bash'),
      example('Pause at a chosen step', 'await page.pause();', 'Pauses the test so you can inspect the current browser state.'),
      example('Example suggested locator', "page.getByRole('button', { name: 'Sign in' });", 'The picker commonly suggests role-based locators when accessibility information is available.')
    ], [flow('Pick Locator Flow', ['Playwright Extension or Inspector', 'Pick Locator', 'Browser', 'Select Element', 'Suggested Locator', 'Review and simplify'])]),

    topic(37, 'SelectorsHub', [
      'SelectorsHub is a browser extension that opens from developer tools and helps inspect or generate selectors.',
      'It can help when investigating difficult elements, but prefer Playwright semantic locators whenever possible because they are more readable and user-focused.',
      'Generated selectors still need manual review. Because company security policies differ, confirm that browser extensions are permitted before using SelectorsHub on work systems.'
    ]),

    topic(38, 'XPath Introduction', [
      'XPath locates elements by their position, tag, attributes, or relationships in the document. Playwright accepts XPath directly when the selector starts with //.',
      'The explicit xpath= prefix is equivalent and can make the selector type clear.',
      'A relative XPath commonly starts with // and searches from the current document or scope. An absolute XPath starts with / at the document root and follows the full hierarchy, making it more likely to break when the page layout changes.',
      'Prefer Playwright locators such as getByRole(), getByLabel(), or getByTestId() when they clearly express the target. Use XPath when semantic locators cannot describe a stable relationship.'
    ], [
      example('Two equivalent XPath forms', 'await page.locator("//input").fill("test");\nawait page.locator("xpath=//input").fill("test");', 'Both expressions locate matching input elements with XPath.'),
      example('Relative and absolute examples', '//input[@name="email"]\n/html/body/main/form/input', 'The relative XPath is usually easier to read and maintain. Avoid long absolute paths.')
    ], [table('Relative vs Absolute XPath', ['Type', 'Starts with', 'Guidance'], [['Relative', '//', 'Searches broadly or within the current scope; generally preferred'], ['Absolute', '/', 'Starts at the document root; often brittle']])]),

    topic(39, 'XPath – Tag', [
      '//input selects input elements anywhere in the document. The same pattern works with tags such as a, img, select, and button.',
      'If several elements match, make the locator more specific before performing a strict action. Creating page.locator() itself does not require await; await the action or asynchronous query.'
    ], [
      example('XPath tag expressions', '//input\n//a\n//img\n//select\n//button', 'Each expression selects matching tags anywhere below the current scope.', 'xpath'),
      example('Create and use the locator', 'const email = page.locator("//input");\nawait email.fill("test@gmail.com");', 'Locator creation is synchronous; fill() is asynchronous.')
    ]),

    topic(40, 'XPath – Tag + Attribute', [
      'Add an attribute condition inside square brackets to narrow the matching tag. In XPath, @ represents an attribute.',
      'Attribute names and values follow the page markup and are case-sensitive: state and State are different values.',
      'Single quotes and double quotes both work inside XPath. Balance them with the surrounding JavaScript string, or use a template literal when interpolation is useful.'
    ], [
      example('General syntax', "//tagname[@attribute='value']", 'Replace the tag, attribute, and value with the target element details.', 'xpath'),
      example('Common attribute examples', "//select[@name='state']\n//input[@id='email']\n//input[@placeholder='Email']\n//input[@type='email']", 'Choose an attribute that is stable and specific.', 'xpath'),
      example('Balance JavaScript and XPath quotes', "page.locator('//input[@type=\"email\"]');\npage.locator(\"//input[@type='email']\");\n\nconst field = 'email';\npage.locator(`//input[@name='${field}']`);", 'A quote error is usually a JavaScript string problem, not an XPath limitation.')
    ]),

    topic(41, 'XPath AND Condition', [
      'The and operator requires every listed condition to match the same element. Add attributes only when each one helps identify the intended element.'
    ], [
      example('Require two conditions', "//input[@type='text' and @name='email']", 'The input must have type text and name email.', 'xpath'),
      example('Require three conditions', "//input[@type='email' and @name='email' and @placeholder='Email']", 'All three attributes must match.', 'xpath')
    ]),

    topic(42, 'XPath OR Condition', [
      'The or operator matches when any listed condition is true. Because it deliberately broadens the match, confirm that the locator still identifies the intended element.',
      'Use count() or the locator picker to check uniqueness. Do not use nth() merely to silence a strict-mode error unless position is part of the requirement.'
    ], [example('Allow either condition', "//input[@type='text' or @name='email' or @placeholder='Email']", 'An input matches when at least one condition is true.', 'xpath'), example('Check the number of matches', 'const fields = page.locator("//input[@type=\'text\' or @name=\'email\']");\nconsole.log(await fields.count());', 'Count the matches before relying on a broad OR expression.')]),

    topic(43, 'Dynamic XPath – contains()', [
      'contains() is useful when only part of a changing attribute is stable. IDs such as email, email1, and emailasdf all contain email.',
      'Use the stable portion carefully so the expression does not match unrelated elements. XPath is case-sensitive, so Email and email are different.',
      'Before using a partial XPath, first look for a stable role, label, accessible name, test ID, or parent scope. starts-with() is another option when the stable portion is specifically at the beginning.'
    ], [
      example('General syntax', "//tagname[contains(@attribute,'value')]", 'Checks whether an attribute contains the supplied text.', 'xpath'),
      example('Partial attribute examples', "//input[contains(@id,'email')]\n//img[contains(@src,'menu')]\n//a[contains(@href,'dashboard')]\n//select[contains(@name,'state')]", 'Use the stable part of a changing attribute.', 'xpath'),
      example('Match a stable prefix', "//input[starts-with(@id,'user_')]", 'Use starts-with() when the attribute reliably begins with the same text.', 'xpath'),
      example('Combine exact and partial conditions', "//input[@type='email' and contains(@name,'email')]", 'Both the exact type and partial name condition must match.', 'xpath')
    ]),

    topic(44, 'CSS ID Locator', [
      'In CSS selectors, # represents an element ID. #gender2 selects the element whose id is gender2.',
      'IDs should be unique. Avoid an ID locator when the application generates a different ID on each run.',
      'Playwright auto-detects CSS and XPath in page.locator(). CSS partial-attribute selectors can also match stable fragments, but semantic Playwright locators remain the first choice.'
    ], [example('Click by CSS ID', 'await page.locator("#gender2").click();', 'The locator targets id="gender2".'), example('CSS and XPath comparison', 'page.locator("input[id*=\'email\']");\npage.locator("//input[contains(@id, \'email\')]");', 'Both match an input whose ID contains email. Choose the clearest stable strategy.')]),

    topic(45, 'Complete First Playwright Test', [
      'The test imports Playwright, defines one Login Test case, and receives an isolated page fixture.',
      'It navigates to the site, fills email and password fields with semantic locators, clicks the Sign in button by role and accessible name, then uses a retrying web-first assertion to verify the title.',
      'Each browser action is awaited so the steps run in the intended order.'
    ], [example('Complete login test', "import { test, expect } from '@playwright/test';\n\ntest(\"Login Test\", async ({ page }) => {\n  await page.goto(\"https://example.com\");\n\n  await page.getByPlaceholder(\"Enter Email\")\n    .fill(\"admin@email.com\");\n\n  await page.getByLabel(\"Password\")\n    .fill(\"password123\");\n\n  await page.getByRole(\"button\", {\n    name: \"Sign in\"\n  }).click();\n\n  await expect(page).toHaveTitle(/Example/);\n});", 'This combines navigation, fixtures, async actions, semantic locators, and a web-first assertion.')], [flow('Test Flow', ['Open page', 'Fill email', 'Fill password', 'Click Sign in', 'Verify title'])]),

    topic(46, 'Dropdowns: Native vs Custom', [
      'A native HTML dropdown uses a select element containing option elements. Playwright provides selectOption() specifically for this control.',
      'A custom dropdown may look similar but is built from elements such as div, input, listbox, and option. Do not use selectOption() unless the DOM contains a real select element.'
    ], [
      example('Native HTML dropdown', '<select id="state">\n  <option value="GA">Goa</option>\n  <option value="GJ">Gujarat</option>\n</select>', 'A real select element can use selectOption().', 'html'),
      example('Inspect before choosing an API', 'const state = page.locator("#state");\nawait state.selectOption({ label: "Goa" });', 'The locator targets a native select control.')
    ], [table('Dropdown Types', ['Type', 'Typical DOM', 'Playwright approach'], [['Native', '<select> with <option>', 'selectOption()'], ['Custom', 'button/input/listbox/options', 'Click or fill, then select an option locator']])]),

    topic(47, 'Select by Label, Value or Index', [
      'selectOption() can select a native option by visible label, HTML value, or zero-based index.',
      'Prefer label first because it represents what the user sees. Use value when it is a stable application contract. Treat index as the most fragile option because positions change when options are added or removed.'
    ], [
      example('Select by visible label', 'await page.locator("#state")\n  .selectOption({ label: "Goa" });', 'Recommended when the visible option text is stable.'),
      example('Select by HTML value', 'await page.locator("#state")\n  .selectOption({ value: "GJ" });', 'Matches the option value attribute.'),
      example('Select by zero-based index', 'await page.locator("#state")\n  .selectOption({ index: 4 });', 'Index 4 selects the fifth option.')
    ], [flow('Recommended Selection Priority', ['Label', 'Value', 'Index'])]),

    topic(48, 'Multi-Select Dropdowns', [
      'A single-select control accepts one option. A native multi-select control can accept several options at the same time.',
      'Pass an array to selectOption() for multiple values. Confirm that the HTML select supports multiple selections.'
    ], [
      example('Multi-select HTML', '<select id="hobbies" multiple>\n  <option>Playing</option>\n  <option>Swimming</option>\n  <option>Dancing</option>\n</select>', 'The multiple attribute allows more than one option.', 'html'),
      example('Select several options', 'await page.locator("#hobbies")\n  .selectOption(["Playing", "Swimming", "Dancing"]);', 'The array selects all three matching options.')
    ]),

    topic(49, 'Custom Dropdowns', [
      'Custom dropdowns do not use a native select element, so selectOption() will not work. Open the dropdown, wait for its options, and choose the required option with a semantic locator.',
      'Roles such as combobox, listbox, and option often describe custom dropdown behavior. Use the exact roles exposed by the application.'
    ], [example('Choose from a custom dropdown', 'await page.getByRole("combobox", { name: "City" }).click();\nawait page.getByRole("option", { name: "Bengaluru" }).click();', 'The first action opens the control; the second selects the user-visible option.')], [flow('Custom Dropdown Flow', ['Open the control', 'Wait for options', 'Locate by role and name', 'Choose the option', 'Verify the result'])]),

    topic(50, 'Dynamic Registration Test Data', [
      'Registration tests often need a new email for each positive run. Reusing the same address can produce an already-registered error instead of exercising successful registration.',
      'Date.now() provides a timestamp that can make a safe test-domain email unique. Reuse an existing address intentionally for a negative duplicate-email scenario.',
      'Do not use real customer data or send test data to public disposable-email services unless the workflow requires email delivery and company policy permits it.'
    ], [
      example('Create a timestamp email', 'const email = `user_${Date.now()}@test.example`;\nawait page.getByLabel("Email").fill(email);', 'Each run receives a changing timestamp-based address.'),
      example('Positive and negative scenarios', '// Positive: register with a new generated email.\n// Negative: reuse an existing email and verify the duplicate error.', 'Dynamic data should support the scenario, not hide the behavior being tested.')
    ]),

    topic(51, 'Unique Data in Parallel Tests', [
      'Workers can run tests at the same time. They do not create users automatically, but parallel registration tests can collide if they generate the same data.',
      'Combine a timestamp with testInfo.workerIndex or testInfo.parallelIndex when parallel tests require distinct values.'
    ], [example('Include the worker index', 'test("register user", async ({ page }, testInfo) => {\n  const email = `qa_${Date.now()}_${testInfo.workerIndex}@test.example`;\n  await page.getByLabel("Email").fill(email);\n});', 'The timestamp and worker index reduce collisions between concurrent runs.')]),

    topic(52, 'Faker Test Data', [
      'Faker can generate realistic names, emails, addresses, phone numbers, passwords, UUIDs, dates, and other test values.',
      'Before adding a third-party package at work, check company policy, licence, maintenance, vulnerabilities, and the approved dependency list.',
      'Generated data is useful for variation, but assertions should still verify clear expected outcomes.'
    ], [
      example('Install Faker', 'npm install --save-dev @faker-js/faker', 'Adds Faker as a development dependency.', 'bash'),
      example('Generate test data', "import { faker } from '@faker-js/faker';\n\nconst firstName = faker.person.firstName();\nconst lastName = faker.person.lastName();\nconst email = faker.internet.exampleEmail();", 'exampleEmail() uses reserved example domains, which is safer for test data.'),
      example('Fill a form with Faker', 'await page.getByPlaceholder("First Name")\n  .fill(faker.person.firstName());\nawait page.getByPlaceholder("Email")\n  .fill(faker.internet.exampleEmail());', 'Faker values can be passed directly to Playwright actions.')
    ]),

    topic(53, 'XPath Text Functions', [
      'text() matches an element text node exactly. contains() supports partial text matching.',
      'normalize-space() trims leading and trailing whitespace and collapses repeated spaces or line breaks. It is useful when formatted HTML prevents a simple exact-text expression from matching.'
    ], [
      example('Exact and partial text XPath', "//button[text()='Sign up']\n//button[contains(text(),'Sign up')]", 'Use exact text when the full value is stable and partial text when intentional.', 'xpath'),
      example('Normalize formatted text', "//button[normalize-space()='Sign up']\n//button[contains(normalize-space(),'Sign up')]", 'normalize-space() makes whitespace-heavy markup easier to match.', 'xpath')
    ], [checklist('XPath Text Functions', ['text() - exact text node', 'contains() - partial value', 'starts-with() - stable prefix', 'normalize-space() - normalized whitespace'])]),

    topic(54, 'XPath Axes Introduction', [
      'XPath axes locate elements through their relationship to another element. Common axes include following, following-sibling, preceding, preceding-sibling, parent, ancestor, child, and descendant.',
      'Use relationship-based XPath only when it expresses a stable DOM relationship that semantic Playwright locators cannot describe clearly.'
    ], [], [checklist('Common XPath Axes', ['following', 'following-sibling', 'preceding', 'preceding-sibling', 'parent', 'ancestor', 'child', 'descendant'])]),

    topic(55, 'Following and Sibling Axes', [
      'following:: searches matching elements later in document order and can continue beyond the current row or container.',
      'following-sibling:: searches only later siblings with the same parent. preceding-sibling:: moves in the opposite direction. Use [1] for the nearest matching sibling in that direction.'
    ], [
      example('Following can search beyond the row', "//td[text()='Agentic']/following::td", 'This may return many td elements later in the document.', 'xpath'),
      example('Select cells in the same row', "//td[text()='Agentic']/following-sibling::td[1]\n//td[text()='Agentic']/following-sibling::td[2]", 'The first expression gets the next cell; the second gets the following cell after that.', 'xpath'),
      example('Move to a preceding sibling', "//td[text()='Active']/preceding-sibling::td[1]", 'Selects the nearest earlier td under the same parent.', 'xpath')
    ], [table('Axis Difference', ['Axis', 'Scope'], [['following::', 'Matching elements later in document order'], ['following-sibling::', 'Later matching elements with the same parent'], ['preceding-sibling::', 'Earlier matching elements with the same parent']])]),

    topic(56, 'Parent, Ancestor and Dynamic CSS', [
      'parent:: selects the direct parent, while ancestor:: can select a matching container higher in the hierarchy. The .. shortcut also means the parent node.',
      'For dynamic CSS attributes, ^= means starts with, $= means ends with, and *= means contains. Prefer a semantic locator before CSS or XPath when possible.'
    ], [
      example('Parent and ancestor XPath', "//button[text()='Sign up']/parent::div\n//button[text()='Sign up']/..\n//button[text()='Sign up']/ancestor::form", 'Use the relationship that accurately describes the target container.', 'xpath'),
      example('Dynamic CSS attributes', "input[id^='email']\ninput[id$='12345']\ninput[id*='email']", 'These selectors match a stable prefix, suffix, or contained fragment.', 'css')
    ], [table('Dynamic CSS Operators', ['Operator', 'Meaning'], [['^=', 'Starts with'], ['$=', 'Ends with'], ['*=', 'Contains']])]),

    topic(57, 'Registration Test with Dropdown and Dynamic Data', [
      'This example combines unique test data, a native dropdown, a semantic button locator, and a web-first success assertion.',
      'Assertions should validate important outcomes and state changes. Playwright actions already perform actionability checks, so a visibility assertion is not required after every action.'
    ], [example('Complete registration flow', "import { test, expect } from '@playwright/test';\n\ntest('register a new user', async ({ page }, testInfo) => {\n  const email = `qa_${Date.now()}_${testInfo.workerIndex}@test.example`;\n\n  await page.goto('https://example.com/register');\n  await page.getByLabel('Email').fill(email);\n  await page.getByLabel('State').selectOption({ label: 'Goa' });\n  await page.getByRole('button', { name: 'Sign up' }).click();\n\n  await expect(\n    page.getByText('Signup successfully, Please login!')\n  ).toBeVisible();\n});", 'The generated email prevents positive registration runs from reusing the same account.')], [flow('Registration Flow', ['Generate unique email', 'Fill registration form', 'Select state', 'Submit', 'Verify success'])]),

    topic(58, 'AI-Powered E2E Testing with Playwright MCP', [
      'Playwright MCP lets an AI assistant open a browser, inspect the page, perform the scenario step by step, and then generate a Playwright test from what actually happened.',
      'Follow the steps below in order. This example uses VS Code, TypeScript, and the BBC website.'
    ], [
      example('Step 0 - prerequisites and project folder', 'node --version\nnpm --version\nmkdir D:\\playwright-mcp-github-mcp\ncd D:\\playwright-mcp-github-mcp\nnpm init playwright@latest', 'Install Node.js 18 or newer and VS Code first. During Playwright setup, choose TypeScript and keep the tests directory.', 'bash'),
      example('Step 1 - install Playwright MCP in VS Code', '1. Open https://github.com/microsoft/playwright-mcp\n2. Find the VS Code installation section.\n3. Click Install Server.\n4. Allow VS Code to open.\n5. Confirm that the Playwright MCP server is enabled.', 'The official repository provides the VS Code Install Server button. Restart VS Code if the Playwright tools do not appear in chat.', 'text'),
      example('Step 2 - create testcontext.txt', 'D:\\playwright-mcp-github-mcp\\testcontext.txt', 'Create this file in the project folder, then paste the instructions shown in the next block.', 'text'),
      example('Paste this into testcontext.txt', 'You are a Playwright test generator.\n\nYou are given a scenario and you need to generate a Playwright test for it.\n\nDO NOT generate test code based on the scenario alone.\n\nDO run steps one by one using the tools provided by the Playwright MCP.\n\nOnly after all steps are completed, emit a Playwright TypeScript test that uses\n@playwright/test based on message history.\n\nSave generated test file in the tests directory.\n\nExecute the test file and iterate until the test passes.', 'Save the file after pasting the complete instruction.', 'text'),
      example('Step 3 - install the Playwright browser', 'cd D:\\playwright-mcp-github-mcp\nnpx playwright install', 'Run this in the VS Code terminal before asking the assistant to execute the generated test.', 'bash'),
      example('Step 4 - send this prompt in the chat window', 'Read and follow testcontext.txt.\n\nWrite a complete automation script using Playwright with TypeScript to perform the following steps:\n\nNavigate to the live BBC website: https://www.bbc.com/.\n\nWait until the network conditions are completely idle to ensure all dynamic elements and menu lists are loaded.\n\nLocate all hyperlink anchor tags (<a>) present on the page.\n\nExtract the href attribute from each element and print the clean link text and URL in the terminal using console.log.\n\nSave the generated test in the tests directory, execute it, and iterate until it passes.', 'Open the VS Code chat in Agent mode so it can use the Playwright MCP tools and project files.', 'text'),
      example('Step 5 - run the generated test', 'npx playwright test\nnpx playwright test --headed', 'The first command runs normally. Use headed mode when you want to watch the browser.', 'bash'),
      example('Step 6 - generate and open the HTML report', 'npx playwright test --reporter=html\nnpx playwright show-report', 'The first command runs the tests and creates the HTML report. The second command opens the latest report.', 'bash')
    ], [flow('Playwright MCP Workflow', ['Check prerequisites', 'Create the Playwright project', 'Install Playwright MCP in VS Code', 'Create testcontext.txt', 'Install browser binaries', 'Send the BBC scenario in Agent chat', 'Run the generated test', 'Open the HTML report'])]),

    topic(59, 'Playwright Codegen', [
      'Playwright Codegen records actions performed in a browser and automatically generates Playwright JavaScript code and locators.',
      'The command opens two windows: a browser where you perform actions and Playwright Inspector where the generated code appears. This lesson uses SauceDemo as the practice website.'
    ], [
      example('Start Codegen with SauceDemo', 'npx playwright codegen https://www.saucedemo.com/', 'Perform the login actions in the opened browser and watch Inspector generate the code.', 'bash'),
      example('Generated login actions', "await page.goto('https://www.saucedemo.com/');\nawait page.getByPlaceholder('Username').fill('standard_user');\nawait page.getByPlaceholder('Password').fill('secret_sauce');\nawait page.getByRole('button', { name: 'Login' }).click();", 'Codegen creates a useful starting point that should be reviewed before use.'),
      example('Complete login test', "import { test, expect } from '@playwright/test';\n\ntest('login using generated code', async ({ page }) => {\n  await page.goto('https://www.saucedemo.com/');\n\n  await page.getByPlaceholder('Username').fill('standard_user');\n  await page.getByPlaceholder('Password').fill('secret_sauce');\n  await page.getByRole('button', { name: 'Login' }).click();\n\n  await expect(page).toHaveURL(/inventory/);\n  await expect(page.getByText('Products')).toBeVisible();\n});", 'The assertions verify the important result of the generated login steps.')
    ], [flow('Codegen Flow', ['Run the command', 'Use the browser', 'Review code in Inspector', 'Add meaningful assertions', 'Run the test'])], [{ label: 'Open SauceDemo', url: 'https://www.saucedemo.com/' }]),

    topic(60, 'Codegen Tools and Assertions', [
      'The Playwright Inspector toolbar helps record actions, select locators, and add common assertions.',
      'Record captures clicks, text input, checkbox and radio-button actions, dropdown selections, and page navigation.'
    ], [
      example('Record', 'Click Record, perform the browser actions, and watch the generated steps appear in Inspector.', 'Stop recording before using Pick Locator.', 'text'),
      example('Pick Locator', '1. Stop recording.\n2. Click Pick Locator.\n3. Hover over the required element.\n4. Click the element.\n5. Copy the generated locator.', 'Example result: page.getByRole(\'button\', { name: \'Login\' })', 'text'),
      example('Assert Visibility', "await expect(page.getByText('Products')).toBeVisible();", 'Checks that the Products element is visible.'),
      example('Assert Text', "await expect(page.getByText('Products')).toHaveText('Products');", 'Checks the complete text value.'),
      example('Assert Value', "await expect(\n  page.getByPlaceholder('Username')\n).toHaveValue('standard_user');", 'Checks the current input value.'),
      example('Assert Screenshot', "await expect(page).toHaveScreenshot('saucedemo-login.png');", 'Screenshot assertions compare the current screenshot with a saved baseline image.')
    ], [checklist('Record Captures', ['Click actions', 'Text input', 'Checkbox and radio-button actions', 'Dropdown selections', 'Page navigation'])]),

    topic(61, 'Generate Only a Locator', [
      'Codegen can generate a locator without recording a complete workflow. Start Codegen, stop recording, and use Pick Locator.',
      'Playwright generally prefers user-facing and accessible locators before CSS or XPath.'
    ], [
      example('Open Codegen', 'npx playwright codegen https://www.saucedemo.com/', 'Wait for the browser and Inspector to open.', 'bash'),
      example('Locator-only workflow', 'Stop Recording -> Pick Locator -> Click Element -> Copy Locator', 'Use this workflow prominently when you need only one locator.', 'text'),
      example('Example result', "page.getByRole('button', { name: 'Login' })", 'Review that the locator is unique and stable.')
    ], [
      flow('Generate Only a Locator', ['Stop Recording', 'Pick Locator', 'Click Element', 'Copy Locator']),
      checklist('Preferred Locator Order', ['1. Role', '2. Label', '3. Placeholder', '4. Text', '5. Test ID', '6. CSS or XPath when necessary'])
    ], [{ label: 'Practise on SauceDemo', url: 'https://www.saucedemo.com/' }]),

    topic(62, 'Codegen Emulation', [
      'Codegen options let you record under a chosen viewport, device, colour scheme, language, time zone, or location.',
      'Choose emulation that matches the scenario you need to test.'
    ], [
      example('Custom viewport', 'npx playwright codegen --viewport-size="1280,720" https://www.saucedemo.com/', 'Records with a 1280 by 720 viewport.', 'bash'),
      example('Mobile device', 'npx playwright codegen --device="iPhone 13" https://www.saucedemo.com/', 'Uses the Playwright device profile for iPhone 13.', 'bash'),
      example('Dark colour scheme', 'npx playwright codegen --color-scheme="dark" https://www.saucedemo.com/', 'Requests the dark colour preference.', 'bash'),
      example('Language', 'npx playwright codegen --lang="en-GB" https://www.saucedemo.com/', 'Uses the specified browser locale.', 'bash'),
      example('Time zone', 'npx playwright codegen --timezone="Asia/Kolkata" https://www.saucedemo.com/', 'Emulates the Asia/Kolkata time zone.', 'bash'),
      example('Geolocation', 'npx playwright codegen --geolocation="28.6139,77.2090" https://www.google.com/maps', 'The website must receive browser geolocation permission.', 'bash')
    ]),

    topic(63, 'Codegen Limitations', [
      'Codegen is a starting tool, not a replacement for test design, engineering judgment, or a maintainable automation framework.'
    ], [], [
      callout('Important', 'warning', 'Generated code must always be reviewed before it is used in a real project.'),
      checklist('Codegen Limitations', ['Cannot understand the complete business requirement', 'Generated locators may require improvement', 'May generate unnecessary actions', 'Cannot decide every required assertion', 'Cannot directly control native Windows file-selection or download dialogs', 'Dynamic test data normally requires manual handling', 'Does not automatically become a maintainable framework', 'Page Objects, reusable methods, and test-data management must be added manually', 'Generated code must always be reviewed'])
    ]),

    topic(64, 'Date Picker Handling', [
      'Use https://demoqa.com/date-picker to practise both common date-picker methods.',
      'Filling the input is simplest when the control allows typing. Use the calendar UI when the user journey specifically requires calendar interaction.'
    ], [
      example('Method 1 - fill the date directly', "import { test, expect } from '@playwright/test';\n\ntest('select date by filling input', async ({ page }) => {\n  await page.goto('https://demoqa.com/date-picker');\n\n  const dateInput = page.locator('#datePickerMonthYearInput');\n\n  await dateInput.fill('03/27/2027');\n  await dateInput.press('Enter');\n\n  await expect(dateInput).toHaveValue('03/27/2027');\n});", 'Use this method when the date input accepts typed values.'),
      example('Method 2 - select using the calendar UI', "test('select date from calendar', async ({ page }) => {\n  await page.goto('https://demoqa.com/date-picker');\n\n  await page.locator('#datePickerMonthYearInput').click();\n\n  await page.locator('.react-datepicker__month-select')\n    .selectOption('2');\n\n  await page.locator('.react-datepicker__year-select')\n    .selectOption('2027');\n\n  await page.locator(\n    '.react-datepicker__day--027:not(.react-datepicker__day--outside-month)'\n  ).click();\n\n  await expect(page.locator('#datePickerMonthYearInput'))\n    .toHaveValue('03/27/2027');\n});", 'This selects March 27, 2027 through the calendar controls.')
    ], [callout('Month Index Note', 'info', 'January = 0, February = 1, March = 2. JavaScript month indexes commonly start from zero.')], [{ label: 'Open DemoQA Date Picker', url: 'https://demoqa.com/date-picker' }]),

    topic(65, 'File Upload', [
      'File-upload controls normally use an input element with type="file". Playwright sets the file directly on that input instead of controlling the native operating-system dialog.',
      'The syntax is locator.setInputFiles(files). path.join() is safer across Windows, macOS, and Linux.'
    ], [
      example('HTML file input', '<input type="file">', 'A standard upload control.', 'html'),
      example('Project structure', 'project\n|-- tests\n|   |-- file-upload.spec.js\n|-- test-data\n    |-- sample.txt', 'Keep reusable upload fixtures in a dedicated test-data directory.', 'text'),
      example('Upload one file', "import { test, expect } from '@playwright/test';\nimport path from 'path';\n\ntest('upload one file', async ({ page }) => {\n  await page.goto('https://the-internet.herokuapp.com/upload');\n\n  const filePath = path.join(\n    process.cwd(),\n    'test-data',\n    'sample.txt'\n  );\n\n  await page.locator('#file-upload').setInputFiles(filePath);\n  await page.locator('#file-submit').click();\n\n  await expect(\n    page.getByRole('heading', { name: 'File Uploaded!' })\n  ).toBeVisible();\n\n  await expect(page.locator('#uploaded-files'))\n    .toHaveText('sample.txt');\n});", 'The test uploads sample.txt and verifies the success heading and uploaded filename.'),
      example('Syntax', 'locator.setInputFiles(files);', 'files can be one path, several paths, or an in-memory file payload.')
    ], [], [{ label: 'Open The Internet File Upload', url: 'https://the-internet.herokuapp.com/upload' }]),

    topic(66, 'Multiple File Upload', [
      'The HTML input must support the multiple attribute before it can accept several files.',
      'setInputFiles() can also clear a selection or upload a file created entirely in memory.'
    ], [
      example('Multiple file input', '<input type="file" multiple>', 'The multiple attribute allows more than one selected file.', 'html'),
      example('Upload multiple files', "await page.locator('input[type=\"file\"]').setInputFiles([\n  './test-data/file1.txt',\n  './test-data/file2.pdf'\n]);", 'Pass an array containing each required file path.'),
      example('Clear selected files', "await page.locator('input[type=\"file\"]').setInputFiles([]);", 'An empty array clears the current selection.'),
      example('Create and upload a file from memory', "await page.locator('input[type=\"file\"]').setInputFiles({\n  name: 'test-data.txt',\n  mimeType: 'text/plain',\n  buffer: Buffer.from('Created during Playwright test')\n});", 'This method does not require a physical file to already exist.')
    ]),

    topic(67, 'Dynamic File Upload with FileChooser', [
      'The filechooser event is useful when the input is created dynamically or no permanent input[type=\"file\"] element is available.',
      'Create the event listener before clicking the upload button so Playwright cannot miss the event.'
    ], [
      example('Upload using FileChooser', "test('upload using file chooser', async ({ page }) => {\n  await page.goto('https://example.com');\n\n  const fileChooserPromise = page.waitForEvent('filechooser');\n\n  await page.getByRole('button', {\n    name: 'Choose File'\n  }).click();\n\n  const fileChooser = await fileChooserPromise;\n\n  await fileChooser.setFiles('./test-data/sample.txt');\n});", 'The promise starts listening before the click triggers the chooser.'),
      example('Correct order', "const fileChooserPromise = page.waitForEvent('filechooser');\nawait page.getByRole('button', { name: 'Choose File' }).click();\nconst fileChooser = await fileChooserPromise;", 'Create the listener first.'),
      example('Incorrect order', "await page.getByRole('button', { name: 'Choose File' }).click();\nconst fileChooserPromise = page.waitForEvent('filechooser');", 'The event may finish before Playwright starts waiting for it.')
    ], [callout('Important', 'warning', 'The filechooser listener must be created before clicking the upload button.')]),

    topic(68, 'File Upload Test Scenarios', [
      'Use this QA checklist to cover successful uploads, validation failures, filenames, replacement, and removal behavior.'
    ], [], [checklist('File Upload QA Checklist', ['Upload a valid file', 'Upload an unsupported file extension', 'Upload a file exceeding the maximum size', 'Submit without selecting a file', 'Upload multiple files', 'Upload duplicate files', 'Upload a filename containing spaces', 'Upload a filename containing special characters', 'Verify the success message', 'Verify the uploaded filename', 'Replace an already selected file', 'Remove or clear the selected file'])])
  ];
})();
