(function () {
  var TRACKS = {
    everyone: {
      storageKey: 'testnova-ai-reader-everyone',
      title: 'AI for Everyone',
      topics: [
        lesson('generative-ai-introduction', 'Generative AI - Introduction', [
          'Generative AI creates new content from learned patterns. It can draft text, summarize documents, write code, generate images, create study notes, and transform raw information into useful formats.',
          'Traditional software follows fixed instructions. Generative AI predicts useful output from patterns learned during training and from the context you provide.',
          'Use it for creation, transformation, explanation, summarization, ideation, and structured output.'
        ], 'Ask an AI assistant to explain one technical concept to a beginner, then ask it to rewrite the same answer for a business audience.'),
        lesson('ai-ml-deep-learning', 'Artificial Intelligence, Machine Learning & Deep Learning', [
          'Artificial Intelligence is the broad field of making machines perform tasks that normally need human intelligence.',
          'Machine Learning is a major AI approach where systems learn useful patterns from data.',
          'Deep Learning is a machine learning approach that uses neural networks with many layers, especially useful for language, images, speech, and pattern-heavy tasks.'
        ], 'Write one example each for AI, ML, and deep learning from tools you already use.'),
        lesson('generative-ai-recap', 'Generative AI - Recap', [
          'Generative AI is strongest when the task needs drafting, rewriting, summarizing, explaining, brainstorming, or converting one format into another.',
          'It is not a perfect fact database. Important outputs still need review, testing, and source checking.',
          'Better inputs usually produce better outputs: give role, goal, context, examples, constraints, and output format.'
        ], 'Improve a vague prompt by adding role, goal, context, constraints, and expected output format.'),
        lesson('chatgpt-features', 'Explore ChatGPT: Features & Capabilities - Introduction', [
          'ChatGPT can work as a learning assistant, writing partner, coding helper, research helper, planning assistant, and workflow support tool.',
          'It can explain, compare, summarize, draft, classify, extract, generate examples, and help debug ideas.',
          'For serious work, treat the answer as a strong draft. Review, verify, and refine it.'
        ], 'Ask ChatGPT for an AI study plan, then ask it to convert the plan into a checklist and a quiz.'),
        lesson('llm-large-language-model', 'LLM (Large Language Model)', [
          'A Large Language Model is trained on large amounts of text and code to predict and generate language.',
          'LLMs process input as tokens, which are chunks of text such as words, word pieces, punctuation, or symbols.',
          'The context window controls how much information the model can consider in one interaction.'
        ], 'Give an LLM a short bug report and ask it to extract severity, steps, expected result, actual result, and missing details.'),
        lesson('prompt-engineering', 'Prompt Engineering', [
          'Prompt engineering is the practice of giving clear instructions and useful context so an AI model can produce the desired output.',
          'A strong prompt includes role, task, context, input data, constraints, examples, output format, and quality criteria.',
          'Prompting is iterative: inspect the answer, identify what is missing, and refine the instruction.'
        ], 'Write a prompt that turns a user story into positive, negative, boundary, and edge test cases.'),
        lesson('embeddings', 'Embeddings', [
          'Embeddings convert text into numeric vectors that represent meaning.',
          'They make semantic search possible, where the system finds related ideas instead of only exact keyword matches.',
          'Embeddings are used in search, recommendations, clustering, duplicate detection, and RAG systems.'
        ], 'Compare keyword search and semantic search for: login fails, user cannot access account, authentication error.'),
        lesson('fine-tuning', 'Fine Tuning', [
          'Fine tuning adapts a model with additional examples so it follows a specific style, domain, or task pattern more reliably.',
          'Use fine tuning when repeated output behavior matters and prompting or retrieval is not enough.',
          'Fine tuning changes behavior. RAG supplies external knowledge at answer time.'
        ], 'List three cases where prompts are enough and one case where fine tuning may be justified.'),
        lesson('recap-summary-view', 'Recap - Summary View', [
          'AI is the broad field. ML learns from data. Deep learning uses layered neural networks. Generative AI creates new outputs.',
          'LLMs are language-focused generative models. Prompts guide the task. Embeddings support meaning-based retrieval.',
          'Fine tuning adjusts behavior. RAG adds external knowledge. Agents combine models with tools and workflows.'
        ], 'Explain each term in one sentence: AI, ML, deep learning, generative AI, LLM, prompt, embedding, fine tuning, RAG, agent.'),
        lesson('rag', 'Retrieval Augmented Generation (RAG)', [
          'RAG connects a model to external knowledge. The system retrieves relevant content, then asks the model to answer using that context.',
          'A basic RAG flow is: user question, retrieve relevant chunks, pass chunks to the model, generate grounded answer.',
          'RAG is useful for private notes, current documents, course material, policies, FAQs, and product knowledge.'
        ], 'Design a simple RAG flow for a learning FAQ bot that answers from course notes.'),
        lesson('agentic-ai-chatbot', 'Agentic AI - Building Our Own Chat Bot', [
          'Agentic AI combines a model with tools, memory, planning, and workflow steps.',
          'A basic chatbot answers from model knowledge and supplied context. An agent can decide when to search, call an API, create a file, or ask for clarification.',
          'Start simple: define purpose, knowledge source, allowed actions, guardrails, and fallback behavior.'
        ], 'Sketch a chatbot with a welcome message, knowledge source, three allowed actions, and one fallback when it is unsure.')
      ]
    },
    engineers: {
      storageKey: 'testnova-ai-reader-engineers',
      title: 'AI Engineers',
      topics: [
        lesson('engineering-foundations', 'AI Engineering Foundations', [
          'AI engineering turns model capabilities into usable systems. The work includes model selection, prompting, APIs, data flow, evaluation, monitoring, and user experience.',
          'A practical AI feature needs clear inputs, predictable outputs, error handling, privacy rules, and a way to measure quality.'
        ], 'Pick one AI feature and define its input, output, model, success criteria, and failure handling.'),
        lesson('model-apis', 'Working with Model APIs', [
          'Model APIs let applications send prompts, context, files, or structured data to an AI model and receive generated output.',
          'Production usage needs retries, timeouts, token limits, response validation, logging, and cost controls.'
        ], 'Draft a request and response contract for a summarization API.'),
        lesson('structured-output', 'Structured Output', [
          'Structured output asks the model to respond in a predictable format such as JSON.',
          'It is useful for extraction, classification, test generation, routing, scoring, and workflow automation.',
          'Always validate structured output before using it in downstream systems.'
        ], 'Design JSON output for extracting name, email, phone, topic, and priority from a lead message.'),
        lesson('rag-systems', 'RAG Systems', [
          'RAG systems combine retrieval with generation so answers can use private or domain-specific knowledge.',
          'Core decisions include source documents, chunk size, metadata, embeddings, vector search, reranking, and answer instructions.'
        ], 'Create a RAG checklist for uploading course notes and answering learner questions.'),
        lesson('agent-workflows', 'Agent Workflows', [
          'An agent workflow gives the model tools and rules for taking actions across multiple steps.',
          'Good agent design starts with narrow permissions, clear tool descriptions, strong logging, and human handoff for uncertain cases.'
        ], 'Write three tool actions an AI learning assistant is allowed to perform and two actions it must never perform.'),
        lesson('evaluation', 'Evaluation & Quality Checks', [
          'AI systems need evaluation because outputs can vary. Test with realistic examples, edge cases, and known expected behavior.',
          'Measure factuality, completeness, format accuracy, safety, latency, cost, and user usefulness.'
        ], 'Create five evaluation questions for an AI chatbot that answers from course notes.'),
        lesson('automation-projects', 'Automation Projects', [
          'AI automation connects model output to real workflows such as document creation, email drafting, ticket triage, report generation, or data extraction.',
          'Start with human review before allowing fully automated actions.'
        ], 'Design an automation that turns a learner enquiry into a CRM-ready lead summary.'),
        lesson('production-readiness', 'Production Readiness', [
          'Production AI needs guardrails, monitoring, privacy checks, prompt/version management, fallback paths, and cost visibility.',
          'The system should fail safely when the model is unsure or the source context is weak.'
        ], 'Create a release checklist for moving an AI chatbot from prototype to production.')
      ]
    },
    jsTs: {
      storageKey: 'testnova-reader-js-typescript',
      title: 'JavaScript & TypeScript',
      topics: [
        lesson('javascript-basics', 'JavaScript Basics', [
          'JavaScript adds behavior to web pages and applications. It handles user interactions, data changes, browser APIs, and dynamic UI updates.',
          'Start with variables, functions, conditions, loops, arrays, objects, and events.',
          'Modern JavaScript is also used outside the browser with runtimes such as Node.js.'
        ], 'Create a small script that reads a name from an input and displays a formatted greeting.'),
        lesson('dom-events', 'DOM & Events', [
          'The DOM is the browser representation of the HTML page. JavaScript can read, create, update, and remove DOM elements.',
          'Events let code respond to clicks, typing, form submissions, keyboard actions, and page changes.',
          'Good UI code updates only what is needed and keeps user interactions predictable.'
        ], 'Build a button that toggles a content panel between visible and hidden.'),
        lesson('async-javascript', 'Async JavaScript', [
          'Async JavaScript handles work that takes time, such as API calls, timers, file reads, or user-driven flows.',
          'Promises and async/await make async code easier to read and maintain.',
          'Always handle failures so the UI does not silently break.'
        ], 'Fetch JSON from a public API and render a loading, success, and error state.'),
        lesson('typescript-basics', 'TypeScript Basics', [
          'TypeScript is JavaScript with type checking. It helps you catch mistakes before running the code, especially in larger applications and automation projects.',
          'Start with string, number, boolean, arrays, objects, optional properties, function parameter types, and return types.',
          'Use TypeScript when data shapes matter: users, courses, API responses, form payloads, configuration objects, and test data.'
        ], 'Create a typed Course object with title, category, duration, isActive, and topics fields.', [
          {
            title: 'Basic types and objects',
            code: 'type Course = {\n  title: string\n  category: string\n  durationHours: number\n  isActive: boolean\n  topics: string[]\n}\n\nconst course: Course = {\n  title: \"Playwright Automation\",\n  category: \"QA Engineering\",\n  durationHours: 24,\n  isActive: true,\n  topics: [\"Locators\", \"Assertions\", \"Reports\"]\n}'
          }
        ]),
        lesson('interfaces-types', 'Interfaces, Types & Generics', [
          'Interfaces and type aliases describe object shapes and reusable contracts.',
          'Generics let functions and components work with different data types while keeping type safety.',
          'Use simple types first. Add advanced types only when they improve clarity.'
        ], 'Create a reusable API response type with data, status, and error fields.'),
        lesson('typescript-functions-classes', 'TypeScript Functions, Classes & Modules', [
          'Typed functions make inputs and outputs clear. This is useful when helper functions are reused across pages, forms, tests, and API calls.',
          'Classes group data and behavior. In frontend code they are less common than objects and functions, but in test automation they are useful for page objects.',
          'Modules keep files focused. Export only what other files need and keep internal helper details private to the file.'
        ], 'Create a typed helper function and a small class that stores a user name and returns a greeting.', [
          {
            title: 'Typed function and class',
            code: 'export function formatName(firstName: string, lastName: string): string {\n  return `${firstName} ${lastName}`.trim()\n}\n\nexport class LearnerProfile {\n  constructor(private fullName: string) {}\n\n  greeting(): string {\n    return `Welcome, ${this.fullName}`\n  }\n}'
          }
        ]),
        lesson('typescript-async-api-data', 'TypeScript with Async API Data', [
          'Real applications often receive data from APIs. TypeScript helps document the expected response shape and makes rendering logic easier to maintain.',
          'Use async/await with typed responses, then handle loading, empty, success, and error states in the UI.',
          'Avoid pretending every API response is perfect. Validate important fields when the data comes from outside your application.'
        ], 'Create a typed async function that returns a list of courses and handles an error message for the UI.', [
          {
            title: 'Typed async API helper',
            code: 'type ApiCourse = {\n  id: string\n  title: string\n  level: \"Beginner\" | \"Intermediate\" | \"Advanced\"\n}\n\nasync function loadCourses(): Promise<ApiCourse[]> {\n  const response = await fetch(\"/api/courses\")\n  if (!response.ok) throw new Error(\"Unable to load courses\")\n  return response.json() as Promise<ApiCourse[]>\n}'
          }
        ]),
        lesson('frontend-patterns', 'Frontend Patterns', [
          'Clean frontend code separates state, rendering, events, and API communication.',
          'Reusable helpers reduce duplication and make UI behavior easier to test.',
          'Consistent naming and small functions make large pages easier to maintain.'
        ], 'Refactor repeated DOM update logic into a reusable function.'),
        lesson('testing-js-ts', 'Testing JavaScript & TypeScript', [
          'Unit tests verify small pieces of logic. UI tests verify behavior from the user perspective.',
          'TypeScript reduces some bugs, but tests are still needed for behavior, edge cases, and integrations.',
          'Test meaningful outcomes rather than implementation details.'
        ], 'Write test cases for a function that validates an email and phone number.')
      ]
    },
    playwright: {
      storageKey: 'testnova-reader-playwright-v2',
      title: 'Playwright',
      topics: [
        lesson('development-environment-nodejs', 'Configuration of Development Environment - Node JS', [
          'Node.js is the runtime environment that allows JavaScript and TypeScript to run outside the browser. JavaScript was originally designed to execute inside the browser, but Node.js made it possible to run JavaScript on a local computer, server, command line, build pipeline, and automation framework.',
          'Playwright supports JavaScript and TypeScript. To run Playwright tests on your machine, Node.js is required because Playwright projects use Node-based tooling, npm packages, test runners, and command-line scripts.',
          'Install the Windows x64 MSI installer from the official Node.js website. After installation, verify both Node and npm from a terminal before moving forward.'
        ], 'Install Node.js, open a terminal, and confirm that both node -v and npm -v return versions.', [
          {
            title: 'Install and verify Node.js',
            code: '1. Open https://nodejs.org/en/download\n2. Select Windows Installer (.msi)\n3. Choose x64 for Intel/AMD Windows machines\n4. Install using the default setup\n5. Open terminal\n6. Run:\n\nnode -v\nnpm -v'
          }
        ]),
        lesson('development-environment-vscode', 'Configuration of Development Environment - VS Code', [
          'Use Visual Studio Code, not Visual Studio. They are separate tools. Visual Studio Code is a lightweight editor that works well for Playwright, JavaScript, TypeScript, terminals, Git integration, and extensions.',
          'After installing VS Code, open the integrated terminal from Terminal > New Terminal. This terminal is where you will run node, npm, git, and Playwright commands.',
          'Install the Playwright Test for VS Code extension. This extension adds a testing panel where you can run tests, debug tests, view results, switch projects, and inspect failures more conveniently.'
        ], 'Install VS Code and the Playwright Test for VS Code extension, then confirm the test runner icon appears in the left activity bar.', [
          {
            title: 'Verify VS Code terminal setup',
            code: 'Terminal > New Terminal\n\nnode -v\nnpm -v\n\nIf npm scripts are blocked on Windows PowerShell, run:\nSet-ExecutionPolicy RemoteSigned -Scope CurrentUser'
          },
          {
            title: 'Recommended VS Code extension',
            code: 'Extension name: Playwright Test for VSCode\nExample version from notes: v1.1.17\nPurpose: run tests, debug tests, inspect results, and manage Playwright projects.'
          }
        ]),
        lesson('development-environment-git', 'Configuration of Development Environment - Git', [
          'Git is required to clone practice applications and manage project code. On Windows, install Git for Windows from Git SCM.',
          'After installation, verify Git from the terminal. If the command returns a version, Git is available and ready for cloning repositories.',
          'Use Git from the VS Code terminal so your workflow stays in one place: clone projects, install dependencies, run apps, create branches, and commit changes.'
        ], 'Install Git for Windows and verify git -v from a terminal.', [
          {
            title: 'Verify Git',
            code: 'git -v\n\nExpected example:\ngit version 2.45.1.windows.1'
          }
        ]),
        lesson('clone-test-application', 'Clone Test Application', [
          'Before writing Playwright tests, you need an application to test. The practice app in the notes is hosted on GitHub and can be cloned locally.',
          'Create a working folder, open a terminal inside it, clone the repository, then open the cloned folder in VS Code.',
          'Keeping the app and tests local helps you practice repeatedly without depending on an external training environment.'
        ], 'Clone the practice app and open the project folder in VS Code.', [
          {
            title: 'Clone practice app',
            code: 'D:\\pw-practice> git clone https://github.com/bondar-artem/pw-practice-app.git\n\nD:\\pw-practice> cd pw-practice-app\n\nOpen this folder in VS Code:\nD:\\pw-practice\\pw-practice-app'
          }
        ]),
        lesson('run-test-application', 'Run Test Application', [
          'After cloning the practice app, install its dependencies. Dependencies are external packages listed in package.json and downloaded into node_modules.',
          'If dependency installation fails, clean npm cache, restart if needed, or delete and reclone the project. Use force only when necessary for training setup issues.',
          'Start the app with npm start. Keep the terminal open while testing. If you press Ctrl+C, the app stops and the browser will no longer be able to load it.'
        ], 'Install dependencies, start the app, and open http://localhost:4200/ in the browser.', [
          {
            title: 'Install and run app',
            code: 'cd D:\\pw-practice\\pw-practice-app\n\nnpm cache clean --force\nnpm install --force\nnpm start\n\nOpen browser:\nhttp://localhost:4200/\n\nStop app:\nCtrl + C'
          }
        ]),
        lesson('javascript-hello-world', 'JavaScript Fundamentals - Hello World', [
          'Before Playwright, understand basic JavaScript execution. Create a simple JavaScript project and run a file with Node.js.',
          'npm init creates package.json, which stores project metadata and scripts. A lessons folder helps organize practice files.',
          'Running node lesson_1.js executes the file in Node.js and prints output to the terminal.'
        ], 'Create a lessons folder and run your first JavaScript file with Node.', [
          {
            title: 'Hello World setup',
            code: 'D:\\JS Fundamentals> npm init\n\nPress Enter through defaults, then confirm yes.\n\nCreate folder:\nlessons\n\nCreate file:\nlessons\\lesson_1.js\n\n// 1. Hello World\nconsole.log(\"Hello world !\")\n\nRun:\ncd lessons\nnode lesson_1.js\n\nOutput:\nHello world !'
          }
        ]),
        lesson('javascript-variables-constants-types', 'JavaScript Fundamentals - Variables, Constants & Data Types', [
          'Variables store values. Use let for values that may change, const for values that should not be reassigned, and avoid var in modern code unless you are reading older examples.',
          'A variable can hold one value, and objects can hold multiple related values. Playwright tests often use variables for test data, locators, URLs, expected text, and response objects.',
          'Constants protect values from accidental reassignment. If you try to reassign a const value, JavaScript throws a TypeError.'
        ], 'Create variables for username, password, expected message, and test status. Use const where the value should not change.', [
          {
            title: 'Variables',
            code: 'var firstName = \"John\"\nlet lastName = \"Smith\"\nconsole.log(firstName)\n\nvar age, dateOfBirth, sex\nage = 5\nsex = \"Male\"\nconsole.log(age)\n\nage = 6\nconsole.log(age)'
          },
          {
            title: 'Constants',
            code: 'const occupation = \"engineer\"\noccupation = \"driver\"\nconsole.log(occupation)\n\n// Result:\n// TypeError: Assignment to constant variable.'
          },
          {
            title: 'Data types',
            code: 'var middleName = \"David\"\nvar yearsInService = 5\nvar isHeMarried = false\nvar yearsInMarriage = null\nvar numberOfCars = undefined'
          }
        ]),
        lesson('javascript-strings-objects-arrays', 'JavaScript Fundamentals - Strings, Objects & Arrays', [
          'Concatenation joins strings with the plus operator. Template interpolation uses backticks and ${} placeholders, which is easier to read for dynamic messages.',
          'Objects represent entities with multiple properties. Arrays store ordered lists. Playwright test code frequently uses objects for test users and arrays for sets of data.',
          'Use dot notation when the property name is known, and bracket notation when the property name is dynamic.'
        ], 'Create a customer object with name, role, and browsers array, then print one browser from the array.', [
          {
            title: 'Concatenation and interpolation',
            code: 'var itemName = \"coffee\"\nvar itemPrice = 50\nconsole.log(\"the price of your \" + itemName + \" is \" + itemPrice + \" dollars\")\n\nvar drinkName = \"tea\"\nvar drinkPrice = 5\nvar message = `my ${drinkName} price is ${drinkPrice} dollars`\nconsole.log(message)'
          },
          {
            title: 'Objects and arrays',
            code: 'var customer = {\n  firstName: \"John\",\n  lastName: \"Smith\",\n  cars: [\"Volvo\", \"Toyota\", \"Tesla\"]\n}\n\nconsole.log(customer.firstName)\ncustomer.firstName = \"Mike\"\nconsole.log(customer[\"firstName\"])\nconsole.log(customer.cars[1])'
          }
        ]),
        lesson('javascript-operators-control-flow', 'JavaScript Fundamentals - Operators & Control Flow', [
          'Relational operators compare values and return true or false. Equality operators compare values loosely or strictly. In automation code, strict comparison is usually safer.',
          'Logical operators combine boolean conditions. Conditional statements let code choose different paths based on runtime values.',
          'Loops repeat work. Playwright tests may loop through test data, browser projects, API responses, table rows, or validation messages.'
        ], 'Write a condition that checks whether a user is active and has the admin role before allowing an action.', [
          {
            title: 'Relational and equality operators',
            code: 'console.log(10 < 75)   // true\nconsole.log(10 > 75)   // false\nconsole.log(10 <= 10)  // true\nconsole.log(10 >= 20)  // false\n\nlet x = 1\nconsole.log(x == \"1\")   // true: value only\nconsole.log(x === \"1\")  // false: value + type\nconsole.log(x === 1)    // true'
          },
          {
            title: 'Logical operators and conditionals',
            code: 'console.log(true && true)\nconsole.log(true || false)\nconsole.log(!true)\n\nlet hour = 6\nif (hour >= 6 && hour < 12) {\n  console.log(\"Good morning\")\n} else if (hour >= 12 && hour < 18) {\n  console.log(\"Good afternoon\")\n} else {\n  console.log(\"Good evening\")\n}'
          },
          {
            title: 'Loops',
            code: 'for (let i = 0; i < 5; i++) {\n  console.log(i)\n}\n\nlet cars = [\"Volvo\", \"Toyota\", \"Tesla\"]\nfor (let car of cars) {\n  if (car === \"Toyota\") {\n    break\n  }\n  console.log(car)\n}\n\ncars.forEach(car => console.log(car))'
          }
        ]),
        lesson('javascript-functions-modules', 'JavaScript Fundamentals - Functions & Import/Export', [
          'Functions group reusable logic. In Playwright, functions are useful for repeated steps such as login, navigation, creating test data, or validating common UI states.',
          'Arrow functions are common in modern JavaScript and TypeScript. They are widely used in callbacks, array methods, and test helper functions.',
          'Import/export lets you split reusable code into helper files, page objects, fixture files, and utility modules.'
        ], 'Create a helper function that accepts a name and prints it, then export it from one file and import it in another.', [
          {
            title: 'Function examples',
            code: 'function hello() {\n  console.log(\"Hello\")\n}\n\nfunction printName(name) {\n  console.log(name)\n}\n\nfunction multiplyBy2(num) {\n  return num * 2\n}\n\nconst helloArrow = () => {\n  console.log(\"Hello\")\n}'
          },
          {
            title: 'Import and export',
            code: '// helper.js\nexport function printAge(age) {\n  console.log(age)\n}\n\n// lesson.js\nimport { printAge } from \"./helper.js\"\nprintAge(25)'
          }
        ]),
        lesson('typescript-basics-for-playwright', 'Typescript Basics for Playwright', [
          'Playwright tests are often written in TypeScript because types make test code, fixtures, page objects, helper functions, API responses, and test data easier to maintain.',
          'Start with basic types, arrays, objects, function parameters, return types, optional values, interfaces, and strict equality checks.',
          'Use TypeScript to describe page objects, login users, expected messages, API response shapes, fixture contracts, and reusable test utilities.'
        ], 'Create a typed test data object for a login test with username, password, expectedMessage, and shouldPass fields.', [
          {
            title: 'Typed Playwright test data',
            code: 'type LoginCase = {\n  username: string\n  password: string\n  expectedMessage: string\n  shouldPass: boolean\n}\n\nconst validLogin: LoginCase = {\n  username: \"admin@test.com\",\n  password: \"Password123\",\n  expectedMessage: \"Dashboard\",\n  shouldPass: true\n}'
          },
          {
            title: 'Typed helper function',
            code: 'function buildUserLabel(firstName: string, lastName: string): string {\n  return `${firstName} ${lastName}`\n}\n\nconsole.log(buildUserLabel(\"John\", \"Smith\"))'
          }
        ]),
        lesson('setup-config', 'Setup & Configuration', [
          'A Playwright project usually includes a config file, test directory, browser projects, retries, reporter settings, trace settings, and a base URL.',
          'Configuration keeps tests consistent across local machines, CI, staging, and production-like environments.',
          'Use environment variables for URLs and secrets instead of hardcoding them in tests. Keep configuration readable because every test depends on it.'
        ], 'Define a base URL and at least two browser projects in a Playwright config file.', [
          {
            title: 'Typical Playwright config idea',
            code: 'import { defineConfig, devices } from \"@playwright/test\"\n\nexport default defineConfig({\n  testDir: \"./tests\",\n  use: {\n    baseURL: \"http://localhost:4200\",\n    trace: \"on-first-retry\",\n    screenshot: \"only-on-failure\"\n  },\n  projects: [\n    { name: \"chromium\", use: { ...devices[\"Desktop Chrome\"] } },\n    { name: \"firefox\", use: { ...devices[\"Desktop Firefox\"] } }\n  ]\n})'
          }
        ]),
        lesson('locators', 'Locators', [
          'Locators are Playwright handles for finding elements reliably.',
          'Prefer user-facing locators such as role, label, placeholder, text, and test ids.',
          'Avoid brittle selectors that depend on layout or generated classes.'
        ], 'Rewrite CSS selectors using getByRole, getByLabel, and getByTestId.'),
        lesson('actions-assertions', 'Actions & Assertions', [
          'Actions simulate user behavior such as clicking, typing, selecting options, uploading files, and navigating.',
          'Assertions verify expected results and auto-wait until the condition becomes true or times out.',
          'Good assertions check what the user should see after an action.'
        ], 'Write a login test with assertions for success and invalid credential messages.'),
        lesson('fixtures', 'Fixtures & Test Structure', [
          'Fixtures prepare reusable setup such as pages, authenticated sessions, test data, or helper objects.',
          'Good test structure keeps setup clear and the test body focused on behavior.',
          'Use beforeEach for repeated setup, but avoid hiding important steps.'
        ], 'Create a fixture that opens a dashboard page after login.'),
        lesson('debugging-traces', 'Debugging, Traces & Reports', [
          'Playwright debugging tools include headed mode, inspector, screenshots, videos, traces, and HTML reports.',
          'Traces are especially useful because they show actions, DOM snapshots, network calls, and screenshots.',
          'Attach traces and reports in CI so failures can be investigated quickly.'
        ], 'Run a failing test with trace enabled and list the exact failure cause.'),
        lesson('ci-project', 'CI & Framework Project', [
          'A Playwright framework should be easy to run locally and in CI.',
          'Typical pieces include config, page objects or helpers, test data, reports, retries, screenshots, traces, and pipeline commands.',
          'Keep the framework practical: add abstraction when it reduces real repetition.'
        ], 'Design a folder structure for a Playwright framework with tests, pages, fixtures, data, and utilities.'),
        lesson('playwright-overview-installation', 'Playwright End-to-End Overview & Installation', [
          'Playwright is an open-source end-to-end testing framework from Microsoft. It automates Chromium, Firefox, and WebKit using one API.',
          'The key advantage is auto-waiting: Playwright waits for elements to be visible, stable, enabled, and actionable before interacting with them.',
          'A practical setup includes Node.js, a Playwright project, TypeScript support, browsers, an HTML report, and a clear folder structure for tests, pages, fixtures, utilities, and test data.'
        ], 'Create a fresh Playwright TypeScript project and run the sample tests once.', [
          {
            title: 'Install and verify Playwright',
            code: 'mkdir finsecure-playwright\ncd finsecure-playwright\nnpm init -y\nnpm init playwright@latest\n\n# Verify installation\nnpx playwright test\nnpx playwright show-report'
          },
          {
            title: 'Suggested project folders',
            code: 'tests/\n  login.spec.ts\n  fund-transfer.spec.ts\n  loan.spec.ts\npages/\n  LoginPage.ts\n  DashboardPage.ts\nfixtures/\n  auth.fixture.ts\nutils/\n  helpers.ts\ntest-data/\n  users.json\n  transfers.csv'
          }
        ]),
        lesson('playwright-built-in-locators', 'Playwright Built-in Locators', [
          'Built-in locators are the first choice because they describe the page like a user would: role, label, placeholder, text, alt text, title, and test id.',
          'Use getByRole for accessible controls, getByLabel for form fields, getByPlaceholder for clear placeholders, and getByTestId for stable automation hooks.',
          'Prefer locators that survive layout and CSS changes. A good locator tells future readers what the user is interacting with.'
        ], 'Replace three CSS selectors in an old test with role, label, and test id locators.', [
          {
            title: 'Locator examples',
            code: 'await page.getByRole(\"button\", { name: \"Login\" }).click()\nawait page.getByLabel(\"Username\").fill(\"testuser01\")\nawait page.getByPlaceholder(\"Enter amount\").fill(\"5000\")\nawait page.getByText(\"Transfer Successful\").click()\nawait page.getByTestId(\"account-balance\").textContent()'
          }
        ]),
        lesson('playwright-xpath-css-locators', 'XPath & CSS Locators', [
          'XPath can navigate using text, attributes, parent-child relationships, and axes. It is powerful, but it can become hard to maintain if overused.',
          'CSS locators are compact and fast for ids, classes, attributes, descendants, and simple structural selection.',
          'Use XPath or CSS when user-facing locators are not enough, and keep selectors short, stable, and readable.'
        ], 'Write one XPath selector and one CSS selector for a transfer amount input, then explain which one you would keep.', [
          {
            title: 'XPath and CSS selector patterns',
            code: 'await page.locator(\"//button[text()=\\\"Login\\\"]\").click()\nawait page.locator(\"//input[@name=\\\"username\\\"]\").fill(\"testuser01\")\nawait page.locator(\"#amount\").fill(\"5000\")\nawait page.locator(\"button[type=\\\"submit\\\"]\").click()\nawait page.locator(\".toast.success\").toBeVisible()'
          }
        ]),
        lesson('playwright-actions-auto-waiting', 'Actions, Auto-Waiting & Input Handling', [
          'Playwright actions include click, fill, type, press, check, uncheck, hover, drag, upload, and keyboard or mouse operations.',
          'Before most actions, Playwright automatically waits for the target element to be attached, visible, stable, enabled, and ready to receive events.',
          'For real user journeys, pair each action with a meaningful assertion so the test proves the application responded correctly.'
        ], 'Create a money transfer test that fills fields, selects an option, submits, and verifies the success message.', [
          {
            title: 'Common actions',
            code: 'await page.getByLabel(\"Username\").fill(\"testuser01\")\nawait page.getByLabel(\"Password\").fill(\"Pass@123\")\nawait page.getByRole(\"button\", { name: \"Login\" }).click()\nawait page.getByLabel(\"Amount\").fill(\"5000\")\nawait page.getByRole(\"checkbox\", { name: \"I agree\" }).check()\nawait expect(page.getByText(\"Transfer Successful\")).toBeVisible()'
          }
        ]),
        lesson('playwright-dropdowns-date-picker', 'Dropdowns, Select Options & Date Pickers', [
          'Native HTML select elements use selectOption by value, visible label, index, or multiple values.',
          'Custom dropdowns are built from div, ul, li, button, or framework components. Open the dropdown, wait for options, then click the visible option.',
          'Date pickers often require either filling a date input directly or navigating the calendar month by month before selecting a day.'
        ], 'Automate a transfer form that selects bank, transfer type, and scheduled date.', [
          {
            title: 'Dropdown and date examples',
            code: 'await page.locator(\"#transfer-type\").selectOption(\"IMPS\")\nawait page.locator(\"#transfer-type\").selectOption({ label: \"National Electronic Fund Transfer\" })\n\nawait page.locator(\".transfer-type-dropdown\").click()\nawait page.getByRole(\"option\", { name: \"RTGS\" }).click()\n\nawait page.getByLabel(\"Transfer Date\").fill(\"2026-07-07\")'
          }
        ]),
        lesson('playwright-dialogs-frames-popups', 'Dialogs, Frames, Tabs & Popups', [
          'Browser dialogs must be handled before the action that triggers them. Listen for dialog events, then accept, dismiss, or provide prompt text.',
          'Frames are embedded documents inside a page. Use frameLocator to target payment gateways, secure inputs, or nested frame content.',
          'For tabs and popups, wait for the new page event while clicking the link or button that opens it, then assert inside the new page.'
        ], 'Automate a flow that accepts a confirmation dialog, enters card details in a frame, and verifies a newly opened statement tab.', [
          {
            title: 'Dialogs, frames, and new pages',
            code: 'page.on(\"dialog\", async dialog => {\n  await dialog.accept(\"testuser01\")\n})\nawait page.getByRole(\"button\", { name: \"Confirm\" }).click()\n\nconst paymentFrame = page.frameLocator(\"iframe[src*=\\\"razorpay\\\"]\")\nawait paymentFrame.locator(\"#card-number\").fill(\"4111 1111 1111 1111\")\n\nconst statementPage = await Promise.all([\n  page.waitForEvent(\"popup\"),\n  page.getByRole(\"link\", { name: \"Open Statement\" }).click()\n]).then(([popup]) => popup)'
          }
        ]),
        lesson('playwright-artifacts-downloads-api', 'Screenshots, Videos, Downloads & API Mocking', [
          'Screenshots, videos, traces, and HTML reports are test artifacts. They help explain failures quickly, especially in CI.',
          'Downloads should be waited for using the download event, then saved to a known path for validation.',
          'API mocking with route lets tests control backend responses, simulate failures, and verify UI behavior without depending on unstable test data.'
        ], 'Add a screenshot on failure, download a statement file, and mock a balance API response.', [
          {
            title: 'Artifacts, download, and route',
            code: 'await page.screenshot({ path: \"screenshots/dashboard.png\", fullPage: true })\n\nconst download = await Promise.all([\n  page.waitForEvent(\"download\"),\n  page.getByRole(\"button\", { name: \"Download Statement\" }).click()\n]).then(([file]) => file)\nawait download.saveAs(\"downloads/statement.pdf\")\n\nawait page.route(\"**/api/balance\", route => {\n  route.fulfill({ status: 200, body: JSON.stringify({ balance: 25000 }) })\n})'
          }
        ]),
        lesson('playwright-assertions-tags-parallel-data', 'Assertions, Tags, Parallel & Data-Driven Tests', [
          'Assertions should verify user-visible outcomes, URLs, text, counts, attributes, API status, or downloaded artifacts. They auto-wait until the expectation passes or times out.',
          'Tags help run focused suites such as smoke, regression, login, payments, or API tests. Parallel execution and sharding reduce execution time in larger suites.',
          'Data-driven tests run the same scenario with multiple inputs, such as several users, transfer types, invalid login cases, or loan application amounts.'
        ], 'Create a tagged smoke test that runs against three login users from an array.', [
          {
            title: 'Tags, parallelism, and data',
            code: 'const users = [\n  { username: \"testuser01\", password: \"Pass@123\", expected: \"Welcome\" },\n  { username: \"testuser02\", password: \"Pass@123\", expected: \"Welcome\" }\n]\n\nfor (const data of users) {\n  test(`@smoke login works for ${data.username}`, async ({ page }) => {\n    await page.goto(\"/login\")\n    await page.getByLabel(\"Username\").fill(data.username)\n    await page.getByLabel(\"Password\").fill(data.password)\n    await page.getByRole(\"button\", { name: \"Login\" }).click()\n    await expect(page.getByText(data.expected)).toBeVisible()\n  })\n}\n\n// CLI examples:\n// npx playwright test --grep \"@smoke\"\n// npx playwright test --shard=1/3'
          }
        ])
      ]
    }
  };

  function lesson(id, title, paragraphs, practice, examples) {
    return { id: id, title: title, paragraphs: paragraphs, practice: practice, examples: examples || [] };
  }

  function slugify(value) {
    return String(value || 'custom-topic')
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'custom-topic';
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function loadJson(key) {
    try { return JSON.parse(localStorage.getItem(key) || '{}') || {}; } catch (e) { return {}; }
  }

  function saveJson(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  function customTopicsKey(track) {
    return track.storageKey + ':custom-topics';
  }

  function loadTopics(track) {
    var customTopics = loadJson(customTopicsKey(track));
    if (!Array.isArray(customTopics)) customTopics = [];
    return track.topics.concat(customTopics);
  }

  function saveCustomTopics(track, topics) {
    saveJson(customTopicsKey(track), topics);
  }

  function topicFromUrl() {
    try {
      var params = new URLSearchParams(window.location.search);
      return params.get('topic') || '';
    } catch (e) {
      return '';
    }
  }

  function updateTopicUrl(topicId) {
    if (!window.history || !window.history.pushState) return;
    var url = new URL(window.location.href);
    url.searchParams.set('topic', topicId);
    window.history.pushState({ topic: topicId }, '', url.pathname + url.search + url.hash);
  }

  function createCustomTopic(track, allTopics, title) {
    var cleanTitle = String(title || '').replace(/\s+/g, ' ').trim();
    if (!cleanTitle) return null;

    var baseId = 'custom-' + slugify(cleanTitle);
    var id = baseId;
    var index = 2;
    while (allTopics.some(function (topic) { return topic.id === id; })) {
      id = baseId + '-' + index;
      index++;
    }

    return lesson(id, cleanTitle, [
      'Start typing your notes for this topic. This content is editable and saved in this browser.',
      'Add definitions, examples, transcript notes, exercises, links, or trainer comments here.'
    ], 'Add a practical exercise for this topic.');
  }

  function showTopicToast(title) {
    var toast = document.createElement('div');
    toast.className = 'level-toast topic-complete-toast';
    toast.textContent = 'Congratulations! Completed: ' + title;
    document.body.appendChild(toast);
    requestAnimationFrame(function () { toast.classList.add('show'); });
    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.remove(); }, 350);
    }, 1800);
  }

  function burstConfetti() {
    var colors = ['#fbbf24', '#ec4899', '#7c3aed', '#10b981', '#3b82f6', '#ef4444'];
    var box = document.createElement('div');
    box.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;';
    document.body.appendChild(box);

    for (var i = 0; i < 42; i++) {
      var piece = document.createElement('span');
      var size = 6 + Math.random() * 8;
      var startX = 50 + (Math.random() * 60 - 30);
      var endX = startX + (Math.random() * 80 - 40);
      var fall = 60 + Math.random() * 30;
      var rotate = Math.random() * 720 - 360;
      var duration = 1400 + Math.random() * 1100;
      piece.style.cssText = [
        'position:absolute',
        'left:' + startX + '%',
        'top:-5%',
        'width:' + size + 'px',
        'height:' + (size * 0.55) + 'px',
        'background:' + colors[i % colors.length],
        'border-radius:1px',
        'opacity:0.95',
        'transform:rotate(' + (Math.random() * 360) + 'deg)',
        'transition:transform ' + duration + 'ms cubic-bezier(.2,.7,.2,1), top ' + duration + 'ms cubic-bezier(.2,.7,.2,1), opacity ' + duration + 'ms ease'
      ].join(';');
      box.appendChild(piece);
      (function (el, x, y, r) {
        requestAnimationFrame(function () {
          el.style.top = y + 'vh';
          el.style.left = x + '%';
          el.style.transform = 'rotate(' + r + 'deg)';
          el.style.opacity = '0';
        });
      })(piece, endX, fall, rotate);
    }

    setTimeout(function () { box.remove(); }, 2700);
  }

  function initEditableSurfaces() {
    document.querySelectorAll('[data-edit-key]').forEach(function (node) {
      var key = 'testnova-edit-' + node.getAttribute('data-edit-key');
      var saved = localStorage.getItem(key);
      if (saved) node.innerHTML = saved;
      node.addEventListener('input', function () {
        localStorage.setItem(key, node.innerHTML);
      });
    });
  }

  function renderTopicHtml(track, topic, index, progress) {
    var contentKey = track.storageKey + ':content:' + topic.id;
    var savedContent = localStorage.getItem(contentKey);
    if (savedContent) {
      savedContent = savedContent.replace(/<div class="ai-inline-save-panel"[\s\S]*?<\/div>/g, '');
    }
    var body = savedContent || [
      '<div class="ai-reader-topic-kicker">Topic ' + (index + 1) + '</div>',
      '<h2 data-topic-title>' + escapeHtml(topic.title) + '</h2>',
      topic.paragraphs.map(function (paragraph) { return '<p>' + escapeHtml(paragraph) + '</p>'; }).join(''),
      topic.examples && topic.examples.length ? topic.examples.map(function (example) {
        return [
          '<div class="ai-code-example">',
          '<h3>' + escapeHtml(example.title) + '</h3>',
          '<pre><code>' + escapeHtml(example.code) + '</code></pre>',
          '</div>'
        ].join('');
      }).join('') : '',
      '<div class="ai-topic-practice"><strong>Try this:</strong><span>' + escapeHtml(topic.practice) + '</span></div>',
      '<div class="ai-edit-placeholder"><strong>Editable notes:</strong><span>Type or paste your own examples, transcript notes, exercises, or trainer comments here.</span></div>'
    ].join('');

    return [
      '<label class="ai-reader-complete">',
      '<input type="checkbox" data-reader-complete="' + topic.id + '"' + (progress[topic.id] ? ' checked' : '') + ' />',
      '<span>Mark this topic complete</span>',
      '</label>',
      '<div class="ai-reader-edit-body" contenteditable="true" data-topic-edit="' + topic.id + '">' + body + '</div>',
      '<div class="ai-inline-save-panel"><button class="primary-btn" type="button" data-inline-save>Save edits now</button><span data-inline-save-state>Typing auto-saves. Manual save is here as backup.</span></div>'
    ].join('');
  }

  function initReader() {
    var trackId = document.body.getAttribute('data-ai-reader-track');
    if (!trackId || !TRACKS[trackId]) return;

    var track = TRACKS[trackId];
    var nav = document.querySelector('[data-reader-nav]');
    var content = document.querySelector('[data-reader-content]');
    var saveState = document.querySelector('[data-reader-save-state]');
    var progress = loadJson(track.storageKey + ':progress');
    var customTopics = loadJson(customTopicsKey(track));
    if (!Array.isArray(customTopics)) customTopics = [];
    var topics = loadTopics(track);
    var currentTopic = topicFromUrl() || track.topics[0].id;
    var saveTimer = null;

    function updateProgress() {
      var done = topics.filter(function (topic) { return progress[topic.id]; }).length;
      var total = topics.length;
      var pct = total ? Math.round((done / total) * 100) : 0;
      var level = Math.floor(done / 5) + 1;
      var fill = document.querySelector('[data-reader-fill]');
      var counts = document.querySelector('[data-reader-counts]');
      var pctNode = document.querySelector('[data-reader-pct]');
      var levelNode = document.querySelector('[data-reader-level]');
      var next = document.querySelector('[data-reader-next]');

      if (fill) fill.style.width = pct + '%';
      if (counts) counts.textContent = done + ' / ' + total;
      if (pctNode) pctNode.textContent = pct + '%';
      if (levelNode) levelNode.textContent = 'Lv ' + level;
      if (next) next.textContent = done === total ? 'All topics complete' : (total - done) + ' topics remaining';

      nav.querySelectorAll('[data-topic-link]').forEach(function (link) {
        var id = link.getAttribute('data-topic-link');
        link.classList.toggle('is-done', !!progress[id]);
      });
    }

    function saveCurrentContent(mode) {
      if (saveTimer) {
        clearTimeout(saveTimer);
        saveTimer = null;
      }
      var editBody = content.querySelector('[data-topic-edit]');
      if (!editBody) return;
      localStorage.setItem(track.storageKey + ':content:' + editBody.getAttribute('data-topic-edit'), editBody.innerHTML);
      var message = (mode === 'auto' ? 'Auto-saved ' : 'Saved ') + new Date().toLocaleTimeString();
      if (saveState) {
        saveState.textContent = message;
      }
      var inlineState = content.querySelector('[data-inline-save-state]');
      if (inlineState) inlineState.textContent = message + '. Edits stay in this browser.';
    }

    function scheduleSave() {
      if (saveTimer) clearTimeout(saveTimer);
      saveTimer = setTimeout(function () {
        saveCurrentContent('auto');
      }, 700);
    }

    function openTopic(id, options) {
      options = options || {};
      saveCurrentContent();
      var topic = topics.find(function (item) { return item.id === id; }) || topics[0];
      currentTopic = topic.id;
      var index = topics.indexOf(topic);
      content.innerHTML = renderTopicHtml(track, topic, index, progress);
      if (options.updateUrl !== false) updateTopicUrl(topic.id);

      nav.querySelectorAll('[data-topic-link]').forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('data-topic-link') === topic.id);
      });

      var checkbox = content.querySelector('[data-reader-complete]');
      if (checkbox) {
        checkbox.addEventListener('change', function () {
          progress[topic.id] = checkbox.checked ? 1 : 0;
          if (!checkbox.checked) delete progress[topic.id];
          saveJson(track.storageKey + ':progress', progress);
          updateProgress();
          if (checkbox.checked) {
            showTopicToast(topic.title);
            burstConfetti();
          }
        });
      }

      var editBody = content.querySelector('[data-topic-edit]');
      if (editBody) {
        editBody.addEventListener('input', function () {
          if (saveState) saveState.textContent = 'Unsaved edits';
          var inlineState = content.querySelector('[data-inline-save-state]');
          if (inlineState) inlineState.textContent = 'Unsaved edits - auto-saving...';
          scheduleSave();
        });
      }

      var inlineSave = content.querySelector('[data-inline-save]');
      if (inlineSave) inlineSave.addEventListener('click', saveCurrentContent);

      if (options.scroll !== false) {
        content.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    }

    function renderNav() {
      nav.innerHTML = [
        topics.map(function (topic, index) {
          return [
            '<a href="?topic=' + encodeURIComponent(topic.id) + '" data-topic-link="' + topic.id + '">',
            '<span>' + (index + 1) + '</span>',
            '<strong>' + escapeHtml(topic.title) + '</strong>',
            '</a>'
          ].join('');
        }).join(''),
        '<button class="ai-add-topic-btn" type="button" data-add-topic>',
        '<span>+</span>',
        '<strong>Add topic</strong>',
        '</button>'
      ].join('');

      nav.querySelectorAll('[data-topic-link]').forEach(function (link) {
        link.addEventListener('click', function (event) {
          event.preventDefault();
          openTopic(link.getAttribute('data-topic-link'), { updateUrl: true, scroll: true });
        });
      });

      var addButton = nav.querySelector('[data-add-topic]');
      if (addButton) {
        addButton.addEventListener('click', function () {
          saveCurrentContent();
          var title = window.prompt('New topic title');
          var topic = createCustomTopic(track, topics, title);
          if (!topic) return;
          customTopics.push(topic);
          saveCustomTopics(track, customTopics);
          topics = loadTopics(track);
          renderNav();
          updateProgress();
          openTopic(topic.id, { updateUrl: true, scroll: true });
          if (saveState) saveState.textContent = 'Added topic: ' + topic.title;
        });
      }

      updateProgress();
    }

    var saveButton = document.querySelector('[data-reader-save]');
    if (saveButton) saveButton.addEventListener('click', saveCurrentContent);

    window.addEventListener('beforeunload', function () {
      saveCurrentContent('auto');
    });

    var copyButton = document.querySelector('[data-reader-copy]');
    if (copyButton) {
      copyButton.addEventListener('click', function () {
        var editBody = content.querySelector('[data-topic-edit]');
        if (!editBody) return;
        navigator.clipboard.writeText(editBody.innerText || '').then(function () {
          if (saveState) saveState.textContent = 'Copied current content';
        }).catch(function () {
          if (saveState) saveState.textContent = 'Copy failed. Select and copy manually.';
        });
      });
    }

    initEditableSurfaces();
    renderNav();
    openTopic(currentTopic, { updateUrl: !!topicFromUrl(), scroll: false });

    window.addEventListener('popstate', function () {
      openTopic(topicFromUrl() || track.topics[0].id, { updateUrl: false, scroll: true });
    });
  }

  function init() {
    initEditableSurfaces();
    initReader();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
