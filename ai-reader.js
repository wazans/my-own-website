(function () {
  var TRACKS = {
    everyone: {
      storageKey: 'testnova-ai-reader-everyone',
      title: 'Basic AI',
      topics: [
        lesson('generative-ai-introduction', 'Generative AI - Introduction', [
          'Generative AI creates new content from learned patterns. It can draft text, summarize documents, write code, generate images, create study notes, and transform raw information into useful formats.',
          'Traditional software follows fixed instructions. Generative AI predicts useful output from patterns learned during training and from the context you provide.',
          'Use it for creation, transformation, explanation, summarization, ideation, and structured output.'
        ], 'Ask an AI assistant to explain one technical concept to a beginner, then ask it to rewrite the same answer for a business audience.'),
        lesson('ai-ml-deep-learning', 'Artificial Intelligence, Machine Learning & Deep Learning', [
          'Artificial Intelligence is the broad field of making machines perform tasks that normally need human intelligence.',
          'Machine Learning is a major AI approach where systems learn useful patterns from data.',
          'Deep Learning is a machine learning approach that uses neural networks with many layers, especially useful for language, images, speech, and pattern-heavy tasks.',
          'Example: AI is your phone grouping photos by faces and understanding voice commands. ML is a spam filter learning from many emails. Deep learning is a self-driving car recognizing roads, signs, pedestrians, and vehicles.'
        ], 'Write one example each for AI, ML, and deep learning from tools you already use.'),
        lesson('ai-concepts-practical-examples', 'AI Concepts with Practical Examples', [
          'Artificial Intelligence (AI): broad field of making machines intelligent. Practical example: your phone automatically groups photos by faces, recommends apps, translates languages, and understands voice commands.',
          'Machine Learning (ML): systems learn patterns from data instead of explicit programming. Practical example: a spam filter learns from thousands of emails and starts detecting spam without developers writing rules for every spam message.',
          'Deep Learning: multi-layer neural networks for complex tasks. Practical example: self-driving cars identify roads, traffic signs, pedestrians, and vehicles using camera images.',
          'Generative AI: creates new content. Practical example: creating an image from the prompt "Create a modern office with robots working alongside humans."',
          'Large Language Model (LLM): specialized generative AI for language tasks. Practical example: asking ChatGPT to write a resignation email or generate automation test cases from requirements.',
          'Prompt: instruction given to an AI model. Practical example: "Generate Selenium Java test cases for OrangeHRM login with valid and invalid credentials."',
          'Embeddings: convert text into numerical meaning representations. Practical example: searching "vacation policy" also returns "leave rules" or "annual leave" because the meaning is similar.',
          'Fine Tuning: training an existing model on company-specific data. Practical example: a healthcare company trains an LLM on medical terminology and internal procedures.',
          'RAG (Retrieval Augmented Generation): AI retrieves external data before answering. Practical example: when asked about leave policy, the AI first fetches the HR document and answers from that document instead of guessing.',
          'AI Agent: AI that can use tools and perform actions. Practical example: schedule a meeting with John tomorrow at 3 PM, check calendar availability, create the meeting, and send the invite.'
        ], 'Create your own practical example for each concept: AI, ML, deep learning, generative AI, LLM, prompt, embeddings, fine tuning, RAG, and agent.'),
        lesson('generative-ai-recap', 'Generative AI - Recap', [
          'Generative AI is strongest when the task needs drafting, rewriting, summarizing, explaining, brainstorming, or converting one format into another.',
          'It is not a perfect fact database. Important outputs still need review, testing, and source checking.',
          'Better inputs usually produce better outputs: give role, goal, context, examples, constraints, and output format.',
          'Example: image generation from "Create a modern office with robots working alongside humans" is generative AI because it creates new content instead of only analyzing existing content.'
        ], 'Improve a vague prompt by adding role, goal, context, constraints, and expected output format.'),
        lesson('chatgpt-features', 'Explore ChatGPT: Features & Capabilities - Introduction', [
          'ChatGPT can work as a learning assistant, writing partner, coding helper, research helper, planning assistant, and workflow support tool.',
          'It can explain, compare, summarize, draft, classify, extract, generate examples, and help debug ideas.',
          'For serious work, treat the answer as a strong draft. Review, verify, and refine it.'
        ], 'Ask ChatGPT for an AI study plan, then ask it to convert the plan into a checklist and a quiz.'),
        lesson('llm-large-language-model', 'LLM (Large Language Model)', [
          'A Large Language Model is trained on large amounts of text and code to predict and generate language.',
          'LLMs process input as tokens, which are chunks of text such as words, word pieces, punctuation, or symbols.',
          'The context window controls how much information the model can consider in one interaction.',
          'Example: asking ChatGPT to write a resignation email or generate automation test cases from requirements uses an LLM for language understanding and generation.'
        ], 'Give an LLM a short bug report and ask it to extract severity, steps, expected result, actual result, and missing details.'),
        lesson('prompt-engineering', 'Prompt Engineering', [
          'Prompt engineering is the practice of giving clear instructions and useful context so an AI model can produce the desired output.',
          'A strong prompt includes role, task, context, input data, constraints, examples, output format, and quality criteria.',
          'Prompting is iterative: inspect the answer, identify what is missing, and refine the instruction.',
          'Example prompt: "Generate Selenium Java test cases for OrangeHRM login with valid and invalid credentials."'
        ], 'Write a prompt that turns a user story into positive, negative, boundary, and edge test cases.'),
        lesson('embeddings', 'Embeddings', [
          'Embeddings convert text into numeric vectors that represent meaning.',
          'They make semantic search possible, where the system finds related ideas instead of only exact keyword matches.',
          'Embeddings are used in search, recommendations, clustering, duplicate detection, and RAG systems.',
          'Example: in a company knowledge base, searching for "vacation policy" can also return documents containing "leave rules" or "annual leave" even when the exact words do not match.'
        ], 'Compare keyword search and semantic search for: login fails, user cannot access account, authentication error.'),
        lesson('fine-tuning', 'Fine Tuning', [
          'Fine tuning adapts a model with additional examples so it follows a specific style, domain, or task pattern more reliably.',
          'Use fine tuning when repeated output behavior matters and prompting or retrieval is not enough.',
          'Fine tuning changes behavior. RAG supplies external knowledge at answer time.',
          'Example: a healthcare company trains an LLM on medical terminology so it understands hospital abbreviations and internal procedures better.'
        ], 'List three cases where prompts are enough and one case where fine tuning may be justified.'),
        lesson('recap-summary-view', 'Recap - Summary View', [
          'AI is the broad field. ML learns from data. Deep learning uses layered neural networks. Generative AI creates new outputs.',
          'LLMs are language-focused generative models. Prompts guide the task. Embeddings support meaning-based retrieval.',
          'Fine tuning adjusts behavior. RAG adds external knowledge. Agents combine models with tools and workflows.',
          'Practical examples: AI is your phone grouping photos by faces, recommending apps, translating languages, and understanding voice commands. ML is a spam filter learning from thousands of emails instead of developers writing every spam rule manually. Deep learning is a self-driving car identifying roads, traffic signs, pedestrians, and vehicles from camera images.',
          'Generative AI creates new content, such as an image from the prompt "Create a modern office with robots working alongside humans." An LLM is a language-focused model, such as ChatGPT writing a resignation email or generating automation test cases from requirements. A prompt is the instruction you give, such as "Generate Selenium Java test cases for OrangeHRM login with valid and invalid credentials."',
          'Embeddings convert text into meaning-based numbers, so a company knowledge base search for "vacation policy" can also find "leave rules" or "annual leave." Fine tuning teaches a model your domain, such as a healthcare company training an LLM on medical terminology and internal procedures. RAG retrieves external knowledge before answering, such as fetching the company HR policy before answering a leave question. An AI agent can use tools and take actions, such as checking a calendar, scheduling a meeting, and sending the invite.'
        ], 'Explain each term in one sentence: AI, ML, deep learning, generative AI, LLM, prompt, embedding, fine tuning, RAG, agent.'),
        lesson('rag', 'Retrieval Augmented Generation (RAG)', [
          'RAG connects a model to external knowledge. The system retrieves relevant content, then asks the model to answer using that context.',
          'A basic RAG flow is: user question, retrieve relevant chunks, pass chunks to the model, generate grounded answer.',
          'RAG is useful for private notes, current documents, course material, policies, FAQs, and product knowledge.',
          'Example: you ask "What is our leave policy?" The AI first fetches the company HR document and then answers using that document instead of guessing.'
        ], 'Design a simple RAG flow for a learning FAQ bot that answers from course notes.'),
        lesson('agentic-ai-chatbot', 'Agentic AI - Building Our Own Chat Bot', [
          'Agentic AI combines a model with tools, memory, planning, and workflow steps.',
          'A basic chatbot answers from model knowledge and supplied context. An agent can decide when to search, call an API, create a file, or ask for clarification.',
          'Start simple: define purpose, knowledge source, allowed actions, guardrails, and fallback behavior.',
          'Example: you say "Schedule a meeting with John tomorrow at 3 PM and email him the invite." The agent checks your calendar, finds availability, creates the meeting, and sends the email automatically.'
        ], 'Sketch a chatbot with a welcome message, knowledge source, three allowed actions, and one fallback when it is unsure.'),
        lesson('ai-tools-daily-use', 'AI Tools for Daily Use', [
          'Basic AI learning should focus on how to use AI tools clearly, safely, and productively before moving into specialized QA use cases.',
          'Use AI assistants for explanation, summarization, comparison, brainstorming, rewriting, translation, planning, email drafting, presentation outlines, spreadsheet help, and document cleanup.',
          'Good usage starts with context: tell the tool your goal, audience, current skill level, constraints, and preferred output format. Review the answer before using it in real work.'
        ], 'Pick one daily task and write a prompt that includes role, goal, context, constraints, and output format.'),
        lesson('ai-output-quality', 'AI Output Quality & Verification', [
          'AI answers can be useful but may still be incomplete, outdated, biased, or confidently wrong. Treat output as a draft that needs human review.',
          'Check important claims with reliable sources, compare answers across prompts when needed, and ask the model to list assumptions, missing context, risks, and uncertainty.',
          'For learning, ask the AI to explain step by step, generate examples, quiz you, simplify hard terms, and then verify the explanation against trusted material.'
        ], 'Take one AI answer and review it for missing context, assumptions, unsupported claims, and practical usefulness.'),
        lesson('ai-productivity-workflows', 'AI Productivity Workflows', [
          'A workflow is a repeated sequence of prompts and review steps that turns messy input into useful output. Examples include notes to summary, topic to study plan, rough email to polished email, and data to table.',
          'Start with a small workflow: input, transformation, review, and final output. Keep human approval before publishing, sending, or relying on the result.',
          'Useful beginner workflows include learning assistant, resume draft, meeting notes summary, content calendar, FAQ generation, presentation outline, and personal knowledge assistant.'
        ], 'Design a three-step AI workflow for learning a new technology topic: collect notes, summarize, quiz yourself.')
      ]
    },
    engineers: {
      storageKey: 'testnova-ai-reader-engineers',
      title: 'AI for QA',
      topics: [
        lesson('ai-for-qa-foundations', 'AI for QA Foundations', [
          'AI for QA turns model capabilities into usable testing workflows. The work includes prompting, test design support, automation assistance, evaluation, monitoring, and human review.',
          'A practical AI feature needs clear inputs, predictable outputs, error handling, privacy rules, and a way to measure quality.'
        ], 'Pick one AI testing feature and define its input, output, model, success criteria, and failure handling.'),
        lesson('ai-concepts-qa-examples', 'AI Concepts in QA Examples', [
          'AI in QA can summarize failed tests from yesterday execution and group the reasons by environment, data, application bug, or automation issue.',
          'ML in QA can prioritize tests by learning that payment and login modules fail most often, so those tests run first. Deep learning appears in visual testing tools that compare screenshots and detect UI changes automatically.',
          'Generative AI can create test cases, test data, automation scripts, and API payloads. Example prompt: "Generate Playwright TypeScript test cases for user registration."',
          'An LLM can convert a requirement such as "User should not login with expired password" into test cases, BDD scenarios, automation code, and defect reports. A prompt can be as direct as "Generate negative test cases for password reset functionality."',
          'Embeddings help semantic search: searching for "payment timeout" can also find transaction delay, gateway timeout, or checkout stuck because the meanings are similar.',
          'Fine tuning can train a model on defect templates, naming conventions, coding standards, and framework structure so generated scripts follow team standards. RAG can search the internal repository and explain how login automation is implemented in the real framework.',
          'An AI agent can analyze failed Jenkins build #145, read logs, identify failed tests, create Jira tickets for genuine failures, and email the report with little or no manual intervention.'
        ], 'Choose one QA workflow and map how AI, ML, LLMs, prompts, embeddings, RAG, fine tuning, and agents could support it.'),
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
        ], 'Create a release checklist for moving an AI chatbot from prototype to production.'),
        lesson('ai-for-qa-roadmap', 'AI for QA Roadmap', [
          'AI for QA starts with strong manual testing fundamentals, then adds AI literacy, prompt engineering, AI-assisted test design, automation support, and evaluation skills.',
          'A practical roadmap is: learn AI basics, learn prompt patterns, use AI for requirements analysis, generate and review test scenarios, create test data, support automation code, evaluate output quality, and build small QA projects.',
          'The goal is not to let AI replace QA judgment. The goal is to make QA work faster, broader, and more systematic while humans validate risk, coverage, and correctness.'
        ], 'Create a 30-day AI for QA roadmap with weekly goals for prompts, test design, automation support, and evaluation.'),
        lesson('ai-for-manual-testing-workflow', 'AI for Manual Testing Workflow', [
          'Use AI to break down requirements, identify assumptions, create positive and negative scenarios, suggest boundary values, draft test cases, and improve bug reports.',
          'Always review generated test cases against the actual requirement. AI may miss business rules, domain constraints, dependencies, or edge cases that a QA engineer must catch.',
          'A strong workflow is: paste requirement, ask for assumptions, ask for scenario categories, generate test cases, review coverage, refine missing areas, and prepare final test documentation.'
        ], 'Paste a sample user story and ask AI for assumptions, test scenarios, boundary cases, and missing questions.'),
        lesson('ai-for-automation-workflow', 'AI for Automation Workflow', [
          'AI can help explain existing automation code, suggest locators, draft page object methods, convert manual cases into automation steps, and debug common failures.',
          'For Selenium, Playwright, API testing, and framework work, provide the tool stack, page details, expected behavior, existing code, error logs, and constraints.',
          'Do not paste secrets or private credentials. Review generated code for flaky waits, weak locators, missing assertions, poor error handling, and maintainability before adding it to a framework.'
        ], 'Ask AI to convert a manual login test into Playwright or Selenium steps, then review the locators and assertions.')
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
        ], 'Write test cases for a function that validates an email and phone number.'),
        lesson('javascript-introduction-engine', 'JavaScript Introduction & JS Engine', [
          'JavaScript is a lightweight, interpreted, just-in-time compiled programming language used to add interactivity, behavior, and dynamic features to web pages.',
          'It is prototype-based, multi-paradigm, event-driven, asynchronous, dynamically typed, and works across modern browsers. It is also used on the backend through Node.js.',
          'A browser sends requests to a server, receives the response, and JavaScript makes the page dynamic after or during that process. In Chrome and Node.js, the V8 engine converts JavaScript code into machine code and executes it.'
        ], 'List five real website features that need JavaScript, such as validation, dynamic content, events, or API calls.'),
        lesson('javascript-variables-data-types', 'Variables, Naming Rules & Data Types', [
          'Variables are containers used to store data. Use var only when reading older code, let for values that may change, and const for values that should not be reassigned.',
          'var is function scoped and can be redeclared. let and const are block scoped. let can be updated but not redeclared in the same scope. const cannot be updated or redeclared.',
          'Primitive data types include string, number, boolean, null, undefined, symbol, and bigint. Non-primitive types include object, array, and function. Arrays, objects, and functions return object/function style results with typeof because of JavaScript history.'
        ], 'Create examples for string, number, boolean, null, undefined, symbol, bigint, object, array, and function.', [
          {
            title: 'Variables and typeof',
            code: 'var oldName = "Legacy"\nlet score = 25\nconst isActive = true\n\nconsole.log(typeof "Hello")      // string\nconsole.log(typeof 25)           // number\nconsole.log(typeof true)         // boolean\nconsole.log(typeof null)         // object\nconsole.log(typeof undefined)    // undefined\nconsole.log(typeof [1, 2, 3])    // object\nconsole.log(typeof function(){})  // function'
          }
        ]),
        lesson('javascript-operators-control-statements', 'Operators & Control Statements', [
          'Arithmetic operators perform calculations: addition, subtraction, multiplication, division, modulus, exponentiation, increment, and decrement.',
          'Comparison operators check equality and ordering. Use strict equality when possible because it compares both value and type. Logical operators combine conditions with AND, OR, and NOT.',
          'Use if, else if, and else for conditional branches. Use switch when one fixed value has many possible cases. JavaScript also converts values into truthy and falsy form inside conditions.'
        ], 'Write one example each for arithmetic, assignment, comparison, logical, ternary, if/else, and switch.', [
          {
            title: 'Control flow example',
            code: 'let age = 18\nlet result = age >= 18 ? "Adult" : "Minor"\n\nswitch (result) {\n  case "Adult":\n    console.log("Allowed")\n    break\n  default:\n    console.log("Not allowed")\n}'
          }
        ]),
        lesson('javascript-loops-functions', 'Loops & Functions', [
          'Loops execute a block of code multiple times. Use for when the number of iterations is known, while when the condition controls repetition, and do...while when the block should run at least once.',
          'break exits the loop completely. continue skips the current iteration and moves to the next one.',
          'Functions group reusable logic. The notes cover function declaration, function expression, arrow function, default parameters, rest parameters, and return statements.'
        ], 'Create a function that accepts any number of marks and returns the total and average.', [
          {
            title: 'Rest parameters and return',
            code: 'function calculateMarks(...marks) {\n  let total = 0\n  for (let mark of marks) total += mark\n  return { total, average: total / marks.length }\n}\n\nconsole.log(calculateMarks(80, 90, 75))'
          }
        ]),
        lesson('javascript-arrays-objects-detail', 'Arrays & Objects in Detail', [
          'An array is a special variable that can hold more than one value. Common array methods include push, pop, shift, unshift, splice, slice, concat, indexOf, lastIndexOf, includes, join, reverse, sort, and length.',
          'Array iteration can be done with for, for...of, forEach, map, and filter. Use map when transforming values and filter when selecting matching values.',
          'Objects store key-value pairs. Access properties with dot notation or bracket notation, update properties by assignment, delete with delete, and use object methods when behavior belongs to the object.'
        ], 'Create a learner object with name, age, city, skills array, and a greet method. Then use array methods on skills.', [
          {
            title: 'Array and object practice',
            code: 'let skills = ["JS", "HTML"]\nskills.push("CSS")\nlet upper = skills.map(skill => skill.toUpperCase())\n\nlet learner = {\n  name: "Zara",\n  age: 20,\n  city: "Delhi",\n  skills,\n  greet() {\n    return "Hello, I am " + this.name\n  }\n}\n\nconsole.log(upper)\nconsole.log(learner.greet())'
          }
        ]),
        lesson('javascript-strings-dom-detail', 'Strings & DOM Selection', [
          'A string is a sequence of characters. Common string properties and methods include length, toUpperCase, toLowerCase, trim, slice, substring, substr, replace, includes, indexOf, split, charAt, concat, startsWith, endsWith, and repeat.',
          'Template literals use backticks and allow embedded expressions with ${}. They are useful for readable dynamic text and multi-line strings.',
          'The DOM represents an HTML document as a tree of objects. JavaScript can select and manipulate elements using getElementById, getElementsByClassName, getElementsByTagName, querySelector, and querySelectorAll.'
        ], 'Build a small page script that selects an element, trims a name, and renders a template literal greeting.', [
          {
            title: 'String and DOM example',
            code: 'let name = "  Zara  "\nlet message = `Welcome, ${name.trim()}!`\n\ndocument.querySelector("#welcome").textContent = message'
          }
        ]),
        lesson('javascript-es6-features', 'ES6 Features', [
          'ES6 introduced modern syntax that makes JavaScript cleaner and easier to maintain: let, const, arrow functions, template literals, destructuring, spread operator, rest operator, default parameters, and modules.',
          'Destructuring extracts values from arrays or properties from objects into variables. Spread expands arrays or objects. Rest collects multiple values into a single array.',
          'Modules split code into separate files using export and import, which helps keep large projects organized.'
        ], 'Refactor older JavaScript into ES6 using const, arrow functions, template literals, destructuring, and spread.', [
          {
            title: 'ES6 quick example',
            code: 'const user = { name: "Zara", age: 21, city: "Delhi" }\nconst { name, city } = user\nconst skills = ["JS", "HTML"]\nconst updatedSkills = [...skills, "CSS"]\nconst greet = (person = name) => `Hello ${person} from ${city}`\n\nconsole.log(greet())\nconsole.log(updatedSkills)'
          }
        ]),
        lesson('javascript-async-promises-fetch-json', 'Asynchronous JavaScript, Promises, Fetch & JSON', [
          'Asynchronous JavaScript lets tasks run in the background without blocking the rest of the code. Timers, callbacks, promises, async/await, API calls, and JSON handling are core async skills.',
          'A callback is a function passed into another function and executed later. Callback hell happens when nested callbacks become difficult to read and maintain.',
          'A promise represents the eventual completion or failure of an async operation. async/await makes promise-based code easier to read. fetch sends HTTP requests, and JSON.stringify / JSON.parse convert between objects and JSON strings.'
        ], 'Fetch data from an API, handle loading and errors, parse JSON, and render a result.', [
          {
            title: 'Fetch with async/await',
            code: 'async function loadUser() {\n  try {\n    const response = await fetch("/api/user")\n    if (!response.ok) throw new Error("Request failed")\n    const data = await response.json()\n    console.log(JSON.stringify(data))\n  } catch (error) {\n    console.error(error.message)\n  }\n}'
          }
        ]),
        lesson('javascript-events-classes-errors', 'Events, Classes & Error Handling', [
          'Events are actions or occurrences that happen in the system, such as click, dblclick, mouseover, keydown, submit, input, load, resize, scroll, and DOMContentLoaded.',
          'Use addEventListener instead of inline HTML event attributes. The event object contains information about what happened and can be used for validation, prevention, and UI updates.',
          'Classes provide a cleaner way to create objects and handle inheritance. try, catch, and finally help handle runtime errors and keep important code running safely.'
        ], 'Create a button click handler, a small class, and a try/catch block for JSON parsing.', [
          {
            title: 'Event, class, and error example',
            code: 'document.querySelector("#save").addEventListener("click", function(event) {\n  event.preventDefault()\n  console.log("Button clicked")\n})\n\nclass Person {\n  constructor(name) { this.name = name }\n  greet() { return `Hello, I am ${this.name}` }\n}\n\ntry {\n  JSON.parse(\"bad json\")\n} catch (error) {\n  console.log(\"Invalid JSON\")\n} finally {\n  console.log(\"Validation finished\")\n}'
          }
        ]),
        lesson('javascript-array-methods-storage', 'Array Methods, Higher Order Functions & Web Storage', [
          'Higher order functions either accept another function as an argument or return a function. Common examples include map, filter, reduce, forEach, find, and some.',
          'map creates a new array by applying a function to each item. filter returns items that match a condition. reduce combines values into a single result. find returns the first matching item.',
          'localStorage keeps data even after closing and reopening the browser. sessionStorage keeps data only for the current tab/session. Store structured values as JSON strings and parse them when reading.'
        ], 'Store a list of completed topics in localStorage, read it back, and use map/filter/reduce on the list.', [
          {
            title: 'Higher order functions and storage',
            code: 'const numbers = [1, 2, 3, 4]\nconst doubled = numbers.map(n => n * 2)\nconst even = numbers.filter(n => n % 2 === 0)\nconst total = numbers.reduce((sum, n) => sum + n, 0)\n\nlocalStorage.setItem("numbers", JSON.stringify(numbers))\nconst saved = JSON.parse(localStorage.getItem("numbers") || "[]")\n\nconsole.log({ doubled, even, total, saved })'
          }
        ])
      ]
    },
    git: {
      storageKey: 'testnova-reader-git-github',
      title: 'Git & GitHub',
      topics: [
        lesson('git-github-overview', 'Git & GitHub Overview', [
          'Git is the version control system that tracks code changes on your computer. GitHub is the collaboration platform where teams host repositories, review pull requests, discuss issues, and share releases.',
          'Learn Git first as a local workflow: working directory, staging area, commits, branches, and history. Then connect that workflow to GitHub for team collaboration.',
          'For QA and automation projects, Git helps you manage test code, feature branches, framework updates, and reviewable changes.'
        ], 'Explain the difference between Git and GitHub in two sentences.'),
        lesson('git-install-setup', 'Install & Configure Git', [
          'Install Git for Windows from Git SCM, then verify the command is available from the terminal.',
          'Configure your name and email once. Git stores this identity in your commits so collaborators can understand who changed what.',
          'Use the VS Code terminal for a consistent workflow: create folders, run Git commands, open files, and commit changes from one place.'
        ], 'Install Git and configure your name and email.', [
          {
            title: 'Verify Git setup',
            code: 'git -v\n\ngit config --global user.name "Your Name"\ngit config --global user.email "you@example.com"\n\ngit config --global --list'
          }
        ]),
        lesson('git-core-workflow', 'Core Git Workflow', [
          'The basic workflow is edit files, check status, stage changes, commit a meaningful snapshot, then inspect history.',
          'Use git status often. It tells you which files are modified, staged, untracked, or clean.',
          'A commit should represent one logical change. Good commit messages make later debugging and reviews much easier.'
        ], 'Create a practice folder, edit a README file, stage it, and commit it.', [
          {
            title: 'First local commit',
            code: 'mkdir git-practice\ncd git-practice\ngit init\n\nNew-Item README.md\nAdd-Content README.md "# Git Practice"\n\ngit status\ngit add README.md\ngit commit -m "Add project readme"\ngit log --oneline'
          }
        ]),
        lesson('git-branches-merges', 'Branches, Merges & Conflicts', [
          'Branches let you work on changes without disturbing the main line of development.',
          'Merge brings completed branch work back into another branch. A conflict happens when Git cannot safely combine competing edits.',
          'Resolve conflicts by opening the file, choosing the correct final content, staging the resolved file, and committing the merge.'
        ], 'Create a branch, make a change, merge it into main, and describe when conflicts happen.', [
          {
            title: 'Branch workflow',
            code: 'git switch -c feature/login-tests\n# edit files\ngit add .\ngit commit -m "Add login test notes"\n\ngit switch main\ngit merge feature/login-tests'
          }
        ]),
        lesson('github-repositories', 'GitHub Repositories & Remotes', [
          'A remote connects your local repository to a hosted repository such as GitHub.',
          'Clone copies an existing repository to your machine. Push uploads local commits. Pull brings remote changes into your branch.',
          'Always check the branch and status before pushing, especially when working on shared repositories.'
        ], 'Create or clone a GitHub repository and practice push and pull.', [
          {
            title: 'Remote commands',
            code: 'git clone https://github.com/example/project.git\ncd project\n\ngit remote -v\ngit status\n\ngit push origin main\ngit pull origin main'
          }
        ]),
        lesson('pull-requests-reviews', 'Pull Requests & Code Reviews', [
          'A pull request is a review request for branch changes before they are merged.',
          'Good pull requests include a clear title, short summary, test evidence, screenshots when UI changed, and any known risks.',
          'For QA projects, include what was tested: browser, test command, report, or scenario coverage.'
        ], 'Draft a pull request description for a new automation test.', [
          {
            title: 'PR description template',
            code: 'Summary:\n- Added login smoke test\n- Covered valid user flow\n\nTesting:\n- npx playwright test login.spec.ts\n\nNotes:\n- No data model changes'
          }
        ]),
        lesson('git-staging-workflow', 'Git Staging Area & Workflow', [
          'The Git workflow has three important areas: working directory, staging area, and repository. The working directory contains changed files, the staging area holds selected changes, and the repository stores committed snapshots.',
          'Use git add to move changes into staging, git status to inspect state, and git commit to save a snapshot with a message.',
          'You do not always need git add before commit if you use git commit -am for already tracked files, but untracked files still need git add first.'
        ], 'Change two files, stage only one, and explain what git status shows before and after staging.', [
          {
            title: 'Staging workflow',
            code: 'git status\ngit add file-one.js\ngit status\ngit commit -m "Update selected file"'
          }
        ]),
        lesson('git-stash-ignore-clean', 'Git Stash, Gitignore & Cleanup', [
          'git stash temporarily saves uncommitted changes and clears the working directory. It is useful when you need to switch branches quickly without committing unfinished work.',
          '.gitignore tells Git which files or folders to ignore, such as logs, build files, node_modules, environment files, and generated outputs.',
          'Cleanup commands remove untracked files or directories. Use them carefully, because cleaning can delete files that are not committed.'
        ], 'Create a .gitignore for node_modules, logs, build output, and .env files. Then stash and re-apply a local change.', [
          {
            title: 'Stash and ignore',
            code: 'git stash\ngit stash list\ngit stash pop\n\n# .gitignore examples\nnode_modules/\ndist/\n*.log\n.env'
          }
        ]),
        lesson('git-undoing-changes', 'Undoing Changes: Reset, Revert & Checkout', [
          'git reset moves HEAD and can unstage or rewrite local history depending on the mode. Soft reset keeps changes staged, mixed reset unstages changes, and hard reset discards changes.',
          'git revert creates a new commit that undoes an earlier commit. It is safer for shared branches because it does not rewrite public history.',
          'git checkout or git restore can discard changes in a file or switch branches depending on the command style used.'
        ], 'Explain when to use reset, revert, and restore for a committed bug versus an uncommitted local edit.', [
          {
            title: 'Undo command examples',
            code: 'git reset --soft HEAD~1\ngit reset --mixed HEAD~1\ngit reset --hard HEAD~1\n\ngit revert <commit-id>\ngit restore file.js'
          }
        ]),
        lesson('git-fetch-pull-remotes', 'Fetch, Pull & Remote Tracking Branches', [
          'A remote is a hosted copy of a repository, usually on GitHub. origin is the default remote name, and origin/main is a remote-tracking branch representing the state of main on the remote.',
          'git fetch downloads remote commits into remote-tracking branches but does not merge them into your current branch.',
          'git pull performs fetch plus merge or rebase, updating your current branch automatically. Use fetch when you want to inspect remote changes before integrating them.'
        ], 'Run fetch, compare local main with origin/main, then decide whether to merge, rebase, or pull.', [
          {
            title: 'Remote inspection',
            code: 'git remote -v\ngit fetch origin\ngit log --oneline main..origin/main\ngit pull origin main'
          }
        ]),
        lesson('git-merge-rebase-fast-forward', 'Merge, Rebase & Fast-Forward', [
          'Merge combines histories and keeps non-linear commits. Rebase replays commits on top of another branch, producing a cleaner linear history.',
          'A fast-forward merge happens when the target branch has no new commits and Git can simply move the branch pointer ahead without creating a merge commit.',
          'For shared branches, avoid rebasing commits that others may already have based work on. For feature branches, rebase can keep history clean before opening a pull request.'
        ], 'Create a short branch history diagram showing when merge, rebase, and fast-forward happen.'),
        lesson('github-tags-releases-actions', 'GitHub Tags, Releases & Actions', [
          'A tag is a label pointing to a specific commit. Lightweight tags are simple pointers. Annotated tags store metadata such as tagger, date, and message and are preferred for releases.',
          'A release packages a tagged version with notes and assets. Teams use releases to communicate stable milestones.',
          'GitHub Actions automates workflows inside GitHub. It can build, test, deploy, or run checks when events such as push or pull request happen.'
        ], 'Create a tag naming plan for v1.0.0, v1.1.0, and a hotfix release.', [
          {
            title: 'Tags and actions commands',
            code: 'git tag -a v1.0.0 -m "First release"\ngit push origin v1.0.0\n\n# GitHub Actions lives in:\n.github/workflows/'
          }
        ]),
        lesson('github-flow-git-flow-large-files', 'GitHub Flow, Git Flow & Large Files', [
          'GitHub Flow is a simple workflow: create a branch, commit changes, open a pull request, review, and merge into main.',
          'Git Flow is more structured and commonly uses main, develop, feature, release, and hotfix branches.',
          'Use Git LFS for large files such as images, videos, or datasets. Avoid committing unnecessary generated files or very large binaries into normal Git history.'
        ], 'Compare GitHub Flow and Git Flow for a small QA project versus an enterprise release process.'),
        lesson('github-cli-api-repo-management', 'GitHub CLI, API & Repository Management', [
          'GitHub CLI lets you work with GitHub from the command line: create repositories, clone repositories, create pull requests, list pull requests, and create issues.',
          'The GitHub API can be used with curl or automation tools to list repositories, create issues, or integrate GitHub into custom workflows.',
          'Repository management includes checking status, viewing differences, blaming a file, searching history, archiving a project, and fetching the latest changes.'
        ], 'Write three GitHub CLI commands and one API example that could help a QA automation team.', [
          {
            title: 'GitHub CLI and API examples',
            code: 'gh repo create\ngh repo clone owner/repo\ngh pr create\ngh issue create\n\ncurl -H \"Authorization: token YOUR_TOKEN\" https://api.github.com/repos/OWNER/REPO/issues'
          }
        ]),
        lesson('git-best-practices', 'Best Practices & Common Workflows', [
          'Make frequent commits with descriptive messages. Keep each commit focused on one logical change so reviews and rollbacks are easier.',
          'Create branches for features or bug fixes, pull regularly to avoid drift, resolve conflicts promptly, and review pull requests thoroughly before merging.',
          'Keep branches clean, use hooks for formatting or checks, scan commits for secrets, avoid committing large generated files, and keep main deployable.'
        ], 'Create a Git checklist for daily QA automation work: branch, pull, edit, test, commit, push, PR, review, merge.')
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

  function lesson(id, title, paragraphs, practice, examples, resources) {
    return { id: id, title: title, paragraphs: paragraphs, practice: practice, examples: examples || [], resources: resources || [] };
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
      topic.resources && topic.resources.length ? [
        '<div class="ai-resource-row">',
        topic.resources.map(function (resource) {
          return '<a class="primary-btn" href="' + escapeHtml(resource.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(resource.label) + '</a>';
        }).join(''),
        '</div>'
      ].join('') : '',
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
