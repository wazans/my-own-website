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
      contentVersion: 2,
      title: 'JavaScript & TypeScript for Playwright',
      topics: buildPlaywrightJsTsTopics(),
      legacyTopics: [
        lesson('javascript-basics', 'JavaScript Basics', [
          'JavaScript adds behavior to web pages and applications. It handles user interactions, data changes, browser APIs, and dynamic UI updates.',
          'Start with variables, functions, conditions, loops, arrays, objects, and events.',
          'Modern JavaScript is also used outside the browser with runtimes such as Node.js.'
        ], 'Create a small script that reads a name from an input and displays a formatted greeting.'),
        lesson('javascript-basics-practice-code', 'JavaScript Basics Practice Code', [
          'Use this topic as a practical classroom-style walkthrough for JavaScript basics before moving deeper into TypeScript. It covers hello world, var, let, const, hoisting, primitive and non-primitive data types, functions, arithmetic, comparison, logical operators, ternary, string concatenation, and BODMAS.',
          'The const reassignment line is intentionally shown as an error example. Keep it commented when running the full file, otherwise JavaScript stops execution with a TypeError.',
          'These examples are useful before TypeScript because TypeScript builds on the same JavaScript runtime behavior while adding type checking.'
        ], 'Run the safe version of this file in Node.js, then convert five variables into typed TypeScript declarations.', [
          {
            title: 'Hello world, variables, hoisting, and data types',
            code: '// 1. Hello World\nconsole.log("Hello World !")\n\n// 2. Variables\nvar firstName = "John"\nvar firstName = "emll"\nconsole.log(firstName)\n\nlet lastName = "Smith"\nlastName = "Smith2"\n// let lastName = "Smith3" // SyntaxError: cannot re-declare in same scope\nconsole.log(lastName)\n\nconst occupation = "engineer"\n// occupation = "doctor" // TypeError: Assignment to constant variable\nconsole.log(occupation)\n\n// 3. Hoisting\nconsole.log(age) // undefined\nvar age = 5\nconsole.log(age) // 5\n\n// 4. Data types\nvar middleName = "David"      // string\nvar yearInService = 5         // number\nvar isHeMarried = false       // boolean\nvar yearInMarriage = null     // null\nvar numberOfCars = undefined  // undefined\n\nvar fruits = ["apple", "banana", "mango"]\nconsole.log(fruits[0], fruits[1], fruits[2])\n\nvar person = {\n  firstName: "John",\n  lastName: "Doe"\n}\nconsole.log(person)\n\nfunction greet(name) {\n  console.log("Hello " + name)\n}\ngreet("Alice")'
          },
          {
            title: 'Operators, coercion, ternary, and BODMAS',
            code: '// Arithmetic operators\nconsole.log(10 + 10)\nvar a = 10\nvar b = 10\nconsole.log(a + b)\n\nconsole.log(10 - 5)\nconsole.log(10 * 5)\nconsole.log(10 / 5)  // quotient: 2\nconsole.log(10 % 3)  // remainder: 1\nconsole.log(10 ** 3) // power: 1000\n\n// Comparison operators\nconsole.log(10 > 5)      // true\nconsole.log(10 < 5)      // false\nconsole.log(10 >= 5)     // true\nconsole.log(10 <= 5)     // false\nconsole.log(10 == "10")  // true: type coercion\nconsole.log(10 === "10") // false: strict comparison\nconsole.log(10 != 5)     // true\nconsole.log(10 !== 5)    // true\n\n// Logical operators\nconsole.log(true && false) // false\nconsole.log(true || false) // true\nconsole.log(!true)         // false\n\nlet isMarried = true\nlet isEmployed = false\nconsole.log(isMarried && isEmployed) // false\nconsole.log(isMarried || isEmployed) // true\n\n// Ternary operator\nvar userAge = 20\nvar isAdult = userAge >= 18 ? true : false\nconsole.log(isAdult)\n\n// String concatenation and coercion\nconsole.log(10 + 20 + "js")      // 30js\nconsole.log("js" + 10 + 20)      // js1020\nconsole.log("js" + (10 + 20))    // js30\nconsole.log(10 + 20 + "1" + 21)  // 30121\nconsole.log(10 + 20 + (1 + 1))   // 32\n\n// BODMAS / operator precedence\nconsole.log((10 + 20 * 2) / 2 - 1) // 24'
          },
          {
            title: 'TypeScript version of selected variables',
            code: 'let typedLastName: string = "Smith2"\nconst typedOccupation: string = "engineer"\nlet typedAge: number = 20\nlet typedIsMarried: boolean = true\nlet typedFruits: string[] = ["apple", "banana", "mango"]\n\ntype Person = {\n  firstName: string\n  lastName: string\n}\n\nconst typedPerson: Person = {\n  firstName: "John",\n  lastName: "Doe"\n}\n\nfunction typedGreet(name: string): void {\n  console.log("Hello " + name)\n}'
          }
        ]),
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
          'JavaScript is a versatile programming language used for interactive web applications. It works with HTML and CSS in the browser, and it can also run on servers or local machines through Node.js.',
          'JavaScript is dynamically typed. The data type of a variable is decided at run time, so you do not explicitly declare the type before execution.',
          'A JavaScript engine is the program inside a browser that reads, interprets, and executes JavaScript code. Chrome, Edge, Brave, Opera, and Samsung Internet use V8 through Chromium. Firefox uses SpiderMonkey. Safari uses JavaScriptCore, also called Nitro. Old Internet Explorer used Chakra.',
          'Node.js is a free, open-source runtime environment that runs JavaScript outside the browser. It is powered by the V8 engine and supported by the npm package ecosystem.'
        ], 'List five real website features that need JavaScript, then run one JavaScript file with Node.js.', [
          {
            title: 'Run JavaScript with Node.js',
            code: 'node -v\nnpm -v\n\n// save as intro.js\nconsole.log("JavaScript is running outside the browser")\n\n// terminal\nnode intro.js'
          }
        ]),
        lesson('javascript-variables-data-types', 'Variables, Naming Rules & Data Types', [
          'Variables are containers used to store data. JavaScript has three common declaration keywords: var, let, and const.',
          'var is the legacy declaration style from before ES6. It is function scoped, can be updated, and can be redeclared, which may cause accidental overwrites.',
          'let is the modern block-scoped declaration. It can be updated, but it cannot be redeclared in the same block.',
          'const is block scoped and must be initialized immediately. It cannot be reassigned or redeclared.',
          'Common data types include number, string, boolean, undefined, null, object, array, and function. JavaScript decides these types at run time.'
        ], 'Create examples for number, string, boolean, undefined, null, object, array, function, var, let, and const.', [
          {
            title: 'Variables and typeof',
            code: 'var oldName = "Legacy"\nlet score = 25\nconst isActive = true\n\nconsole.log(typeof "Hello")      // string\nconsole.log(typeof 25)           // number\nconsole.log(typeof true)         // boolean\nconsole.log(typeof null)         // object\nconsole.log(typeof undefined)    // undefined\nconsole.log(typeof [1, 2, 3])    // object\nconsole.log(typeof function(){})  // function'
          },
          {
            title: 'var, let, and const',
            code: 'var name = "Wasim"\nvar name = "Ansari"\nconsole.log(name) // Ansari\n\nlet age = 30\nage = 31\n// let age = 32 // SyntaxError: Identifier has already been declared\n\nconst role = "QA"\n// role = "Dev" // TypeError: Assignment to constant variable'
          }
        ]),
        lesson('javascript-hoisting', 'Hoisting', [
          'Hoisting is JavaScript behavior where declarations are processed before code runs. It can make variables and functions appear available earlier than where they are written.',
          'var declarations are hoisted and initialized as undefined. This means reading a var variable before assignment gives undefined.',
          'Function declarations are fully hoisted, so they can be called before the function appears in the file.',
          'let and const are also hoisted, but they stay uninitialized until their line runs. Reading them early gives a ReferenceError.'
        ], 'Write one example each for var hoisting, function hoisting, and let or const ReferenceError.', [
          {
            title: 'var hoisting',
            code: 'console.log(name) // undefined\nvar name = "Wasim"\n\n// JavaScript behaves like this:\nvar name\nconsole.log(name) // undefined\nname = "Wasim"'
          },
          {
            title: 'function, let, and const hoisting',
            code: 'sayHello()\n\nfunction sayHello() {\n  console.log("Hello Wasim")\n}\n\n// console.log(city) // ReferenceError\nlet city = "Pune"\n\n// console.log(role) // ReferenceError\nconst role = "QA"'
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
          'Loops execute a block of code multiple times. Use loops for repeated statements, such as sending an email to every user in a list or checking every test result in a report.',
          'Use for when the number of iterations is fixed. Use while when the iteration count is not fixed and depends on a condition. Use do...while when the block should run at least once before checking the condition.',
          'A wrong condition can make a loop run zero times, and an infinite loop can freeze a program. break exits the loop completely. continue skips the current iteration and moves to the next one.',
          'Functions group reusable logic. The notes cover function declaration, function expression, arrow function, default parameters, rest parameters, and return statements.'
        ], 'Create a function that accepts any number of marks and returns the total and average.', [
          {
            title: 'For loop with fixed iterations',
            code: '// For repeated statements we use loops.\n// Example: sending email to everyone in a list.\n\nconsole.log("Start")\nfor (let i = 0; i < 5; i++) {\n  console.log(i)\n}\nconsole.log("End")\n\nfor (let i = 0; i <= 21; i++) {\n  console.log(i)\n}'
          },
          {
            title: 'Failed condition and infinite loop warning',
            code: '// This loop does not run because the condition is false at the start.\nfor (let i = 10; i <= 0; i++) {\n  console.log(i)\n}\n\n// Infinite loop warning: do not run this unless you have a safe stop condition.\n// for (;;) {\n//   console.log("PW")\n// }'
          },
          {
            title: 'While loop when iteration count is not fixed',
            code: 'console.log("Start while")\n\nlet whileCounter = 0\nwhile (whileCounter <= 5) {\n  console.log("Value of i " + whileCounter)\n  whileCounter++\n  // whileCounter = whileCounter + 1\n}\n\n// Infinite while loop warning:\n// while (true) {\n//   console.log("Hi")\n// }'
          },
          {
            title: 'Do while loop runs at least once',
            code: 'console.log("Start do while")\n\nlet doCounter = 1\ndo {\n  console.log("the value of i is " + doCounter)\n  doCounter++\n} while (doCounter <= 6)'
          },
          {
            title: 'Even numbers and break',
            code: 'for (let i = 1; i <= 100; i++) {\n  if (i % 2 === 0) {\n    console.log("Even number " + i)\n  }\n\n  if (i === 50) {\n    break\n  }\n}'
          },
          {
            title: 'Rest parameters and return',
            code: 'function calculateMarks(...marks) {\n  let total = 0\n  for (let mark of marks) total += mark\n  return { total, average: total / marks.length }\n}\n\nconsole.log(calculateMarks(80, 90, 75))'
          }
        ]),
        lesson('javascript-arrays-objects-detail', 'Arrays & Objects in Detail', [
          'An array is a special variable that can hold more than one value. Arrays use zero-based indexes, so the first item is at index 0. If you read an index that does not exist, JavaScript returns undefined.',
          'Arrays can store values of the same type or mixed data types. They can also store nested arrays, which are useful for table-like data such as subjects, marks, and pass status.',
          'Common array methods include push, pop, shift, unshift, splice, slice, concat, indexOf, lastIndexOf, includes, join, reverse, sort, and length.',
          'Array iteration can be done with a traditional for loop or for...of. Use a traditional for loop when you need index control or custom direction. Use for...of for simple forward iteration over iterable values.',
          'Objects store key-value pairs. Access properties with dot notation or bracket notation, update properties by assignment, delete with delete, and use object methods when behavior belongs to the object.'
        ], 'Create a learner object with name, age, city, skills array, and a greet method. Then use array methods on skills.', [
          {
            title: 'Store multiple values in one variable',
            code: '// Store multiple values in a single variable\nlet arr = ["java", "playwright", "git", "github"]\nconsole.log(arr)\nconsole.log(arr[2]) // git\nconsole.log(arr[5]) // undefined, because index 5 does not exist\n\n// Array of different data types\nlet arr1 = ["Wasim", 32, true, null, "Noida"]\nconsole.log(arr1[2]) // true\nconsole.log(arr1[3]) // null'
          },
          {
            title: 'Nested arrays',
            code: 'console.log("Hello World!")\n\nlet subjects = [\n  ["Math", 65, true],\n  ["eng", 65, true]\n]\n\nconsole.log(subjects)\nconsole.log(subjects[0])    // ["Math", 65, true]\nconsole.log(subjects[0][0]) // Math\nconsole.log(subjects[1][1]) // 65'
          },
          {
            title: 'Update, add, and remove array elements',
            code: 'let fruits = ["Mango", "Orrange", "Apple"]\nconsole.log(fruits)\n\n// Update by index\nfruits[1] = "Banana"\nconsole.log(fruits)\n\n// Adding elements\nfruits.push("Guava")       // add at end\nconsole.log(fruits)\n\nfruits.unshift("Pineapple") // add at beginning\nconsole.log(fruits)\n\n// Removing elements\nfruits.pop()   // remove last\nconsole.log(fruits)\n\nfruits.shift() // remove first\nconsole.log(fruits)\n\nconsole.log(fruits.length) // number of items in array'
          },
          {
            title: 'Traditional for loop and for...of',
            code: 'var country = ["India", "UK", "USA", "Japan"]\n\n// Traditional for loop: use when customization or index control is required\nfor (let i = 0; i < country.length; i++) {\n  console.log(country[i])\n}\n\n// for...of: use for simple forward iteration over iterable objects\nfor (let value of country) {\n  console.log(value)\n}'
          },
          {
            title: 'Break inside for...of',
            code: 'var players = ["Virat", "Rohit", "Sachin", "Kallis", "Babar", "MSD"]\n\nfor (let value of players) {\n  console.log(value)\n\n  if (value === "Babar") {\n    break\n  }\n}'
          },
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
      contentVersion: 11,
      readOnly: true,
      title: 'Playwright',
      topics: buildPlaywrightPdfNotesTopics(),
      legacyTopics: [
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

  function buildPlaywrightPdfNotesTopics() {
    var items = [
      ['playwright-notes-01', '01. What is Playwright?', 'PDF page 1', [
        'Playwright is an open-source end-to-end testing framework by Microsoft for automating modern web applications reliably and efficiently.',
        'It supports multiple browsers, parallel execution, strong locators, debugging, and test execution features.',
        'Key highlights: fast and reliable execution, cross-browser testing, auto-wait, web-first assertions, easy test maintenance, parallel execution, Trace Viewer, built-in API testing, headed/headless mode, and Codegen.'
      ]],
      ['playwright-notes-02', '02. Why Playwright?', 'PDF page 1', [
        'Playwright is designed for modern web automation, stable tests, and reduced flaky waits.',
        'It supports multiple browsers out of the box, parallel execution, powerful locators, screenshots, videos, traces, and CI/CD integration.'
      ]],
      ['playwright-notes-03', '03. Playwright vs Selenium', 'PDF page 1', [
        'Developer: Playwright is by Microsoft; Selenium is maintained by the Selenium project.',
        'Browsers: Playwright supports Chromium, Firefox, and WebKit directly; Selenium often needs separate browser drivers.',
        'Playwright has built-in auto-wait, faster execution, easier parallel setup, mobile emulation, and built-in API testing; Selenium usually needs more manual setup for these areas.'
      ]],
      ['playwright-notes-04', '04. Playwright Architecture', 'PDF page 1', [
        'Flow: Test Script running on Node.js calls the Playwright library.',
        'Playwright creates isolated browser contexts and drives Chromium, Firefox, and WebKit through browser protocols.',
        'Each test can run in its own Browser Context, giving strong isolation for cookies, local storage, sessions, cache, and permissions.'
      ]],
      ['playwright-notes-05', '05. Supported Browsers', 'PDF page 1', [
        'Supported engines: Chromium for Chrome, Edge, Brave and similar browsers; Firefox; WebKit for Safari-like coverage.',
        'Tests can run in headless mode for automation pipelines or headed mode for visible debugging.'
      ]],
      ['playwright-notes-06', '06. Amazing Features', 'PDF page 1', [
        'Auto-waiting waits for elements to be ready before actions.',
        'Web-first assertions are designed for modern web apps.',
        'Cross-browser execution runs on Chromium, Firefox, and WebKit.',
        'Parallel execution runs multiple tests simultaneously.',
        'Trace Viewer records and inspects test execution step by step.',
        'Codegen generates tests by recording browser actions.'
      ]],
      ['playwright-notes-07', '07. Installation Prerequisites', 'PDF page 2', [
        'Node.js version 18 or higher is recommended.',
        'npm is installed with Node.js.',
        'A code editor such as VS Code is recommended.',
        'Basic JavaScript or TypeScript understanding is required before writing useful tests.'
      ]],
      ['playwright-notes-08', '08. Install Playwright', 'PDF page 2', [
        'Create a project folder, open it in a terminal, and run the Playwright project initializer.',
        'The setup asks whether to use JavaScript or TypeScript, where to store tests, whether to add a GitHub Actions workflow, and whether to install browser binaries.',
        'After setup, install all supported browsers or install Chromium, Firefox, or WebKit individually when needed.'
      ], [
        { title: 'Create a project with the latest version', code: 'mkdir playwright-course\ncd playwright-course\nnpm init playwright@latest', explanation: 'This starts the guided Playwright project setup using the latest available version.', language: 'bash' },
        { title: 'Create a project with a specific version', code: 'npm init playwright@1.62.0', explanation: 'Pin the initializer when the project requires a specific available Playwright version.', language: 'bash' },
        { title: 'Install all browser engines', code: 'npx playwright install', explanation: 'Downloads Chromium, Firefox, and WebKit browser binaries.', language: 'bash' },
        { title: 'Install one browser engine', code: 'npx playwright install chromium\nnpx playwright install firefox\nnpx playwright install webkit', explanation: 'Use an individual command when only one browser engine is required.', language: 'bash' }
      ]],
      ['playwright-notes-09', '09. Verify Installation', 'PDF page 2', [
        'Verify Playwright from terminal with the version command.',
        'If the version displays, installation is successful.',
        'npm installs and manages project packages. npx executes commands supplied by installed Node packages, such as the Playwright CLI.'
      ], [
        { title: 'Verify command', code: 'npx playwright test --version', explanation: 'The version command confirms that the Playwright test runner is available from the current project terminal.', language: 'bash' },
        { title: 'npm installs; npx executes', code: 'npm install\nnpx playwright test', explanation: 'npm install restores dependencies from package.json. npx playwright test executes the Playwright CLI.', language: 'bash' }
      ]],
      ['playwright-notes-10', '10. Folder Structure', 'PDF page 2', [
        'Important folders and files include tests, pages, utils, test-data, playwright.config.ts, package.json, tsconfig.json, and README.md.',
        'tests stores test cases, pages stores Page Object classes, utils stores common helpers, and test-data stores fixtures such as JSON or CSV data.'
      ]],
      ['playwright-notes-11', '11. package.json Scripts', 'PDF page 2', [
        'package.json stores project metadata, dependencies, devDependencies, and useful scripts.',
        'Scripts can run tests in normal mode, UI mode, headed mode, and report viewing mode.'
      ], [{ title: 'Useful scripts', code: '"scripts": {\n  "test": "playwright test",\n  "test:ui": "playwright test --ui",\n  "test:headed": "playwright test --headed",\n  "report": "playwright show-report"\n}', explanation: 'These package scripts give short, memorable commands for common Playwright workflows: normal runs, UI mode, headed debugging, and opening the HTML report.' }]],
      ['playwright-notes-12', '12. Run First Sample Test and Basic Commands', 'PDF page 2', [
        'The first sample test opens a browser and helps confirm that Playwright can generate and run tests successfully.',
        'Basic execution commands include run all tests, run headed, run UI mode, debug, and show report.'
      ], [{ title: 'Basic commands', code: 'npx playwright test\nnpx playwright test --headed\nnpx playwright test --ui\nnpx playwright test --debug\nnpx playwright show-report', explanation: 'Use these commands to run the suite, watch the browser in headed mode, inspect tests in UI mode, debug step by step, and review the generated report.' }]],
      ['playwright-notes-13', '13. playwright.config.ts', 'PDF page 3', [
        'playwright.config.ts is the main configuration file and controls browsers, reporters, timeouts, retries, and project behavior.',
        'Common properties include testDir, timeout, expect timeout, retries, workers, fullyParallel, reporter, use, projects, globalSetup, and globalTeardown.'
      ]],
      ['playwright-notes-14', '14. Config Properties and Project Order', 'PDF page 3', [
        'Projects define multiple browser/device runs such as Desktop Chrome, Desktop Firefox, and Desktop Safari.',
        'Precedence order from highest to lowest: CLI options, environment variables, playwright.config.ts use block, playwright.config.ts top level, and Playwright defaults.',
        'Keep config clean and environment-specific values in environment variables.'
      ]],
      ['playwright-notes-15', '15. Test Creation Basics', 'PDF page 4', [
        'A Playwright test is a small piece of code that verifies a specific functionality.',
        'Basic imports usually come from @playwright/test and include test and expect.',
        'A test contains navigation, actions, and assertions.'
      ], [{ title: 'Basic test structure', code: "import { test, expect } from '@playwright/test';\n\ntest('basic test', async ({ page }) => {\n  await page.goto('https://example.com');\n  await expect(page).toHaveTitle(/Example/);\n});", explanation: 'The import brings in the Playwright test runner and assertion API. The page fixture opens the browser tab, goto navigates, and the web-first assertion verifies the title.' }]],
      ['playwright-notes-16', '16. test.describe, Hooks, Steps and Annotations', 'PDF page 4', [
        'test.describe groups related tests together.',
        'Hooks include beforeAll, beforeEach, afterEach, and afterAll.',
        'test.step improves reporting by splitting a test into readable steps.',
        'Annotations and metadata include skip, only, slow, fail, tag, and timeout adjustments.'
      ]],
      ['playwright-notes-17', '17. Test Lifecycle and Running Specific Tests', 'PDF page 4', [
        'Lifecycle flow includes beforeAll, beforeEach, test body, afterEach, and afterAll.',
        'Specific tests can be run by file, by line, by title using grep, by project, in headed mode, in debug mode, or in UI mode.'
      ]],
      ['playwright-notes-18', '18. Locators - Heart of Playwright', 'PDF page 5', [
        'A locator is Playwright way of finding elements on the page.',
        'Locators are lazy, auto-waiting, resilient, and readable.',
        'Prefer user-facing locators such as role, label, placeholder, text, alt text, title, and test id before CSS or XPath.'
      ]],
      ['playwright-notes-19', '19. Built-in Locators and Chaining', 'PDF pages 5, 11, 19', [
        'Built-in locators include getByRole, getByText, getByLabel, getByPlaceholder, getByAltText, getByTitle, getByTestId, and locator.',
        'Locator chaining narrows a search by combining parent and child locators.',
        'Use first, last, nth, filter, has, hasText, and chained locators to make selectors precise.'
      ]],
      ['playwright-notes-20', '20. Actions in Playwright', 'PDF pages 6, 22', [
        'Actions perform operations on web elements like click, double click, fill, type, press, check, uncheck, selectOption, hover, focus, blur, dragTo, and upload.',
        'Actions auto-wait for elements to be attached, visible, stable, enabled, and ready to receive events.'
      ]],
      ['playwright-notes-21', '21. Assertions in Playwright', 'PDF pages 6, 10, 31-40', [
        'Assertions verify the expected state of the application.',
        'Common assertions include toBeVisible, toBeHidden, toHaveText, toContainText, toHaveAttribute, toHaveURL, toHaveTitle, toHaveCount, toBeChecked, toBeEnabled, and toHaveScreenshot.',
        'Good assertions make tests meaningful and reliable.'
      ]],
      ['playwright-notes-22', '22. Page Object Model (POM)', 'PDF page 7', [
        'POM creates an object repository for page elements and actions.',
        'Benefits include reusable code, clean maintenance, better organization, and reduced duplication.',
        'Common structure: tests, pages, base, utils, and test data.'
      ]],
      ['playwright-notes-23', '23. POM Structure and Page Classes', 'PDF page 7', [
        'A BasePage can hold shared behavior such as navigation and common waits.',
        'Page classes contain locators and page actions for a specific screen, such as LoginPage or DashboardPage.',
        'Tests should use page methods instead of directly repeating locator logic everywhere.'
      ]],
      ['playwright-notes-24', '24. Fixtures in Playwright', 'PDF page 8', [
        'Fixtures provide reusable setup and teardown for tests.',
        'Built-in fixtures include browser, context, page, request, browserName, workerInfo, testInfo, playwright, and baseURL.',
        'Fixtures can be extended to add custom objects such as logged-in pages, test users, or API clients.'
      ]],
      ['playwright-notes-25', '25. Worker Fixtures and Fixture Execution Order', 'PDF page 8', [
        'Worker fixtures run once per worker and are useful for expensive setup.',
        'Fixture execution follows dependency order: global setup, worker fixtures, test fixtures, test body, and teardown.',
        'Best practice: keep fixtures small, focused, reusable, and independent.'
      ]],
      ['playwright-notes-26', '26. Test Data and Data Driven Testing', 'PDF page 9', [
        'Test data is input used to validate application behavior.',
        'Types include valid, invalid, boundary, random, and special data.',
        'Data-driven testing runs the same test with multiple sets of data to improve coverage and reduce duplicate code.'
      ]],
      ['playwright-notes-27', '27. Data Sources and Data Driven Flow', 'PDF page 9', [
        'Data sources include Excel, CSV, JSON, database, and TypeScript or JavaScript arrays.',
        'A typical flow is: read data, loop through each row, run test with current data, generate result, verify expected output, and continue.',
        'Best practices: keep data separate from test code, use meaningful names, avoid hardcoding, validate data, and keep it readable.'
      ]],
      ['playwright-notes-28', '28. Assertion Best Practices and Scalability', 'PDF page 10', [
        'Use web-first assertions, prefer locator-based assertions, use expect.poll for dynamic data, avoid hard waits, use meaningful messages, and assert user-visible behavior.',
        'Scalability patterns include Page Object Model, reusable components, test data handling, environment configs, parallel execution, reports, retry strategy, tagging, visual testing, and mobile testing.'
      ]],
      ['playwright-notes-29', '29. Handling Dynamic Elements', 'PDF page 12', [
        'Dynamic elements have attributes, text, visibility, or presence that changes over time.',
        'Common challenges: elements not visible immediately, loaded after API calls, stale elements, and animations.',
        'Prefer auto-waiting, web-first assertions, explicit waits only when necessary, and network/load waits for API-driven screens.'
      ]],
      ['playwright-notes-30', '30. Frames and iFrames', 'PDF page 13', [
        'An iframe embeds another HTML document inside the current page.',
        'Use frameLocator for stable access to elements inside frames.',
        'Handle nested frames, switch back to default page content, verify frame content, and avoid using contentDocument/contentWindow directly.'
      ]],
      ['playwright-notes-31', '31. Dialogs, Alerts, Confirmations and Prompts', 'PDF pages 14, 29, 39', [
        'Dialog types include alert, confirm, prompt, and beforeunload.',
        'Use page.on("dialog") to handle dialogs, read message, accept, dismiss, or enter prompt text.',
        'Dialogs must be handled before the triggering action, otherwise tests can hang.'
      ]],
      ['playwright-notes-32', '32. Browser in Playwright', 'PDF page 15', [
        'Browser is the entry point for test automation and represents Chromium, Firefox, or WebKit.',
        'Launch options include headless, channel, slowMo, args, timeout, downloadsPath, proxy, devtools, and ignoreHTTPSErrors.',
        'Close or disconnect browser instances cleanly and use CI-friendly headless execution.'
      ]],
      ['playwright-notes-33', '33. Browser Context', 'PDF page 16', [
        'BrowserContext is an isolated browser session similar to a separate browser profile.',
        'Contexts isolate cookies, localStorage, sessionStorage, cache, permissions, viewport, geolocation, and user agent.',
        'Use multiple contexts for isolated users and parallel scenarios.'
      ]],
      ['playwright-notes-34', '34. Page Object (Page) in Playwright', 'PDF page 17', [
        'A Page represents a single tab or popup inside a BrowserContext.',
        'Pages provide APIs for navigation, actions, locators, events, dialogs, downloads, screenshots, and evaluation.',
        'Page properties and methods include url, title, locator, context, mainFrame, goto, click, fill, waitForURL, and close.'
      ]],
      ['playwright-notes-35', '35. Navigation APIs', 'PDF page 18', [
        'Navigation APIs move the page to new URLs and control loading.',
        'Important APIs include goto, goBack, goForward, reload, waitForURL, waitForLoadState, and URL checks.',
        'Load states include domcontentloaded, load, and networkidle. Choose the correct wait based on the application behavior.'
      ]],
      ['playwright-notes-36', '36. Locator Basics and Strategies', 'PDF page 19', [
        'Locators find elements on the page and perform actions or assertions on them.',
        'Recommended strategy order: role, text, label, placeholder, test id, then CSS/XPath when needed.',
        'Good locators are stable, accessible, readable, and maintainable.'
      ]],
      ['playwright-notes-37', '37. Advanced Locators', 'PDF page 20', [
        'Advanced locators handle dynamic lists, nested elements, repeated elements, text matching, and conditional matching.',
        'Use filter, has, hasText, nth, first, last, chaining, text selectors, CSS, XPath, and regular expressions carefully.',
        'Bad locators include brittle absolute paths, changing dynamic ids, and selectors tied to visual layout.'
      ]],
      ['playwright-notes-38', '38. Locator Practical Examples', 'PDF pages 21, 27', [
        'Practical locator examples cover buttons, inputs, labels, placeholders, links, images, titles, test ids, tables, dynamic rows, cards, filters, and search results.',
        'Include positive and negative locator patterns, multi-matching handling, locator chaining, and quick locator cheat sheets.'
      ]],
      ['playwright-notes-39', '39. Keyboard Actions', 'PDF page 23', [
        'Keyboard actions simulate real keyboard input.',
        'Common APIs include press, type, fill, keyboard.press, keyboard.type, keyboard.down, keyboard.up, keyboard.insertText, and keyboard shortcuts.',
        'Use keyboard actions for shortcuts, navigation, forms, editing flows, and special key scenarios.'
      ]],
      ['playwright-notes-40', '40. File Upload and Download', 'PDF page 24', [
        'File upload uses setInputFiles and supports single file, multiple files, and clearing selected files.',
        'Downloads use page.waitForEvent("download") and download.saveAs.',
        'Best practice: store test files in fixtures, wait for download events before clicking, and validate file name or contents when needed.'
      ]],
      ['playwright-notes-41', '41. Mouse Actions', 'PDF page 25', [
        'Mouse actions simulate user behavior such as click, double click, right click, hover, move, down, up, wheel, and drag and drop.',
        'Useful for menus, tooltips, sliders, canvas interactions, drag-drop widgets, and hover-based UI.'
      ]],
      ['playwright-notes-42', '42. Windows and Tabs', 'PDF page 26', [
        'Tabs and windows are new Page objects inside the same BrowserContext.',
        'Use context.waitForEvent("page") or page.waitForEvent("popup") before the click that opens a tab.',
        'Handle multiple tabs, switch between tabs, close tabs, and validate the active page.'
      ]],
      ['playwright-notes-43', '43. Popups', 'PDF page 28', [
        'A popup is a new page created by actions such as clicking links with target blank or window.open.',
        'Handle simple popups, popups with links, JavaScript popups, multiple popups, popup close scenarios, and login popups.',
        'Always wait for the popup event before performing the action that opens it.'
      ]],
      ['playwright-notes-44', '44. Screenshots', 'PDF page 30', [
        'Screenshots capture page or element state and help debugging.',
        'Types include full-page screenshots, element screenshots, viewport screenshots, clipped screenshots, screenshots with masks, and screenshots during failures.',
        'Best practice: store screenshots in organized folders and use them for debugging, reports, and visual evidence.'
      ]],
      ['playwright-notes-45', '45. Videos and Trace', 'PDF page 31', [
        'Videos record browser execution and help debug failures visually.',
        'Trace records actions, snapshots, network, console, errors, and test steps.',
        'Use trace viewer to inspect what happened before, during, and after a failure.'
      ]],
      ['playwright-notes-46', '46. Inspector and Codegen', 'PDF page 32', [
        'Playwright Inspector helps debug tests, inspect locators, pause execution, and step through actions.',
        'Codegen records user actions and generates starter test code.',
        'Best practice: use Codegen as a starting point, then refactor locators and assertions for maintainability.'
      ]],
      ['playwright-notes-47', '47. Introduction to expect', 'PDF page 33', [
        'expect is Playwright assertion API for validating expected behavior.',
        'Use locator assertions, page assertions, API assertions, and generic value assertions.',
        'Assertions auto-retry when used with web-first locator expectations.'
      ]],
      ['playwright-notes-48', '48. Locator Assertions - Part 1', 'PDF page 34', [
        'Locator assertions verify element visibility, hidden state, enabled/disabled state, checked state, text, value, and count.',
        'Use toBeVisible, toBeHidden, toBeEnabled, toBeDisabled, toBeChecked, toHaveText, toContainText, toHaveValue, and toHaveCount.'
      ]],
      ['playwright-notes-49', '49. Locator Assertions - Part 2', 'PDF page 35', [
        'Additional locator assertions verify attributes, CSS, classes, focus, viewport visibility, editable state, empty state, JS properties, and screenshots.',
        'Use locator assertions to validate UI state without manual sleeps.'
      ]],
      ['playwright-notes-50', '50. Locator Assertions - Part 3', 'PDF page 36', [
        'Advanced locator assertions include screenshot comparisons, negative assertions, soft assertions, timeout customization, and combining checks with good messages.',
        'Keep assertions user-focused and avoid asserting implementation details unless necessary.'
      ]],
      ['playwright-notes-51', '51. Page Assertions', 'PDF page 37', [
        'Page assertions verify URL, title, screenshots, and page-level state.',
        'Use toHaveURL, toHaveTitle, toHaveScreenshot, and page-level validations for navigation and whole-page behavior.',
        'Combine page assertions with locator assertions for complete coverage.'
      ]],
      ['playwright-notes-52', '52. API Assertions', 'PDF page 38', [
        'API assertions validate HTTP responses, status codes, headers, JSON body, text body, and response timing.',
        'Use request fixtures for API calls and expect assertions to validate response behavior.',
        'Common checks include status, ok response, JSON fields, arrays, nested objects, and error responses.'
      ]],
      ['playwright-notes-53', '53. Soft Assertions and Poll Assertions', 'PDF page 40', [
        'Soft assertions collect failures and continue execution so multiple issues can be reported together.',
        'expect.poll repeatedly calls a function until an expected condition is met or timeout occurs.',
        'Use poll assertions for eventually consistent values such as status updates or async backend results.'
      ]],
      ['playwright-notes-54', '54. Custom Assertions', 'PDF page 41', [
        'Custom assertions make repeated validation readable and reusable.',
        'Create custom matcher/helper functions for common checks such as menu visibility, dashboard state, table rows, or API contract validation.',
        'Custom assertions improve framework readability when used consistently.'
      ]],
      ['playwright-notes-55', '55. Assertion Patterns and Best Practices', 'PDF page 42', [
        'Common patterns include existence/visibility, text/content, attributes/properties, count/list, navigation/URL, and API assertions.',
        'Best practices: assert what matters, keep assertions focused, avoid hard waits, use meaningful messages, and keep tests independent.',
        'Avoid over-assertion, hardcoded sleeps, testing implementation details, and weak assertions.'
      ]],
      ['playwright-notes-56', '56. Ultimate Assertion Cheat Sheet', 'PDF page 43', [
        'The cheat sheet groups locator assertions, API/response assertions, and general assertions in one quick reference.',
        'It includes visibility, text, value, count, attributes, CSS, screenshots, status, headers, JSON, arrays, objects, and generic value checks.'
      ]],
      ['playwright-notes-57', '57. defineConfig()', 'PDF page 45', [
        'defineConfig is a helper function for writing clean typed Playwright configuration.',
        'It provides type safety, autocomplete, centralized settings, project management, reporter setup, and readable configuration.',
        'Use defineConfig in playwright.config.ts and keep config modular for larger projects.'
      ]],
      ['playwright-notes-58', '58. testDir, testMatch, testIgnore, outputDir, snapshotDir', 'PDF page 46', [
        'testDir tells Playwright where test files are located.',
        'testMatch includes test files by pattern and testIgnore excludes files or folders.',
        'outputDir stores artifacts such as screenshots, videos, and traces.',
        'snapshotDir controls where expected snapshots are stored.'
      ]],
      ['playwright-notes-59', '59. Timeouts', 'PDF page 47', [
        'Timeouts prevent tests from hanging forever and control how long Playwright waits for operations.',
        'Timeout types include test timeout, expect timeout, action timeout, navigation timeout, fixture timeout, hook timeout, and global timeout.',
        'Tune timeouts based on app behavior and avoid hiding performance problems with very large values.'
      ]],
      ['playwright-notes-60', '60. Retries and Workers', 'PDF page 48', [
        'Retries rerun failed tests to reduce temporary failure impact, especially in CI.',
        'Workers control parallel execution and speed.',
        'Use retries carefully, keep tests independent, avoid shared state, and choose worker count based on machine capacity.'
      ]],
      ['playwright-notes-61', '61. use Properties - Part 1 and Part 2', 'PDF pages 49-50', [
        'The use block defines shared context and browser behavior for tests.',
        'Important properties include browserName, headless, channel, viewport, locale, timezoneId, geolocation, permissions, colorScheme, storageState, baseURL, ignoreHTTPSErrors, proxy, extraHTTPHeaders, userAgent, video, screenshot, trace, launchOptions, contextOptions, and action/navigation timeouts.',
        'Use properties should be organized, environment-aware, and easy to override per project.'
      ]],
      ['playwright-notes-62', '62. Reporter Configuration', 'PDF page 51', [
        'Reporters explain test results in different formats.',
        'Common reporters include list, line, dot, HTML, JSON, JUnit, GitHub, blob, and Allure-style reporting integrations.',
        'Configure reporters based on local debugging, CI output, dashboards, and team reporting needs.'
      ]],
      ['playwright-notes-63', '63. Projects - Run Tests Across Browsers, Devices and Environments', 'PDF page 52', [
        'Projects allow the same tests to run on multiple browsers, devices, viewports, and environments.',
        'Use projects for Chromium, Firefox, WebKit, mobile emulation, tablet layouts, branded browsers, smoke/regression groups, and environment-specific setups.',
        'Projects improve coverage and make browser/device execution explicit.'
      ]],
      ['playwright-notes-64', '64. Global Setup and Global Teardown', 'PDF page 53', [
        'Global setup runs once before all tests and global teardown runs once after all tests.',
        'Use global setup for login state creation, database seeding, environment preparation, and shared test prerequisites.',
        'Use global teardown for cleanup, deleting test data, closing external resources, and final reports.'
      ]],
      ['playwright-notes-65', '65. CI/CD Integration', 'PDF page 54', [
        'CI/CD runs Playwright tests automatically on every change or scheduled pipeline.',
        'The notes cover common CI systems such as GitHub Actions, Jenkins, Azure DevOps, GitLab CI, Bitbucket, CircleCI, Travis CI, TeamCity, Bamboo, and Docker-based runs.',
        'Best practice: install dependencies, install browsers, run tests, upload reports/artifacts, keep pipelines reliable, and fail builds on real test failures.'
      ]],
      ['playwright-notes-66', '66. Authentication, Cookies and Storage State', 'Code-first supplement', [
        'Authentication examples show how to save login state once and reuse it across tests.',
        'Cookies, local storage, and session storage are useful for setup, debugging, and validating browser session behavior.',
        'Prefer storageState for repeatable authenticated tests instead of logging in through the UI before every test.'
      ]],
      ['playwright-notes-67', '67. API Testing and CRUD Requests', 'Code-first supplement', [
        'Playwright can test APIs using the request fixture without opening a browser page.',
        'Use API tests for GET, POST, PUT, PATCH, DELETE, setup data, cleanup data, and contract checks.',
        'Always assert status code and important response body fields.'
      ]],
      ['playwright-notes-68', '68. Request Interception and Network Mocking', 'Code-first supplement', [
        'Network interception lets tests observe, block, change, or mock requests.',
        'Use route for controlled test data, failure scenarios, and stable UI tests that should not depend on a live backend.',
        'Keep mocks realistic and close to the API contract.'
      ]],
      ['playwright-notes-69', '69. Mobile Emulation', 'Code-first supplement', [
        'Mobile emulation runs tests with device viewport, user agent, touch settings, and browser options.',
        'Use mobile projects to validate responsive layouts and important mobile workflows.',
        'Run the same core tests across desktop and mobile projects when the user journey should behave the same.'
      ]],
      ['playwright-notes-70', '70. Visual Testing', 'Code-first supplement', [
        'Visual testing compares screenshots against expected baselines.',
        'Use it for stable UI regions where visual regressions matter.',
        'Mask dynamic content and avoid visual checks for constantly changing areas.'
      ]],
      ['playwright-notes-71', '71. Accessibility Testing', 'Code-first supplement', [
        'Accessibility checks validate whether important page elements are usable through roles, labels, names, and keyboard behavior.',
        'Playwright locators encourage accessible selectors such as role and label.',
        'Combine semantic locator checks with keyboard navigation and focused assertions.'
      ]],
      ['playwright-notes-72', '72. Environment Variables', 'Code-first supplement', [
        'Environment variables keep URLs, credentials, feature flags, and CI settings outside test code.',
        'Use them for baseURL, test users, retries, reporters, and environment-specific behavior.',
        'Never commit real passwords, tokens, or production secrets.'
      ]],
      ['playwright-notes-73', '73. Tags, Annotations and Parameterization', 'Code-first supplement', [
        'Tags and annotations organize tests for smoke, regression, slow, flaky, or browser-specific execution.',
        'Parameterization runs the same logic with multiple inputs while keeping tests readable.',
        'Use grep and project filters to run the right tests in local development and CI.'
      ]]
    ];

    var condensedTopics = [
      {
        id: 'playwright-notes-01',
        title: '01. Playwright Introduction and Prerequisites',
        paragraphs: [
          'Playwright is Microsoft open-source framework for reliable end-to-end testing of modern web applications. It provides auto-waiting, web-first assertions, isolated browser contexts, parallel execution, tracing, screenshots, API testing, and Codegen.',
          'Playwright supports JavaScript and TypeScript, Python, Java, and .NET. Its browser engines are Chromium, Firefox, and WebKit, providing coverage for Chrome or Edge-style browsers, Firefox, and Safari-style behavior.',
          'For this JavaScript tutorial, learn basic variables, functions, imports, and async/await. Install Node.js 18 or newer, npm, and a code editor such as VS Code.'
        ],
        practice: '',
        examples: [],
        resources: [],
        ui: [
          { type: 'table', title: 'Beginner Prerequisites', headers: ['Requirement', 'Why it is needed'], rows: [
            ['Node.js 18+', 'Runs JavaScript and Playwright tools'],
            ['npm', 'Installs dependencies; included with Node.js'],
            ['VS Code or another editor', 'Writes and debugs test files'],
            ['Basic JavaScript', 'Variables, functions, imports, and async/await']
          ]},
          { type: 'checklist', title: 'Key Features', items: ['Chromium, Firefox, and WebKit', 'Auto-waiting', 'Web-first assertions', 'Headed and headless modes', 'Parallel execution', 'Trace, screenshots, reports, and Codegen'] }
        ]
      },
      {
        id: 'playwright-notes-02',
        title: '02. Installation and Project Setup',
        paragraphs: [
          'Install Node.js first, then create one project and run the guided Playwright initializer. Choose JavaScript or TypeScript, keep the tests folder, and allow the installer to download browser binaries.',
          'The tests folder contains test files. playwright.config.js or playwright.config.ts stores runner settings. package.json records dependencies and scripts. package-lock.json locks installed versions. test-results and playwright-report contain generated artifacts.',
          'Run the version command once to confirm that the Playwright test runner is available. Installation commands appear only in this topic.'
        ],
        practice: '',
        examples: [
          { title: 'Create and install the project', code: 'node --version\nnpm --version\nmkdir playwright-course\ncd playwright-course\nnpm init playwright@latest', explanation: 'The guided initializer installs Playwright Test, creates the starter project, and can download the browser binaries.', language: 'bash' },
          { title: 'Verify installation', code: 'npx playwright test --version', explanation: 'A displayed version confirms that the project can run the Playwright CLI.', language: 'bash' }
        ],
        resources: [],
        ui: [
          { type: 'table', title: 'Important Project Files', headers: ['Path', 'Purpose'], rows: [
            ['tests/', 'Playwright test files'],
            ['playwright.config.ts or .js', 'Browsers, timeouts, reporters, and shared options'],
            ['package.json', 'Dependencies and project scripts'],
            ['package-lock.json', 'Locked dependency versions'],
            ['test-results/', 'Run artifacts such as traces and screenshots'],
            ['playwright-report/', 'Generated HTML report']
          ]}
        ]
      },
      {
        id: 'playwright-notes-03',
        title: '03. First Playwright Test',
        paragraphs: [
          'A test imports test and expect from @playwright/test. test defines the scenario, page represents an isolated browser tab, and expect verifies the result.',
          'The usual flow is navigation, browser actions, and an assertion. Actions and web-first assertions wait for the page to become ready.'
        ],
        practice: '',
        examples: [
          { title: 'tests/example.spec.js', code: "import { test, expect } from '@playwright/test';\n\ntest('verify Google title', async ({ page }) => {\n  await page.goto('https://www.google.com/');\n  await expect(page).toHaveTitle(/Google/);\n});", explanation: 'page.goto() opens the website and toHaveTitle() verifies its title.', language: 'javascript' },
          { title: 'Basic browser action', code: "await page.getByRole('link', { name: 'About' }).click();", explanation: 'A locator finds a user-visible element and click() performs the action. Detailed locator lessons come later.', language: 'javascript' }
        ],
        resources: [],
        ui: [
          { type: 'flow', title: 'Test Structure', steps: ['Import test and expect', 'Define the test', 'Open a page', 'Perform an action', 'Assert the result'] }
        ]
      },
      {
        id: 'playwright-notes-04',
        title: '04. Running and Debugging Tests',
        paragraphs: [
          'Playwright runs headlessly by default. Use headed mode to watch the browser, target one file for a focused run, and use debug mode to open Playwright Inspector.',
          'Open the HTML report to review results and failure details. These are the essential beginner commands.'
        ],
        practice: '',
        examples: [
          { title: 'Essential commands', code: 'npx playwright test\nnpx playwright test --headed\nnpx playwright test tests/example.spec.js\nnpx playwright test --debug\nnpx playwright show-report', explanation: 'Run the full suite, watch the browser, run one file, debug step by step, or open the latest HTML report.', language: 'bash' }
        ],
        resources: [],
        ui: [
          { type: 'table', title: 'Command Purpose', headers: ['Command', 'Purpose'], rows: [
            ['npx playwright test', 'Run all tests headlessly'],
            ['npx playwright test --headed', 'Run with a visible browser'],
            ['npx playwright test tests/example.spec.js', 'Run one test file'],
            ['npx playwright test --debug', 'Open Playwright Inspector'],
            ['npx playwright show-report', 'Open the HTML report']
          ]}
        ]
      }
    ];

    var replacementTopics = Array.isArray(window.TestNovaPlaywrightCurriculum)
      ? window.TestNovaPlaywrightCurriculum
      : [];

    var retainedTopics = replacementTopics.map(function(topic, index) {
      var number = index + condensedTopics.length + 1;
      var copy = Object.assign({}, topic);
      copy.id = 'playwright-notes-' + String(number).padStart(2, '0');
      copy.title = String(number).padStart(2, '0') + '. ' + displayTopicTitle(topic);
      return copy;
    });

    return condensedTopics.concat(retainedTopics);
  }

  function codeBlock(lines) {
    return lines.join('\n');
  }

  function playwrightExample(title, lines, language) {
    return {
      title: title,
      code: codeBlock(lines),
      language: language || 'ts',
      explanation: 'This example uses Playwright Test with async/await and keeps the action close to the assertion so the test remains readable and runnable.'
    };
  }

  function playwrightPdfExampleCatalog() {
    return {
      'playwright-notes-01': [
        playwrightExample('Minimal Playwright test', [
          'import { test, expect } from "@playwright/test"',
          '',
          'test("homepage has expected title", async ({ page }) => {',
          '  await page.goto("https://example.com")',
          '  await expect(page).toHaveTitle(/Example/)',
          '})'
        ])
      ],
      'playwright-notes-02': [
        playwrightExample('Auto-waiting and web-first assertion', [
          'import { test, expect } from "@playwright/test"',
          '',
          'test("login button is ready for the user", async ({ page }) => {',
          '  await page.goto("/login")',
          '  await page.getByRole("button", { name: "Login" }).click()',
          '  await expect(page.getByText("Welcome")).toBeVisible()',
          '})'
        ])
      ],
      'playwright-notes-03': [
        playwrightExample('Playwright style locator instead of driver setup', [
          'import { test, expect } from "@playwright/test"',
          '',
          'test("uses built-in browser and locator support", async ({ page }) => {',
          '  await page.goto("/products")',
          '  await page.getByRole("link", { name: "Products" }).click()',
          '  await expect(page.getByRole("heading", { name: "Products" })).toBeVisible()',
          '})'
        ])
      ],
      'playwright-notes-04': [
        playwrightExample('Browser context isolation', [
          'import { test, expect } from "@playwright/test"',
          '',
          'test("two users stay isolated", async ({ browser }) => {',
          '  const adminContext = await browser.newContext()',
          '  const buyerContext = await browser.newContext()',
          '  const adminPage = await adminContext.newPage()',
          '  const buyerPage = await buyerContext.newPage()',
          '',
          '  await adminPage.goto("/login")',
          '  await buyerPage.goto("/login")',
          '',
          '  await expect(adminPage).toHaveURL(/login/)',
          '  await expect(buyerPage).toHaveURL(/login/)',
          '',
          '  await adminContext.close()',
          '  await buyerContext.close()',
          '})'
        ])
      ],
      'playwright-notes-05': [
        playwrightExample('Cross-browser projects', [
          'import { defineConfig, devices } from "@playwright/test"',
          '',
          'export default defineConfig({',
          '  projects: [',
          '    { name: "chromium", use: { ...devices["Desktop Chrome"] } },',
          '    { name: "firefox", use: { ...devices["Desktop Firefox"] } },',
          '    { name: "webkit", use: { ...devices["Desktop Safari"] } }',
          '  ]',
          '})'
        ])
      ],
      'playwright-notes-06': [
        playwrightExample('Trace, screenshot and video features', [
          'import { defineConfig } from "@playwright/test"',
          '',
          'export default defineConfig({',
          '  use: {',
          '    trace: "on-first-retry",',
          '    screenshot: "only-on-failure",',
          '    video: "retain-on-failure"',
          '  }',
          '})'
        ])
      ],
      'playwright-notes-07': [
        playwrightExample('Prerequisite checks', [
          'node -v',
          'npm -v',
          'npx playwright --version'
        ], 'bash')
      ],
      'playwright-notes-08': [
        playwrightExample('Recommended project setup', [
          'mkdir playwright-course',
          'cd playwright-course',
          'npm init -y',
          'npm init playwright@latest',
          'npx playwright install'
        ], 'bash')
      ],
      'playwright-notes-09': [
        playwrightExample('Verify generated sample tests', [
          'npx playwright test',
          'npx playwright show-report',
          'npx playwright test --ui'
        ], 'bash')
      ],
      'playwright-notes-10': [
        playwrightExample('Practical folder structure', [
          'playwright-course/',
          '  tests/',
          '    login.spec.ts',
          '  pages/',
          '    LoginPage.ts',
          '  utils/',
          '    testData.ts',
          '  test-data/',
          '    users.json',
          '  playwright.config.ts',
          '  package.json',
          '  tsconfig.json'
        ], 'text')
      ],
      'playwright-notes-11': [
        playwrightExample('package.json scripts', [
          '{',
          '  "scripts": {',
          '    "test": "playwright test",',
          '    "test:ui": "playwright test --ui",',
          '    "test:headed": "playwright test --headed",',
          '    "test:debug": "playwright test --debug",',
          '    "report": "playwright show-report"',
          '  }',
          '}'
        ], 'json')
      ],
      'playwright-notes-12': [
        playwrightExample('Run commands by need', [
          'npx playwright test',
          'npx playwright test tests/login.spec.ts',
          'npx playwright test --headed',
          'npx playwright test --debug',
          'npx playwright test --project=chromium',
          'npx playwright show-report'
        ], 'bash')
      ],
      'playwright-notes-13': [
        playwrightExample('Complete starter config', [
          'import { defineConfig, devices } from "@playwright/test"',
          '',
          'export default defineConfig({',
          '  testDir: "./tests",',
          '  timeout: 30_000,',
          '  expect: { timeout: 5_000 },',
          '  retries: process.env.CI ? 2 : 0,',
          '  workers: process.env.CI ? 2 : undefined,',
          '  reporter: [["html"], ["list"]],',
          '  use: {',
          '    baseURL: "http://localhost:4200",',
          '    trace: "on-first-retry"',
          '  },',
          '  projects: [',
          '    { name: "chromium", use: { ...devices["Desktop Chrome"] } }',
          '  ]',
          '})'
        ])
      ],
      'playwright-notes-14': [
        playwrightExample('CLI override example', [
          'npx playwright test --project=firefox --headed --workers=1'
        ], 'bash')
      ],
      'playwright-notes-15': [
        playwrightExample('Test with navigation, action and assertion', [
          'import { test, expect } from "@playwright/test"',
          '',
          'test("user can search", async ({ page }) => {',
          '  await page.goto("/products")',
          '  await page.getByPlaceholder("Search").fill("phone")',
          '  await page.getByRole("button", { name: "Search" }).click()',
          '  await expect(page.getByText("Search results")).toBeVisible()',
          '})'
        ])
      ],
      'playwright-notes-16': [
        playwrightExample('describe, hooks, steps and annotations', [
          'import { test, expect } from "@playwright/test"',
          '',
          'test.describe("Login", () => {',
          '  test.beforeEach(async ({ page }) => {',
          '    await page.goto("/login")',
          '  })',
          '',
          '  test("@smoke valid user logs in", async ({ page }) => {',
          '    await test.step("Submit credentials", async () => {',
          '      await page.getByLabel("Username").fill("standard_user")',
          '      await page.getByLabel("Password").fill("secret_sauce")',
          '      await page.getByRole("button", { name: "Login" }).click()',
          '    })',
          '',
          '    await expect(page.getByText("Dashboard")).toBeVisible()',
          '  })',
          '})'
        ])
      ],
      'playwright-notes-17': [
        playwrightExample('Run specific tests', [
          'npx playwright test tests/login.spec.ts',
          'npx playwright test tests/login.spec.ts:12',
          'npx playwright test --grep "@smoke"',
          'npx playwright test --project=chromium',
          'npx playwright test --ui'
        ], 'bash')
      ],
      'playwright-notes-18': [
        playwrightExample('Locator basics', [
          'await page.getByRole("button", { name: "Submit" }).click()',
          'await page.getByLabel("Email").fill("qa@example.com")',
          'await page.getByPlaceholder("Search").fill("Playwright")',
          'await page.getByText("Order placed").click()',
          'await page.getByTestId("checkout-button").click()'
        ])
      ],
      'playwright-notes-19': [
        playwrightExample('Locator chaining and filtering', [
          'const productCard = page.getByRole("listitem").filter({ hasText: "Laptop" })',
          'await productCard.getByRole("button", { name: "Add to cart" }).click()',
          'await expect(productCard.getByText("In stock")).toBeVisible()'
        ])
      ],
      'playwright-notes-20': [
        playwrightExample('Common element actions', [
          'import { test, expect } from "@playwright/test"',
          '',
          'test("form actions", async ({ page }) => {',
          '  await page.goto("/registration")',
          '  await page.getByLabel("Name").fill("Asha QA")',
          '  await page.getByLabel("Email").fill("asha@example.com")',
          '  await page.getByLabel("Subscribe").check()',
          '  await page.getByLabel("Country").selectOption("IN")',
          '  await page.getByRole("button", { name: "Submit" }).click()',
          '  await expect(page.getByText("Registration successful")).toBeVisible()',
          '})'
        ]),
        playwrightExample('Keyboard, hover and double click', [
          'await page.getByLabel("Search").fill("playwright")',
          'await page.getByLabel("Search").press("Enter")',
          'await page.getByRole("button", { name: "More" }).hover()',
          'await page.getByText("Advanced options").dblclick()'
        ])
      ],
      'playwright-notes-21': [
        playwrightExample('Common assertions', [
          'await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible()',
          'await expect(page).toHaveURL(/dashboard/)',
          'await expect(page.getByTestId("cart-count")).toHaveText("1")',
          'await expect(page.getByRole("button", { name: "Pay" })).toBeEnabled()'
        ])
      ],
      'playwright-notes-22': [
        playwrightExample('POM test usage', [
          'import { test, expect } from "@playwright/test"',
          'import { LoginPage } from "../pages/LoginPage"',
          '',
          'test("login using page object", async ({ page }) => {',
          '  const loginPage = new LoginPage(page)',
          '  await loginPage.open()',
          '  await loginPage.login("standard_user", "secret_sauce")',
          '  await expect(page.getByText("Dashboard")).toBeVisible()',
          '})'
        ])
      ],
      'playwright-notes-23': [
        playwrightExample('Login page class', [
          'import { Page } from "@playwright/test"',
          '',
          'export class LoginPage {',
          '  constructor(private page: Page) {}',
          '',
          '  async open() {',
          '    await this.page.goto("/login")',
          '  }',
          '',
          '  async login(username: string, password: string) {',
          '    await this.page.getByLabel("Username").fill(username)',
          '    await this.page.getByLabel("Password").fill(password)',
          '    await this.page.getByRole("button", { name: "Login" }).click()',
          '  }',
          '}'
        ])
      ],
      'playwright-notes-24': [
        playwrightExample('Custom fixture', [
          'import { test as base } from "@playwright/test"',
          'import { LoginPage } from "../pages/LoginPage"',
          '',
          'type Fixtures = { loginPage: LoginPage }',
          '',
          'export const test = base.extend<Fixtures>({',
          '  loginPage: async ({ page }, use) => {',
          '    await use(new LoginPage(page))',
          '  }',
          '})',
          '',
          'export { expect } from "@playwright/test"'
        ])
      ],
      'playwright-notes-25': [
        playwrightExample('Worker-scoped fixture', [
          'import { test as base } from "@playwright/test"',
          '',
          'export const test = base.extend<{}, { account: string }>({',
          '  account: [async ({}, use) => {',
          '    const account = "worker-user@example.com"',
          '    await use(account)',
          '  }, { scope: "worker" }]',
          '})'
        ])
      ],
      'playwright-notes-26': [
        playwrightExample('Data-driven array', [
          'const users = [',
          '  { username: "valid_user", password: "Pass@123", expected: "Dashboard" },',
          '  { username: "locked_user", password: "Pass@123", expected: "Locked" }',
          ']',
          '',
          'for (const user of users) {',
          '  test(`login check for ${user.username}`, async ({ page }) => {',
          '    await page.goto("/login")',
          '    await page.getByLabel("Username").fill(user.username)',
          '    await page.getByLabel("Password").fill(user.password)',
          '    await page.getByRole("button", { name: "Login" }).click()',
          '    await expect(page.getByText(user.expected)).toBeVisible()',
          '  })',
          '}'
        ])
      ],
      'playwright-notes-27': [
        playwrightExample('Read JSON test data', [
          'import users from "../test-data/users.json"',
          '',
          'for (const user of users) {',
          '  test(`data row: ${user.username}`, async ({ page }) => {',
          '    await page.goto("/login")',
          '    await page.getByLabel("Username").fill(user.username)',
          '    await page.getByLabel("Password").fill(user.password)',
          '  })',
          '}'
        ])
      ],
      'playwright-notes-28': [
        playwrightExample('Web-first assertion instead of hard wait', [
          '// Avoid: await page.waitForTimeout(5000)',
          'await page.getByRole("button", { name: "Save" }).click()',
          'await expect(page.getByText("Saved successfully")).toBeVisible()'
        ])
      ],
      'playwright-notes-29': [
        playwrightExample('Dynamic element handling', [
          'await page.getByRole("button", { name: "Load users" }).click()',
          'const row = page.getByRole("row").filter({ hasText: "Asha QA" })',
          'await expect(row).toBeVisible()',
          'await expect(row.getByText("Active")).toBeVisible()'
        ])
      ],
      'playwright-notes-30': [
        playwrightExample('Frame locator', [
          'const paymentFrame = page.frameLocator("iframe[name=\\"payment\\"]")',
          'await paymentFrame.getByLabel("Card number").fill("4111111111111111")',
          'await paymentFrame.getByLabel("Expiry").fill("12/30")',
          'await paymentFrame.getByRole("button", { name: "Pay" }).click()'
        ])
      ],
      'playwright-notes-31': [
        playwrightExample('Handle alert, confirm and prompt', [
          'page.on("dialog", async dialog => {',
          '  console.log(dialog.message())',
          '  if (dialog.type() === "prompt") {',
          '    await dialog.accept("Playwright")',
          '  } else {',
          '    await dialog.accept()',
          '  }',
          '})',
          '',
          'await page.getByRole("button", { name: "Open dialog" }).click()'
        ])
      ],
      'playwright-notes-32': [
        playwrightExample('Manual browser launch', [
          'import { chromium } from "@playwright/test"',
          '',
          'const browser = await chromium.launch({ headless: false, slowMo: 100 })',
          'const page = await browser.newPage()',
          'await page.goto("https://example.com")',
          'await browser.close()'
        ])
      ],
      'playwright-notes-33': [
        playwrightExample('Context with permissions and viewport', [
          'const context = await browser.newContext({',
          '  viewport: { width: 390, height: 844 },',
          '  geolocation: { latitude: 28.6139, longitude: 77.2090 },',
          '  permissions: ["geolocation"]',
          '})',
          '',
          'const page = await context.newPage()',
          'await page.goto("/nearby-stores")'
        ])
      ],
      'playwright-notes-34': [
        playwrightExample('Page object APIs', [
          'await page.goto("/dashboard")',
          'console.log(await page.title())',
          'console.log(page.url())',
          'await page.locator("#refresh").click()',
          'await page.waitForURL(/dashboard/)',
          'await page.close()'
        ])
      ],
      'playwright-notes-35': [
        playwrightExample('Navigation flow', [
          'await page.goto("/products", { waitUntil: "domcontentloaded" })',
          'await page.getByRole("link", { name: "Details" }).click()',
          'await page.waitForURL(/products\\/\\d+/)',
          'await page.goBack()',
          'await page.reload()',
          'await page.waitForLoadState("load")'
        ])
      ],
      'playwright-notes-36': [
        playwrightExample('Stable locator strategy', [
          'await page.getByRole("button", { name: "Login" }).click()',
          'await page.getByLabel("Password").fill("secret_sauce")',
          'await page.getByTestId("cart-count").click()',
          '',
          '// Use CSS only when user-facing locators are not enough.',
          'await page.locator("[data-status=\\"active\\"]").click()'
        ])
      ],
      'playwright-notes-37': [
        playwrightExample('Advanced filtering', [
          'const activeUserRow = page',
          '  .getByRole("row")',
          '  .filter({ hasText: "Asha QA" })',
          '  .filter({ has: page.getByText("Active") })',
          '',
          'await activeUserRow.getByRole("button", { name: "Edit" }).click()'
        ])
      ],
      'playwright-notes-38': [
        playwrightExample('Table row locator', [
          'const row = page.getByRole("row").filter({ hasText: "Order-1001" })',
          'await expect(row.getByText("Paid")).toBeVisible()',
          'await row.getByRole("button", { name: "View" }).click()'
        ])
      ],
      'playwright-notes-39': [
        playwrightExample('Keyboard shortcuts', [
          'await page.getByLabel("Description").fill("Old value")',
          'await page.getByLabel("Description").press("ControlOrMeta+A")',
          'await page.keyboard.type("New value")',
          'await page.keyboard.press("Tab")',
          'await page.keyboard.press("Enter")'
        ])
      ],
      'playwright-notes-40': [
        playwrightExample('Upload and download', [
          'await page.getByLabel("Upload resume").setInputFiles("test-data/resume.pdf")',
          '',
          'const downloadPromise = page.waitForEvent("download")',
          'await page.getByRole("button", { name: "Download report" }).click()',
          'const download = await downloadPromise',
          'await download.saveAs("test-results/report.pdf")'
        ])
      ],
      'playwright-notes-41': [
        playwrightExample('Mouse actions', [
          'await page.getByRole("menuitem", { name: "Settings" }).hover()',
          'await page.getByText("Advanced").click()',
          'await page.getByText("Canvas item").click({ button: "right" })',
          'await page.locator("#source").dragTo(page.locator("#target"))'
        ])
      ],
      'playwright-notes-42': [
        playwrightExample('New tab from context', [
          'const pagePromise = context.waitForEvent("page")',
          'await page.getByRole("link", { name: "Open docs" }).click()',
          'const newPage = await pagePromise',
          'await newPage.waitForLoadState()',
          'await expect(newPage).toHaveURL(/docs/)',
          'await newPage.close()'
        ])
      ],
      'playwright-notes-43': [
        playwrightExample('Popup handling', [
          'const popupPromise = page.waitForEvent("popup")',
          'await page.getByRole("button", { name: "Open invoice" }).click()',
          'const popup = await popupPromise',
          'await popup.waitForLoadState("domcontentloaded")',
          'await expect(popup.getByRole("heading", { name: "Invoice" })).toBeVisible()'
        ])
      ],
      'playwright-notes-44': [
        playwrightExample('Screenshot examples', [
          'await page.screenshot({ path: "test-results/home.png", fullPage: true })',
          'await page.getByTestId("invoice").screenshot({ path: "test-results/invoice.png" })',
          'await page.screenshot({',
          '  path: "test-results/masked.png",',
          '  mask: [page.getByTestId("customer-email")]',
          '})'
        ])
      ],
      'playwright-notes-45': [
        playwrightExample('Trace and video config', [
          'import { defineConfig } from "@playwright/test"',
          '',
          'export default defineConfig({',
          '  use: {',
          '    trace: "on-first-retry",',
          '    video: "retain-on-failure"',
          '  }',
          '})',
          '',
          '// Open trace:',
          '// npx playwright show-trace trace.zip'
        ])
      ],
      'playwright-notes-46': [
        playwrightExample('Inspector and codegen commands', [
          'npx playwright test --debug',
          'npx playwright codegen https://example.com',
          'PWDEBUG=1 npx playwright test tests/login.spec.ts'
        ], 'bash')
      ],
      'playwright-notes-47': [
        playwrightExample('expect categories', [
          'await expect(page.getByText("Saved")).toBeVisible()',
          'await expect(page).toHaveTitle(/Dashboard/)',
          'expect(response.status()).toBe(200)',
          'expect(["admin", "viewer"]).toContain("admin")'
        ])
      ],
      'playwright-notes-48': [
        playwrightExample('Locator assertions part 1', [
          'await expect(page.getByRole("button", { name: "Save" })).toBeVisible()',
          'await expect(page.getByLabel("Email")).toHaveValue("qa@example.com")',
          'await expect(page.getByRole("checkbox", { name: "Accept" })).toBeChecked()',
          'await expect(page.getByRole("listitem")).toHaveCount(3)'
        ])
      ],
      'playwright-notes-49': [
        playwrightExample('Locator assertions part 2', [
          'await expect(page.getByTestId("status")).toHaveAttribute("data-state", "active")',
          'await expect(page.getByRole("button", { name: "Save" })).toHaveCSS("cursor", "pointer")',
          'await expect(page.getByLabel("Search")).toBeFocused()',
          'await expect(page.getByTestId("empty-state")).toBeEmpty()'
        ])
      ],
      'playwright-notes-50': [
        playwrightExample('Negative and timeout assertions', [
          'await expect(page.getByText("Loading")).toBeHidden({ timeout: 10_000 })',
          'await expect(page.getByText("Error")).not.toBeVisible()',
          'await expect(page.getByTestId("receipt")).toHaveScreenshot("receipt.png")'
        ])
      ],
      'playwright-notes-51': [
        playwrightExample('Page assertions', [
          'await page.goto("/dashboard")',
          'await expect(page).toHaveURL(/dashboard/)',
          'await expect(page).toHaveTitle(/Dashboard/)',
          'await expect(page).toHaveScreenshot("dashboard.png")'
        ])
      ],
      'playwright-notes-52': [
        playwrightExample('API assertions', [
          'const response = await request.get("/api/users/1")',
          'expect(response.ok()).toBeTruthy()',
          'expect(response.status()).toBe(200)',
          'expect(response.headers()["content-type"]).toContain("application/json")',
          'const body = await response.json()',
          'expect(body.id).toBe(1)'
        ])
      ],
      'playwright-notes-53': [
        playwrightExample('Soft and poll assertions', [
          'await expect.soft(page.getByText("Profile")).toBeVisible()',
          'await expect.soft(page.getByText("Settings")).toBeVisible()',
          '',
          'await expect.poll(async () => {',
          '  const response = await page.request.get("/api/job-status")',
          '  return (await response.json()).status',
          '}).toBe("completed")'
        ])
      ],
      'playwright-notes-54': [
        playwrightExample('Reusable custom assertion helper', [
          'import { expect, Locator } from "@playwright/test"',
          '',
          'export async function expectToast(toast: Locator, message: string) {',
          '  await expect(toast).toBeVisible()',
          '  await expect(toast).toContainText(message)',
          '}'
        ])
      ],
      'playwright-notes-55': [
        playwrightExample('Focused assertion pattern', [
          'await page.getByRole("button", { name: "Place order" }).click()',
          'await expect(page.getByRole("heading", { name: "Order confirmed" })).toBeVisible()',
          'await expect(page.getByTestId("order-id")).toContainText("ORD-")'
        ])
      ],
      'playwright-notes-56': [
        playwrightExample('Assertion cheat sheet sample', [
          'await expect(locator).toBeVisible()',
          'await expect(locator).toHaveText("Saved")',
          'await expect(locator).toHaveCount(3)',
          'await expect(page).toHaveURL(/checkout/)',
          'expect(response.status()).toBe(200)',
          'expect(value).toEqual({ active: true })'
        ])
      ],
      'playwright-notes-57': [
        playwrightExample('defineConfig typed setup', [
          'import { defineConfig } from "@playwright/test"',
          '',
          'export default defineConfig({',
          '  testDir: "./tests",',
          '  fullyParallel: true,',
          '  reporter: "html"',
          '})'
        ])
      ],
      'playwright-notes-58': [
        playwrightExample('Test file matching config', [
          'import { defineConfig } from "@playwright/test"',
          '',
          'export default defineConfig({',
          '  testDir: "./tests",',
          '  testMatch: ["**/*.spec.ts"],',
          '  testIgnore: ["**/*.manual.spec.ts"],',
          '  outputDir: "test-results",',
          '  snapshotDir: "snapshots"',
          '})'
        ])
      ],
      'playwright-notes-59': [
        playwrightExample('Timeout configuration', [
          'import { defineConfig } from "@playwright/test"',
          '',
          'export default defineConfig({',
          '  timeout: 30_000,',
          '  globalTimeout: 60 * 60 * 1000,',
          '  expect: { timeout: 5_000 },',
          '  use: {',
          '    actionTimeout: 10_000,',
          '    navigationTimeout: 15_000',
          '  }',
          '})'
        ])
      ],
      'playwright-notes-60': [
        playwrightExample('Retries and workers config', [
          'import { defineConfig } from "@playwright/test"',
          '',
          'export default defineConfig({',
          '  retries: process.env.CI ? 2 : 0,',
          '  workers: process.env.CI ? 2 : undefined,',
          '  fullyParallel: true',
          '})'
        ])
      ],
      'playwright-notes-61': [
        playwrightExample('use block with common properties', [
          'import { defineConfig } from "@playwright/test"',
          '',
          'export default defineConfig({',
          '  use: {',
          '    baseURL: "https://qa.example.com",',
          '    headless: true,',
          '    viewport: { width: 1280, height: 720 },',
          '    ignoreHTTPSErrors: true,',
          '    screenshot: "only-on-failure",',
          '    trace: "retain-on-failure"',
          '  }',
          '})'
        ])
      ],
      'playwright-notes-62': [
        playwrightExample('Multiple reporters', [
          'import { defineConfig } from "@playwright/test"',
          '',
          'export default defineConfig({',
          '  reporter: [',
          '    ["list"],',
          '    ["html", { open: "never" }],',
          '    ["junit", { outputFile: "test-results/results.xml" }]',
          '  ]',
          '})'
        ])
      ],
      'playwright-notes-63': [
        playwrightExample('Projects for browsers and mobile', [
          'import { defineConfig, devices } from "@playwright/test"',
          '',
          'export default defineConfig({',
          '  projects: [',
          '    { name: "chromium", use: { ...devices["Desktop Chrome"] } },',
          '    { name: "firefox", use: { ...devices["Desktop Firefox"] } },',
          '    { name: "mobile-chrome", use: { ...devices["Pixel 5"] } }',
          '  ]',
          '})'
        ])
      ],
      'playwright-notes-64': [
        playwrightExample('Global setup and teardown config', [
          'import { defineConfig } from "@playwright/test"',
          '',
          'export default defineConfig({',
          '  globalSetup: require.resolve("./global-setup"),',
          '  globalTeardown: require.resolve("./global-teardown")',
          '})'
        ]),
        playwrightExample('Save login state in global setup', [
          'import { chromium } from "@playwright/test"',
          '',
          'export default async function globalSetup() {',
          '  const browser = await chromium.launch()',
          '  const page = await browser.newPage()',
          '  await page.goto("https://qa.example.com/login")',
          '  await page.getByLabel("Username").fill("admin")',
          '  await page.getByLabel("Password").fill("secret")',
          '  await page.getByRole("button", { name: "Login" }).click()',
          '  await page.context().storageState({ path: "storage/auth.json" })',
          '  await browser.close()',
          '}'
        ])
      ],
      'playwright-notes-65': [
        playwrightExample('GitHub Actions workflow', [
          'name: Playwright Tests',
          'on: [push, pull_request]',
          'jobs:',
          '  test:',
          '    runs-on: ubuntu-latest',
          '    steps:',
          '      - uses: actions/checkout@v4',
          '      - uses: actions/setup-node@v4',
          '        with:',
          '          node-version: 20',
          '      - run: npm ci',
          '      - run: npx playwright install --with-deps',
          '      - run: npx playwright test',
          '      - uses: actions/upload-artifact@v4',
          '        if: always()',
          '        with:',
          '          name: playwright-report',
          '          path: playwright-report/'
        ], 'yaml')
      ]
    };
  }

  function playwrightCodeFirstSupplementExamples(topic) {
    var id = topic.id;
    var number = parseInt(String(id).replace('playwright-notes-', ''), 10);
    var examples = [];

    function add(title, lines, language) {
      examples.push(playwrightExample(title, lines, language));
    }

    if (number <= 7) {
      add('tests/basic-smoke.spec.ts - Runnable smoke test', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("basic browser automation smoke test", async ({ page }) => {',
        '  await page.goto("https://example.com")',
        '  await expect(page.getByRole("heading", { name: "Example Domain" })).toBeVisible()',
        '  await expect(page).toHaveURL(/example\\.com/)',
        '})'
      ]);
      add('Common mistake and corrected setup command', [
        '# Incorrect: running tests before installing browsers',
        'npx playwright test',
        '',
        '# Correct: install dependencies and browser binaries first',
        'npm install -D @playwright/test',
        'npx playwright install',
        'npx playwright test'
      ], 'bash');
    } else if (number <= 14) {
      add('playwright.config.ts - Practical setup', [
        'import { defineConfig, devices } from "@playwright/test"',
        '',
        'export default defineConfig({',
        '  testDir: "./tests",',
        '  timeout: 30_000,',
        '  expect: { timeout: 5_000 },',
        '  reporter: [["list"], ["html", { open: "never" }]],',
        '  use: {',
        '    baseURL: "https://example.com",',
        '    trace: "on-first-retry"',
        '  },',
        '  projects: [',
        '    { name: "chromium", use: { ...devices["Desktop Chrome"] } }',
        '  ]',
        '})'
      ]);
      add('tests/first-test.spec.ts - Verify setup works', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("opens the configured base URL", async ({ page }) => {',
        '  await page.goto("/")',
        '  await expect(page).toHaveTitle(/Example/)',
        '})'
      ]);
    } else if (number <= 17) {
      add('tests/hooks-and-steps.spec.ts - Practical test structure', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test.describe("Search flow", () => {',
        '  test.beforeEach(async ({ page }) => {',
        '    await page.goto("https://example.com")',
        '  })',
        '',
        '  test("uses steps for readable reporting", async ({ page }) => {',
        '    await test.step("Verify heading", async () => {',
        '      await expect(page.getByRole("heading", { name: "Example Domain" })).toBeVisible()',
        '    })',
        '  })',
        '})'
      ]);
      add('Common mistake: missing await', [
        '// Incorrect: assertion may run before navigation finishes',
        'page.goto("https://example.com")',
        'expect(page).toHaveTitle(/Example/)',
        '',
        '// Correct',
        'await page.goto("https://example.com")',
        'await expect(page).toHaveTitle(/Example/)'
      ]);
    } else if ((number >= 18 && number <= 20) || (number >= 36 && number <= 38)) {
      add('tests/locators-and-actions.spec.ts - Practical website example', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("complete form interaction with strong locators", async ({ page }) => {',
        '  await page.goto("/registration_form.html")',
        '  await page.getByLabel("Full Name").fill("Asha QA")',
        '  await page.getByLabel("Email").fill("asha@example.com")',
        '  await page.getByRole("button", { name: "Submit" }).click()',
        '  await expect(page.getByText("Thank you")).toBeVisible()',
        '})'
      ]);
      add('Common mistake: brittle selector vs user-facing locator', [
        '// Incorrect: depends on layout and class names',
        'await page.locator("div:nth-child(3) > button.btn").click()',
        '',
        '// Correct: describes the user-facing control',
        'await page.getByRole("button", { name: "Submit" }).click()'
      ]);
    } else if (number === 21 || (number >= 47 && number <= 56)) {
      add('tests/assertions.spec.ts - Code-first assertion examples', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("assert visible behavior after action", async ({ page }) => {',
        '  await page.goto("https://example.com")',
        '  await expect(page).toHaveTitle(/Example/)',
        '  await expect(page.getByRole("heading", { name: "Example Domain" })).toBeVisible()',
        '  await expect(page.getByText("illustrative examples")).toContainText("examples")',
        '})'
      ]);
      add('Best practice: web-first assertion', [
        '// Incorrect: fixed sleep hides the real condition',
        'await page.waitForTimeout(3000)',
        'expect(await page.locator("h1").textContent()).toBe("Example Domain")',
        '',
        '// Correct: Playwright waits for the expected UI state',
        'await expect(page.getByRole("heading", { name: "Example Domain" })).toBeVisible()'
      ]);
    } else if (number === 22 || number === 23) {
      add('pages/LoginPage.ts - Page object file', [
        'import { Page, expect } from "@playwright/test"',
        '',
        'export class LoginPage {',
        '  constructor(private page: Page) {}',
        '',
        '  async open() {',
        '    await this.page.goto("/login")',
        '  }',
        '',
        '  async login(username: string, password: string) {',
        '    await this.page.getByLabel("Username").fill(username)',
        '    await this.page.getByLabel("Password").fill(password)',
        '    await this.page.getByRole("button", { name: "Login" }).click()',
        '  }',
        '',
        '  async expectDashboard() {',
        '    await expect(this.page.getByRole("heading", { name: "Dashboard" })).toBeVisible()',
        '  }',
        '}'
      ]);
      add('tests/login-pom.spec.ts - POM usage', [
        'import { test, expect } from "@playwright/test"',
        'import { LoginPage } from "../pages/LoginPage"',
        '',
        'test("login through page object", async ({ page }) => {',
        '  const loginPage = new LoginPage(page)',
        '  await loginPage.open()',
        '  await loginPage.login("standard_user", "secret_sauce")',
        '  await loginPage.expectDashboard()',
        '  await expect(page).toHaveURL(/dashboard/)',
        '})'
      ]);
    } else if (number === 24 || number === 25) {
      add('fixtures/base.ts - Custom fixture with page object', [
        'import { test as base, expect } from "@playwright/test"',
        'import { LoginPage } from "../pages/LoginPage"',
        '',
        'type MyFixtures = { loginPage: LoginPage }',
        '',
        'export const test = base.extend<MyFixtures>({',
        '  loginPage: async ({ page }, use) => {',
        '    await use(new LoginPage(page))',
        '  }',
        '})',
        '',
        'export { expect }'
      ]);
      add('tests/fixture-login.spec.ts - Fixture usage', [
        'import { test, expect } from "../fixtures/base"',
        '',
        'test("fixture provides login page", async ({ loginPage, page }) => {',
        '  await loginPage.open()',
        '  await loginPage.login("standard_user", "secret_sauce")',
        '  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible()',
        '})'
      ]);
    } else if (number >= 26 && number <= 28) {
      add('tests/data-driven.spec.ts - Parameterized test', [
        'import { test, expect } from "@playwright/test"',
        '',
        'const users = [',
        '  { username: "valid_user", password: "Pass@123", message: "Dashboard" },',
        '  { username: "locked_user", password: "Pass@123", message: "locked" }',
        ']',
        '',
        'for (const user of users) {',
        '  test(`login validation for ${user.username}`, async ({ page }) => {',
        '    await page.goto("/login")',
        '    await page.getByLabel("Username").fill(user.username)',
        '    await page.getByLabel("Password").fill(user.password)',
        '    await page.getByRole("button", { name: "Login" }).click()',
        '    await expect(page.getByText(user.message)).toBeVisible()',
        '  })',
        '}'
      ]);
      add('Common mistake: duplicate tests instead of data', [
        '// Incorrect: copy-paste the same test for every user',
        '// Correct: keep data in an array or JSON file and loop through it',
        'const testData = [{ username: "user1" }, { username: "user2" }]',
        'for (const data of testData) console.log(data.username)'
      ]);
    } else if (number >= 29 && number <= 31) {
      add('tests/dynamic-frame-dialog.spec.ts - Event-first pattern', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("handle dynamic UI and dialog", async ({ page }) => {',
        '  page.on("dialog", dialog => dialog.accept())',
        '  await page.goto("/dynamic-page.html")',
        '  await page.getByRole("button", { name: "Load" }).click()',
        '  await expect(page.getByText("Loaded")).toBeVisible()',
        '})'
      ]);
      add('tests/frame.spec.ts - iframe example', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("fill field inside iframe", async ({ page }) => {',
        '  await page.goto("/iframe-form.html")',
        '  const frame = page.frameLocator("iframe[name=\\"profile\\"]")',
        '  await frame.getByLabel("City").fill("Pune")',
        '  await expect(frame.getByLabel("City")).toHaveValue("Pune")',
        '})'
      ]);
    } else if (number >= 32 && number <= 35) {
      add('tests/browser-context-page.spec.ts - Browser context and page', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("create isolated context manually", async ({ browser }) => {',
        '  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } })',
        '  const page = await context.newPage()',
        '  await page.goto("https://example.com")',
        '  await expect(page).toHaveTitle(/Example/)',
        '  await context.close()',
        '})'
      ]);
      add('Best practice: wait for URL after navigation action', [
        'await page.goto("/products")',
        'await page.getByRole("link", { name: "First product" }).click()',
        'await page.waitForURL(/products\\/\\d+/)',
        'await expect(page.getByRole("heading")).toBeVisible()'
      ]);
    } else if (number >= 39 && number <= 43) {
      add('tests/user-input-and-tabs.spec.ts - Real user interactions', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("keyboard, mouse and popup flow", async ({ page }) => {',
        '  await page.goto("/help.html")',
        '  await page.getByPlaceholder("Search").fill("billing")',
        '  await page.keyboard.press("Enter")',
        '  const popupPromise = page.waitForEvent("popup")',
        '  await page.getByRole("link", { name: "Open article" }).click()',
        '  const popup = await popupPromise',
        '  await expect(popup).toHaveURL(/article/)',
        '})'
      ]);
      add('Common mistake: waiting for popup after click', [
        '// Incorrect: event can be missed',
        'await page.getByRole("link", { name: "Open article" }).click()',
        'const popup = await page.waitForEvent("popup")',
        '',
        '// Correct',
        'const popupPromise = page.waitForEvent("popup")',
        'await page.getByRole("link", { name: "Open article" }).click()',
        'const popup = await popupPromise'
      ]);
    } else if (number >= 44 && number <= 46) {
      add('playwright.config.ts - Artifacts for debugging', [
        'import { defineConfig } from "@playwright/test"',
        '',
        'export default defineConfig({',
        '  use: {',
        '    screenshot: "only-on-failure",',
        '    video: "retain-on-failure",',
        '    trace: "on-first-retry"',
        '  }',
        '})'
      ]);
      add('Debugging commands', [
        'npx playwright test --debug',
        'npx playwright test --ui',
        'npx playwright codegen https://example.com',
        'npx playwright show-trace test-results/trace.zip'
      ], 'bash');
    } else if (number >= 57 && number <= 65) {
      add('playwright.config.ts - Production-ready config pattern', [
        'import { defineConfig, devices } from "@playwright/test"',
        '',
        'export default defineConfig({',
        '  testDir: "./tests",',
        '  retries: process.env.CI ? 2 : 0,',
        '  workers: process.env.CI ? 2 : undefined,',
        '  reporter: process.env.CI ? [["junit", { outputFile: "results.xml" }], ["html"]] : "list",',
        '  use: {',
        '    baseURL: process.env.BASE_URL || "https://example.com",',
        '    trace: "on-first-retry"',
        '  },',
        '  projects: [',
        '    { name: "chromium", use: { ...devices["Desktop Chrome"] } },',
        '    { name: "firefox", use: { ...devices["Desktop Firefox"] } }',
        '  ]',
        '})'
      ]);
      add('CI command sequence', [
        'npm ci',
        'npx playwright install --with-deps',
        'npx playwright test',
        'npx playwright show-report'
      ], 'bash');
    } else if (number === 66) {
      add('auth.setup.ts - Save authenticated storage state', [
        'import { test as setup, expect } from "@playwright/test"',
        '',
        'setup("authenticate", async ({ page }) => {',
        '  await page.goto("/login")',
        '  await page.getByLabel("Username").fill(process.env.TEST_USER || "admin")',
        '  await page.getByLabel("Password").fill(process.env.TEST_PASSWORD || "secret")',
        '  await page.getByRole("button", { name: "Login" }).click()',
        '  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible()',
        '  await page.context().storageState({ path: "playwright/.auth/user.json" })',
        '})'
      ]);
      add('tests/storage.spec.ts - Cookies and local storage', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test.use({ storageState: "playwright/.auth/user.json" })',
        '',
        'test("authenticated user opens dashboard", async ({ page, context }) => {',
        '  await page.goto("/dashboard")',
        '  const cookies = await context.cookies()',
        '  expect(cookies.length).toBeGreaterThan(0)',
        '  await page.evaluate(() => localStorage.setItem("theme", "dark"))',
        '  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible()',
        '})'
      ]);
    } else if (number === 67) {
      add('tests/api-crud.spec.ts - GET POST PUT PATCH DELETE', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("API CRUD flow", async ({ request }) => {',
        '  const created = await request.post("/api/users", { data: { name: "Asha", role: "qa" } })',
        '  expect(created.status()).toBe(201)',
        '  const user = await created.json()',
        '',
        '  expect((await request.get(`/api/users/${user.id}`)).ok()).toBeTruthy()',
        '  expect((await request.put(`/api/users/${user.id}`, { data: { name: "Asha QA" } })).ok()).toBeTruthy()',
        '  expect((await request.patch(`/api/users/${user.id}`, { data: { role: "lead" } })).ok()).toBeTruthy()',
        '  expect((await request.delete(`/api/users/${user.id}`)).status()).toBeLessThan(300)',
        '})'
      ]);
      add('Best practice: assert contract fields', [
        'const response = await request.get("/api/users/1")',
        'expect(response.status()).toBe(200)',
        'const body = await response.json()',
        'expect(body).toEqual(expect.objectContaining({',
        '  id: expect.any(Number),',
        '  name: expect.any(String)',
        '}))'
      ]);
    } else if (number === 68) {
      add('tests/network-mocking.spec.ts - Mock API response', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("mock products API", async ({ page }) => {',
        '  await page.route("**/api/products", route => route.fulfill({',
        '    status: 200,',
        '    contentType: "application/json",',
        '    body: JSON.stringify([{ id: 1, name: "Mock Laptop" }])',
        '  }))',
        '',
        '  await page.goto("/products")',
        '  await expect(page.getByText("Mock Laptop")).toBeVisible()',
        '})'
      ]);
      add('tests/request-interception.spec.ts - Block image requests', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("block images for faster smoke test", async ({ page }) => {',
        '  await page.route("**/*.{png,jpg,jpeg}", route => route.abort())',
        '  await page.goto("https://example.com")',
        '  await expect(page.getByRole("heading", { name: "Example Domain" })).toBeVisible()',
        '})'
      ]);
    } else if (number === 69) {
      add('playwright.config.ts - Mobile project', [
        'import { defineConfig, devices } from "@playwright/test"',
        '',
        'export default defineConfig({',
        '  projects: [',
        '    { name: "mobile-chrome", use: { ...devices["Pixel 5"] } },',
        '    { name: "mobile-safari", use: { ...devices["iPhone 13"] } }',
        '  ]',
        '})'
      ]);
      add('tests/mobile-menu.spec.ts - Mobile flow', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("mobile menu opens", async ({ page }) => {',
        '  await page.goto("/")',
        '  await page.getByRole("button", { name: "Menu" }).click()',
        '  await expect(page.getByRole("navigation")).toBeVisible()',
        '})'
      ]);
    } else if (number === 70) {
      add('tests/visual.spec.ts - Screenshot comparison', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("homepage visual snapshot", async ({ page }) => {',
        '  await page.goto("/")',
        '  await expect(page).toHaveScreenshot("homepage.png", { fullPage: true })',
        '})'
      ]);
      add('Best practice: mask dynamic content', [
        'await expect(page).toHaveScreenshot("dashboard.png", {',
        '  mask: [page.getByTestId("current-time"), page.getByTestId("user-email")]',
        '})'
      ]);
    } else if (number === 71) {
      add('tests/accessibility-locators.spec.ts - Semantic checks', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("important controls have accessible names", async ({ page }) => {',
        '  await page.goto("/login")',
        '  await expect(page.getByLabel("Username")).toBeVisible()',
        '  await expect(page.getByLabel("Password")).toBeVisible()',
        '  await expect(page.getByRole("button", { name: "Login" })).toBeEnabled()',
        '})'
      ]);
      add('tests/keyboard-access.spec.ts - Keyboard navigation', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("login form supports keyboard navigation", async ({ page }) => {',
        '  await page.goto("/login")',
        '  await page.keyboard.press("Tab")',
        '  await expect(page.getByLabel("Username")).toBeFocused()',
        '})'
      ]);
    } else if (number === 72) {
      add('playwright.config.ts - Environment variable usage', [
        'import { defineConfig } from "@playwright/test"',
        '',
        'export default defineConfig({',
        '  use: {',
        '    baseURL: process.env.BASE_URL || "https://example.com",',
        '    extraHTTPHeaders: {',
        '      "x-test-env": process.env.TEST_ENV || "local"',
        '    }',
        '  }',
        '})'
      ]);
      add('tests/env-login.spec.ts - Read safe test values', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("login with environment-provided user", async ({ page }) => {',
        '  await page.goto("/login")',
        '  await page.getByLabel("Username").fill(process.env.TEST_USER || "demo")',
        '  await page.getByLabel("Password").fill(process.env.TEST_PASSWORD || "demo")',
        '  await page.getByRole("button", { name: "Login" }).click()',
        '  await expect(page).toHaveURL(/dashboard|login/)',
        '})'
      ]);
    } else if (number === 73) {
      add('tests/tags-annotations.spec.ts - Tags and annotations', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("@smoke login page opens", async ({ page }) => {',
        '  test.info().annotations.push({ type: "owner", description: "qa-team" })',
        '  await page.goto("/login")',
        '  await expect(page.getByRole("button", { name: "Login" })).toBeVisible()',
        '})'
      ]);
      add('tests/parameterized-tags.spec.ts - Parameterized tests', [
        'import { test, expect } from "@playwright/test"',
        '',
        'for (const browserArea of ["login", "register", "contact"]) {',
        '  test(`@regression ${browserArea} page opens`, async ({ page }) => {',
        '    await page.goto(`/${browserArea}`)',
        '    await expect(page).toHaveURL(new RegExp(browserArea))',
        '  })',
        '}',
        '',
        '// Run: npx playwright test --grep "@smoke"'
      ]);
    }

    if (number === 18 || number === 19 || number === 36 || number === 37 || number === 38) {
      add('tests/locator-deep-dive.spec.ts - Role, text and test id locators', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("use stable locator types", async ({ page }) => {',
        '  await page.goto("/products")',
        '  await page.getByRole("link", { name: "Products" }).click()',
        '  await page.getByText("Featured products").isVisible()',
        '  await page.getByTestId("product-search").fill("laptop")',
        '  await expect(page.getByRole("listitem").filter({ hasText: "Laptop" })).toBeVisible()',
        '})'
      ]);
      add('tests/css-xpath-locators.spec.ts - CSS and XPath fallback', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("use CSS or XPath only when needed", async ({ page }) => {',
        '  await page.goto("/orders")',
        '  await page.locator("[data-order-status=\\"paid\\"]").click()',
        '  await expect(page.locator("//table//tr[td[contains(., \\"Paid\\")]]")).toBeVisible()',
        '})'
      ]);
    }

    if (number === 20) {
      add('tests/form-controls.spec.ts - Checkboxes, radios and dropdowns', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("complete form controls", async ({ page }) => {',
        '  await page.goto("/settings")',
        '  await page.getByRole("checkbox", { name: "Email alerts" }).check()',
        '  await page.getByRole("radio", { name: "Weekly" }).check()',
        '  await page.getByLabel("Country").selectOption({ label: "India" })',
        '  await expect(page.getByRole("checkbox", { name: "Email alerts" })).toBeChecked()',
        '})'
      ]);
      add('tests/multi-select.spec.ts - Multi-select dropdown', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("select multiple skills", async ({ page }) => {',
        '  await page.goto("/profile")',
        '  await page.getByLabel("Skills").selectOption(["javascript", "playwright"])',
        '  await expect(page.getByLabel("Skills")).toHaveValues(["javascript", "playwright"])',
        '})'
      ]);
    }

    if (number === 21 || (number >= 47 && number <= 56)) {
      add('tests/assertion-mistakes.spec.ts - Incorrect and corrected assertions', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("prefer locator assertion", async ({ page }) => {',
        '  await page.goto("/cart")',
        '  // Incorrect: reads too early in dynamic pages',
        '  // expect(await page.getByTestId("cart-count").textContent()).toBe("1")',
        '',
        '  // Correct: auto-retries until the UI reaches expected state',
        '  await expect(page.getByTestId("cart-count")).toHaveText("1")',
        '})'
      ]);
    }

    if (number === 22 || number === 23) {
      add('tests/pom-common-mistake.spec.ts - Avoid raw locators in tests', [
        'import { test, expect } from "@playwright/test"',
        'import { LoginPage } from "../pages/LoginPage"',
        '',
        'test("best practice keeps test readable", async ({ page }) => {',
        '  const loginPage = new LoginPage(page)',
        '  await loginPage.open()',
        '  await loginPage.login("standard_user", "secret_sauce")',
        '  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible()',
        '})'
      ]);
    }

    if (number === 24 || number === 25) {
      add('fixtures/authenticatedPage.ts - Authenticated fixture', [
        'import { test as base, expect, Page } from "@playwright/test"',
        '',
        'export const test = base.extend<{ authenticatedPage: Page }>({',
        '  authenticatedPage: async ({ page }, use) => {',
        '    await page.goto("/login")',
        '    await page.getByLabel("Username").fill("admin")',
        '    await page.getByLabel("Password").fill("secret")',
        '    await page.getByRole("button", { name: "Login" }).click()',
        '    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible()',
        '    await use(page)',
        '  }',
        '})'
      ]);
    }

    if (number === 30) {
      add('tests/nested-frame.spec.ts - Nested iframe example', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("work with nested frames", async ({ page }) => {',
        '  await page.goto("/checkout")',
        '  const card = page.frameLocator("#payment-frame").frameLocator("#card-frame")',
        '  await card.getByLabel("Card number").fill("4111111111111111")',
        '  await expect(card.getByLabel("Card number")).toHaveValue(/4111/)',
        '})'
      ]);
    }

    if (number === 52 || number === 67) {
      add('tests/api-negative.spec.ts - Negative API assertion', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("invalid user returns not found", async ({ request }) => {',
        '  const response = await request.get("/api/users/does-not-exist")',
        '  expect(response.status()).toBe(404)',
        '  const body = await response.json()',
        '  expect(body.message || body.error).toBeTruthy()',
        '})'
      ]);
      add('tests/api-setup-ui.spec.ts - API setup before UI test', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("create data with API then verify in UI", async ({ request, page }) => {',
        '  const response = await request.post("/api/tasks", { data: { title: "Review Playwright" } })',
        '  expect(response.ok()).toBeTruthy()',
        '  await page.goto("/tasks")',
        '  await expect(page.getByText("Review Playwright")).toBeVisible()',
        '})'
      ]);
    }

    if (number === 57 || number === 61 || number === 62 || number === 63 || number === 64 || number === 65) {
      add('playwright.config.ts - Best-practice use block', [
        'import { defineConfig } from "@playwright/test"',
        '',
        'export default defineConfig({',
        '  use: {',
        '    baseURL: process.env.BASE_URL || "https://example.com",',
        '    actionTimeout: 10_000,',
        '    navigationTimeout: 15_000,',
        '    screenshot: "only-on-failure",',
        '    trace: "on-first-retry"',
        '  }',
        '})'
      ]);
    }

    if (number === 66) {
      add('tests/session-storage.spec.ts - Session storage setup', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("set and verify session storage", async ({ page }) => {',
        '  await page.goto("/")',
        '  await page.evaluate(() => sessionStorage.setItem("wizardStep", "2"))',
        '  const step = await page.evaluate(() => sessionStorage.getItem("wizardStep"))',
        '  expect(step).toBe("2")',
        '})'
      ]);
      add('Common mistake: UI login in every test', [
        '// Incorrect: slow and repetitive',
        '// test.beforeEach(async ({ page }) => loginThroughUi(page))',
        '',
        '// Correct: create storage state once and reuse it',
        'test.use({ storageState: "playwright/.auth/user.json" })'
      ]);
    }

    if (number === 68) {
      add('tests/network-error.spec.ts - Mock backend failure', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("shows friendly error when API fails", async ({ page }) => {',
        '  await page.route("**/api/products", route => route.fulfill({ status: 500, body: "Server error" }))',
        '  await page.goto("/products")',
        '  await expect(page.getByText("Unable to load products")).toBeVisible()',
        '})'
      ]);
      add('tests/observe-request.spec.ts - Verify outgoing request', [
        'import { test, expect } from "@playwright/test"',
        '',
        'test("search sends query to API", async ({ page }) => {',
        '  const requestPromise = page.waitForRequest("**/api/search?q=playwright")',
        '  await page.goto("/search")',
        '  await page.getByPlaceholder("Search").fill("playwright")',
        '  await page.getByRole("button", { name: "Search" }).click()',
        '  expect((await requestPromise).url()).toContain("q=playwright")',
        '})'
      ]);
    }

    return examples;
  }

  function playwrightIplBatchOneExamples(topic) {
    var examples = [];

    function add(title, lines, explanation, language) {
      var example = playwrightExample(title, lines, language || 'ts');
      example.explanation = explanation;
      examples.push(example);
    }

    if (topic.id === 'playwright-notes-18') {
      add('Basic example - locate the IPL page by heading', [
        "import { test, expect } from '@playwright/test';",
        '',
        "test('finds the IPL practice page heading', async ({ page }) => {",
        "  await page.goto('https://www.testnova.in/ipl-automation-practice.html');",
        '',
        "  const heading = page.getByRole('heading', {",
        "    name: 'IPL Automation Practice Playground',",
        '  });',
        '',
        '  await expect(heading).toBeVisible();',
        '});'
      ], 'The heading text was verified on the IPL page. This example starts with a user-facing role locator before using lower-level selectors.');

      add('TestNova IPL practical example - search input and result area', [
        "import { test, expect } from '@playwright/test';",
        '',
        "test('uses stable IPL search locators', async ({ page }) => {",
        "  await page.goto('https://www.testnova.in/ipl-automation-practice.html');",
        '',
        "  await page.getByTestId('player-search-input').fill('Virat');",
        "  await page.getByTestId('search-players').click();",
        '',
        "  await expect(page.getByText('1 result(s)')).toBeVisible();",
        "  await expect(page.getByTestId('player-search-results')).toContainText('Virat Kohli');",
        '});'
      ], 'The IPL search result intentionally changes after a short loading state, so the assertion waits for the final visible result instead of reading text immediately.');

      add('Common mistake - fragile selector versus stable locator', [
        "import { test, expect } from '@playwright/test';",
        '',
        "test('uses stable locator instead of layout selector', async ({ page }) => {",
        "  await page.goto('https://www.testnova.in/ipl-automation-practice.html');",
        '',
        '  // Incorrect: tied to DOM layout and likely to break.',
        '  // await page.locator("main section:nth-child(2) input").fill("Virat");',
        '',
        '  // Correct: stable attribute already provided by the practice page.',
        "  await page.getByTestId('player-search-input').fill('Virat');",
        "  await expect(page.getByTestId('player-search-input')).toHaveValue('Virat');",
        '});'
      ], 'The corrected code targets the intended control directly and then verifies the entered value.');
    }

    if (topic.id === 'playwright-notes-20') {
      add('Basic example - click, fill and assert', [
        "import { test, expect } from '@playwright/test';",
        '',
        "test('performs basic IPL page actions', async ({ page }) => {",
        "  await page.goto('https://www.testnova.in/ipl-automation-practice.html');",
        '',
        "  await page.getByTestId('player-search-input').fill('Dhoni');",
        "  await page.getByTestId('team-filter').selectOption('CSK');",
        "  await page.getByTestId('search-players').click();",
        '',
        "  await expect(page.getByText('1 result(s)')).toBeVisible();",
        "  await expect(page.getByTestId('player-search-results')).toContainText('MS Dhoni');",
        '});'
      ], 'This complete test performs form input, dropdown selection, button click, and result assertion on the IPL practice page.');

      add('TestNova IPL practical example - table actions and pagination', [
        "import { test, expect } from '@playwright/test';",
        '',
        "test('sorts and paginates the IPL records table', async ({ page }) => {",
        "  await page.goto('https://www.testnova.in/ipl-automation-practice.html');",
        '',
        "  await page.getByTestId('sort-runs').click();",
        "  await expect(page.getByTestId('player-records-table')).toBeVisible();",
        '',
        "  await page.getByTestId('player-table-next').click();",
        "  await expect(page.getByTestId('player-table-page-status')).toContainText('Page');",
        '});'
      ], 'The locators for the Runs sort button and pagination controls were verified on the rendered IPL table.');

      add('Common mistake - acting before the page is ready', [
        "import { test, expect } from '@playwright/test';",
        '',
        "test('waits through assertions instead of hard sleeps', async ({ page }) => {",
        "  await page.goto('https://www.testnova.in/ipl-automation-practice.html');",
        '',
        '  // Incorrect: a fixed sleep is slow and unreliable.',
        '  // await page.waitForTimeout(3000);',
        '',
        '  // Correct: wait for the actual component that the user needs.',
        "  await expect(page.getByTestId('player-records-table')).toBeVisible();",
        "  await page.getByTestId('sort-runs').click();",
        '});'
      ], 'The corrected version waits for the table itself. It does not pause blindly.');
    }

    if (topic.id === 'playwright-notes-21') {
      add('Basic example - IPL page assertions', [
        "import { test, expect } from '@playwright/test';",
        '',
        "test('verifies IPL page title, URL and heading', async ({ page }) => {",
        "  await page.goto('https://www.testnova.in/ipl-automation-practice.html');",
        '',
        "  await expect(page).toHaveTitle(/IPL Automation Practice Playground/);",
        "  await expect(page).toHaveURL(/ipl-automation-practice/);",
        "  await expect(page.getByRole('heading', {",
        "    name: 'IPL Automation Practice Playground',",
        '  })).toBeVisible();',
        '});'
      ], 'This file demonstrates page assertions and a heading assertion against real IPL page content.');

      add('TestNova IPL practical example - table, count, text and enabled assertions', [
        "import { test, expect } from '@playwright/test';",
        '',
        "test('asserts IPL records table structure and controls', async ({ page }) => {",
        "  await page.goto('https://www.testnova.in/ipl-automation-practice.html');",
        '',
        "  const table = page.getByTestId('player-records-table');",
        "  await expect(table).toBeVisible();",
        "  await expect(table.locator('thead th')).toHaveCount(11);",
        "  await expect(page.getByTestId('player-table-row-virat-kohli')).toContainText('Virat Kohli');",
        "  await expect(page.getByTestId('player-table-next')).toBeEnabled();",
        '});'
      ], 'The table exists with 11 headers in the current IPL page. The player row assertion checks stable structure without depending on every statistic.');

      add('Additional practical example - soft, negative and timeout assertions', [
        "import { test, expect } from '@playwright/test';",
        '',
        "test('uses soft and negative assertions on IPL search', async ({ page }) => {",
        "  await page.goto('https://www.testnova.in/ipl-automation-practice.html');",
        '',
        "  await expect.soft(page.getByTestId('player-search-input')).toBeVisible();",
        "  await expect.soft(page.getByTestId('search-players')).toBeEnabled();",
        '',
        "  await page.getByTestId('player-search-input').fill('Virat');",
        "  await page.getByTestId('search-players').click();",
        '',
        "  await expect(page.getByText('1 result(s)')).toBeVisible({ timeout: 5000 });",
        "  await expect(page.getByTestId('player-search-results')).not.toContainText('No players found');",
        '});'
      ], 'Soft assertions collect multiple UI checks. The search assertion uses a timeout because this component has a deliberate loading state.');

      add('Common mistake - reading text too early', [
        "import { test, expect } from '@playwright/test';",
        '',
        "test('uses web-first assertions for dynamic search results', async ({ page }) => {",
        "  await page.goto('https://www.testnova.in/ipl-automation-practice.html');",
        "  await page.getByTestId('player-search-input').fill('Virat');",
        "  await page.getByTestId('search-players').click();",
        '',
        '  // Incorrect: textContent can read during the loading state.',
        "  // expect(await page.getByTestId('player-search-results').textContent()).toContain('Virat Kohli');",
        '',
        '  // Correct: locator assertion retries until the expected text appears.',
        "  await expect(page.getByTestId('player-search-results')).toContainText('Virat Kohli');",
        '});'
      ], 'This directly fixes the common flaky assertion pattern for dynamic content.');
    }

    if (topic.id === 'playwright-notes-26') {
      add('Basic example - parameterized IPL player searches', [
        "import { test, expect } from '@playwright/test';",
        '',
        'const players = [',
        "  { query: 'Virat', expected: 'Virat Kohli' },",
        "  { query: 'Dhoni', expected: 'MS Dhoni' },",
        '];',
        '',
        'for (const player of players) {',
        "  test(`finds ${player.expected} in IPL player search`, async ({ page }) => {",
        "    await page.goto('https://www.testnova.in/ipl-automation-practice.html');",
        "    await page.getByTestId('player-search-input').fill(player.query);",
        "    await page.getByTestId('search-players').click();",
        '',
        "    await expect(page.getByTestId('player-search-results')).toContainText(player.expected);",
        '  });',
        '}'
      ], 'The same test body runs for multiple player records. Each row has independent input and expected text.');

      add('TestNova IPL practical example - data-driven team filters', [
        "import { test, expect } from '@playwright/test';",
        '',
        'const teamCases = [',
        "  { team: 'CSK', player: 'MS Dhoni' },",
        "  { team: 'RCB', player: 'Virat Kohli' },",
        '];',
        '',
        'for (const item of teamCases) {',
        "  test(`filters ${item.team} records`, async ({ page }) => {",
        "    await page.goto('https://www.testnova.in/ipl-automation-practice.html');",
        "    await page.getByTestId('team-filter').selectOption(item.team);",
        "    await page.getByTestId('search-players').click();",
        '',
        "    await expect(page.getByTestId('player-search-results')).toContainText(item.player);",
        '  });',
        '}'
      ], 'The team filter values such as CSK and RCB are present in the IPL page dropdown.');

      add('Common mistake - hardcoding duplicate tests', [
        "import { test, expect } from '@playwright/test';",
        '',
        "test('uses data instead of copy-paste tests', async ({ page }) => {",
        '  // Incorrect: create separate duplicated tests for Virat, Dhoni, Rohit, and every player.',
        '',
        "  const data = [{ query: 'Virat', expected: 'Virat Kohli' }];",
        '  for (const row of data) {',
        "    await page.goto('https://www.testnova.in/ipl-automation-practice.html');",
        "    await page.getByTestId('player-search-input').fill(row.query);",
        "    await page.getByTestId('search-players').click();",
        "    await expect(page.getByTestId('player-search-results')).toContainText(row.expected);",
        '  }',
        '});'
      ], 'The corrected pattern separates test data from the automation steps so adding more records is simple.');
    }

    if (topic.id === 'playwright-notes-38') {
      add('Basic example - table row locator', [
        "import { test, expect } from '@playwright/test';",
        '',
        "test('locates a specific IPL player row', async ({ page }) => {",
        "  await page.goto('https://www.testnova.in/ipl-automation-practice.html');",
        '',
        "  const viratRow = page.getByTestId('player-table-row-virat-kohli');",
        "  await expect(viratRow).toContainText('Virat Kohli');",
        "  await expect(viratRow).toContainText('RCB');",
        '});'
      ], 'The Virat row has a stable data-testid and visible player/team text. This is safer than depending on row index.');

      add('TestNova IPL practical example - chaining inside the records table', [
        "import { test, expect } from '@playwright/test';",
        '',
        "test('chains locators inside the IPL records table', async ({ page }) => {",
        "  await page.goto('https://www.testnova.in/ipl-automation-practice.html');",
        '',
        "  const table = page.getByTestId('player-records-table');",
        "  const viratRow = table.locator('[data-testid=\"player-table-row-virat-kohli\"]');",
        '',
        "  await expect(viratRow).toContainText('Virat Kohli');",
        "  await viratRow.getByRole('button', { name: 'View Details' }).click();",
        "  await expect(page.getByTestId('player-details-modal')).toBeVisible();",
        '});'
      ], 'The example scopes the row lookup to the table, then finds the View Details button inside that row.');

      add('Common mistake - using row position for changing tables', [
        "import { test, expect } from '@playwright/test';",
        '',
        "test('avoids positional table locators', async ({ page }) => {",
        "  await page.goto('https://www.testnova.in/ipl-automation-practice.html');",
        '',
        '  // Incorrect: sorting or pagination can change this row.',
        "  // const row = page.locator('tbody tr').nth(0);",
        '',
        '  // Correct: use a stable row identifier or filter by visible player text.',
        "  const row = page.getByTestId('player-table-row-virat-kohli');",
        "  await expect(row).toContainText('Virat Kohli');",
        '});'
      ], 'The corrected locator still works when the table is sorted or paginated back to the row.');
    }

    return examples;
  }

  function enrichPlaywrightTopic(topic) {
    var ui = {
      'playwright-notes-03': [
        tableBlock('Playwright vs Selenium', ['Feature', 'Playwright', 'Selenium'], [
          ['Developer', 'Microsoft', 'Selenium Project'],
          ['Browsers', 'Chromium, Firefox, WebKit', 'Often needs separate drivers'],
          ['Auto-wait', 'Built in', 'Manual waits often required'],
          ['Parallel execution', 'Built in', 'More setup'],
          ['API testing', 'Built in request support', 'Not built in']
        ])
      ],
      'playwright-notes-04': [
        flowBlock('Architecture Flow', ['Test Script (Node.js)', 'Playwright Library', 'Browser Context', 'Chromium / Firefox / WebKit'])
      ],
      'playwright-notes-05': [
        tableBlock('Browser Support', ['Engine', 'Examples', 'Use'], [
          ['Chromium', 'Chrome, Edge, Brave', 'Primary modern browser coverage'],
          ['Firefox', 'Mozilla Firefox', 'Cross-browser validation'],
          ['WebKit', 'Safari-like engine', 'Safari and iOS-style coverage']
        ])
      ],
      'playwright-notes-10': [
        tableBlock('Project Structure', ['Path', 'Purpose'], [
          ['tests/', 'Spec files and test cases'],
          ['pages/', 'Page Object Model classes'],
          ['utils/', 'Reusable helper functions'],
          ['test-data/', 'JSON, CSV, and test fixture data'],
          ['playwright.config.ts', 'Main Playwright configuration']
        ])
      ],
      'playwright-notes-11': [
        tableBlock('Useful package.json Scripts', ['Script', 'Command', 'Purpose'], [
          ['test', 'playwright test', 'Run all tests'],
          ['test:ui', 'playwright test --ui', 'Open UI mode'],
          ['test:headed', 'playwright test --headed', 'Run visible browser'],
          ['report', 'playwright show-report', 'Open HTML report']
        ])
      ],
      'playwright-notes-13': [
        tableBlock('Core Config Properties', ['Property', 'Purpose'], [
          ['testDir', 'Folder where test files are located'],
          ['timeout', 'Maximum time for a test'],
          ['expect.timeout', 'Maximum wait for assertions'],
          ['retries', 'Retry failed tests'],
          ['workers', 'Parallel worker count'],
          ['reporter', 'Result output format'],
          ['use', 'Shared browser/context options'],
          ['projects', 'Browser/device/env combinations']
        ])
      ],
      'playwright-notes-17': [
        flowBlock('Test Lifecycle', ['beforeAll', 'beforeEach', 'test body', 'afterEach', 'afterAll'])
      ],
      'playwright-notes-18': [
        tableBlock('Locator Priority', ['Priority', 'Locator', 'Why'], [
          ['1', 'getByRole', 'Accessible and close to user behavior'],
          ['2', 'getByLabel', 'Best for forms'],
          ['3', 'getByText', 'Readable content checks'],
          ['4', 'getByPlaceholder', 'Useful for inputs'],
          ['5', 'getByTestId', 'Stable test-specific selector'],
          ['6', 'CSS/XPath', 'Use only when user-facing locators are not enough']
        ])
      ],
      'playwright-notes-20': [
        tableBlock('Common Actions', ['Action', 'Purpose'], [
          ['click / dblclick', 'Mouse click interactions'],
          ['fill / type / press', 'Input and keyboard behavior'],
          ['check / uncheck', 'Checkbox and radio controls'],
          ['selectOption', 'Dropdown selection'],
          ['hover / focus / blur', 'State-based UI behavior'],
          ['dragTo', 'Drag and drop workflows'],
          ['setInputFiles', 'File upload']
        ])
      ],
      'playwright-notes-21': [
        tableBlock('Common Assertions', ['Assertion', 'Use'], [
          ['toBeVisible / toBeHidden', 'Element visibility'],
          ['toHaveText / toContainText', 'Text validation'],
          ['toHaveURL / toHaveTitle', 'Navigation validation'],
          ['toHaveCount', 'List/table count'],
          ['toBeEnabled / toBeDisabled', 'Control state'],
          ['toHaveScreenshot', 'Visual comparison']
        ])
      ],
      'playwright-notes-22': [
        flowBlock('POM Structure', ['Test spec', 'Page class', 'Locators', 'Page actions', 'Assertions'])
      ],
      'playwright-notes-25': [
        flowBlock('Fixture Execution', ['Global setup', 'Worker fixture', 'Test fixture', 'Test body', 'Teardown'])
      ],
      'playwright-notes-27': [
        flowBlock('Data Driven Flow', ['Read data', 'Loop each row', 'Run test', 'Generate result', 'Verify output'])
      ],
      'playwright-notes-30': [
        flowBlock('Frame Model', ['Parent page', 'iframe', 'frameLocator()', 'element inside frame'])
      ],
      'playwright-notes-31': [
        tableBlock('Dialog Types', ['Type', 'User experience', 'Handling'], [
          ['alert', 'Message with OK', 'dialog.accept()'],
          ['confirm', 'OK or Cancel', 'dialog.accept() / dialog.dismiss()'],
          ['prompt', 'Input box', 'dialog.accept("value")'],
          ['beforeunload', 'Leave page warning', 'Register handler before action']
        ])
      ],
      'playwright-notes-33': [
        tableBlock('Browser Context Isolation', ['Data', 'Isolated per context'], [
          ['Cookies', 'Yes'],
          ['localStorage/sessionStorage', 'Yes'],
          ['Cache', 'Yes'],
          ['Permissions', 'Yes'],
          ['Viewport/geolocation/user agent', 'Yes']
        ])
      ],
      'playwright-notes-35': [
        tableBlock('Navigation APIs', ['API', 'Purpose'], [
          ['goto()', 'Open URL'],
          ['goBack() / goForward()', 'Browser history movement'],
          ['reload()', 'Reload current page'],
          ['waitForURL()', 'Wait until URL matches'],
          ['waitForLoadState()', 'Wait for DOM/load/network state']
        ])
      ],
      'playwright-notes-40': [
        flowBlock('Upload and Download Flow', ['Choose file', 'setInputFiles()', 'Trigger download', 'waitForEvent("download")', 'saveAs()'])
      ],
      'playwright-notes-45': [
        tableBlock('Debug Artifacts', ['Artifact', 'What it captures'], [
          ['Screenshot', 'Page or element visual state'],
          ['Video', 'Full test execution recording'],
          ['Trace', 'Actions, snapshots, network, console and errors'],
          ['HTML report', 'Readable run summary']
        ])
      ],
      'playwright-notes-57': [
        checklistBlock('defineConfig Benefits', ['Type safety', 'Autocomplete', 'Centralized settings', 'Multiple browser projects', 'Reporter setup', 'Cleaner framework structure'])
      ],
      'playwright-notes-58': [
        tableBlock('Test File Organization', ['Property', 'Meaning'], [
          ['testDir', 'Where Playwright searches for tests'],
          ['testMatch', 'Patterns to include test files'],
          ['testIgnore', 'Patterns to exclude files'],
          ['outputDir', 'Artifacts generated during test runs'],
          ['snapshotDir', 'Expected screenshots/snapshots']
        ])
      ],
      'playwright-notes-60': [
        tableBlock('Retries and Workers', ['Setting', 'Meaning', 'Best use'], [
          ['retries', 'Rerun failed tests', 'Use carefully for CI stability'],
          ['workers', 'Parallel processes', 'Tune based on machine capacity'],
          ['fullyParallel', 'Run tests in parallel', 'Use when tests are independent']
        ])
      ],
      'playwright-notes-61': [
        tableBlock('Important use Properties', ['Property', 'Example use'], [
          ['baseURL', 'Shorter page.goto paths'],
          ['browserName / channel', 'Browser selection'],
          ['headless', 'CI or visible debug mode'],
          ['viewport', 'Responsive testing'],
          ['storageState', 'Reuse authenticated state'],
          ['trace / video / screenshot', 'Debug artifacts'],
          ['extraHTTPHeaders', 'API or app headers'],
          ['geolocation / permissions', 'Location-aware apps']
        ])
      ],
      'playwright-notes-62': [
        tableBlock('Reporter Options', ['Reporter', 'Use'], [
          ['list / line / dot', 'Terminal output'],
          ['html', 'Interactive local report'],
          ['json', 'Machine-readable report'],
          ['junit', 'CI test result publishing'],
          ['github', 'GitHub Actions annotations'],
          ['blob', 'Merge reports from shards']
        ])
      ],
      'playwright-notes-63': [
        flowBlock('Project Matrix', ['Chromium', 'Firefox', 'WebKit', 'Mobile Chrome', 'Mobile Safari', 'Environment-specific projects'])
      ],
      'playwright-notes-64': [
        flowBlock('Global Setup and Teardown', ['Prepare environment', 'Create auth state/test data', 'Run tests', 'Clean external resources', 'Publish final artifacts'])
      ],
      'playwright-notes-65': [
        flowBlock('CI/CD Pipeline', ['Checkout code', 'Install dependencies', 'Install browsers', 'Run tests', 'Upload report/artifacts', 'Fail on real failures'])
      ]
    };

    var examples = playwrightPdfExampleCatalog();
    if (examples[topic.id]) topic.examples = (topic.examples || []).concat(examples[topic.id]);
    topic.examples = (topic.examples || []).concat(playwrightCodeFirstSupplementExamples(topic));
    topic.examples = (topic.examples || []).concat(playwrightIplBatchOneExamples(topic));
    if (ui[topic.id]) topic.ui = ui[topic.id];
    return topic;
  }

  function tableBlock(title, headers, rows) {
    return { type: 'table', title: title, headers: headers, rows: rows };
  }

  function flowBlock(title, steps) {
    return { type: 'flow', title: title, steps: steps };
  }

  function checklistBlock(title, items) {
    return { type: 'checklist', title: title, items: items };
  }

  function buildPlaywrightJsTsTopics() {
    function code(lines) {
      return lines.join('\n');
    }

    var examples = {
      introduction: [
        { title: '1_VaribaleDemo.js - Hello World', code: code([
          '// 1. Hello World',
          'console.log("Hello World !")'
        ]) }
      ],
      variables: [
        { title: '1_VaribaleDemo.js - Variables, Data Types and Function', code: code([
          '//2. variables',
          '//2.1 var is a keyword used to declare a variable. ',
          '// It is function-scoped and can be re-declared and updated.',
          'var firstName="John"',
          'var firstName="emll"',
          'console.log(firstName)',
          '',
          '//2.2 let is a keyword used to declare a variable.',
          '//  It is block-scoped and can be updated but not re-declared.',
          'let lasttName="Smith"',
          'lasttName="Smith2"',
          '//let lasttName="Smith3"',
          'console.log(lasttName)',
          '',
          '',
          '//2.3 const is a keyword used to declare a variable.',
          '//  It is block-scoped and cannot be updated or re-declared.',
          'const occupation="engineer"',
          'occupation="doctor" // This would cause an error',
          'console.log(occupation)',
          '',
          '',
          '//4. data types',
          '//4.1 string is a sequence of characters. primitive data type',
          'var middleName=\'David\'',
          'console.log(middleName)',
          '',
          '//4.2 number is a numeric data type. primitive data type',
          'var year_in_service= 5',
          'console.log(year_in_service)',
          '',
          '//4.3 boolean is a data type that can have only two values: true or false. primitive data type',
          'var isHeMarried= false',
          'console.log(isHeMarried)',
          '',
          '//4.4 null is a special value that represents the absence of any object value. primitive data type',
          'var year_in_marraige= null',
          'console.log(year_in_marraige)',
          '',
          '//4.5 undefined is a special value that represents the absence of a value. primitive data type',
          'var num_of_cars= undefined',
          'console.log(num_of_cars)',
          '',
          '',
          '//4.6 array is an object that can hold multiple values of different data types. non primitive data type',
          'var fruits=["apple","banana","mango"]',
          'console.log(fruits)',
          'console.log(fruits[0])',
          'console.log(fruits[1])',
          'console.log(fruits[2])',
          '',
          '//4.7  this is an object that can hold multiple values of different data types. non primitive data type',
          'var person={',
          '    firstName:"John",',
          '    lastName:"Doe"',
          '}',
          'console.log(person)',
          '',
          '//4.8 function is a block of code that can be executed when called. non primitive data type',
          'function greet(name){',
          '    console.log("Hello " + name)',
          '}',
          'greet("Alice")'
        ]) }
      ],
      hoisting: [
        { title: '1_VaribaleDemo.js - Hoisting', code: code([
          '//3 hoisting -  declaration are moved to the top of the scope during the compilation phase. ',
          '// However, initialization is not hoisted.',
          'console.log(age) // undefined',
          'var age=5',
          'console.log(age) // 5'
        ]) }
      ],
      operators: [
        { title: '2_OperatorsDemo.js', code: code([
          '//Arithemetic operators',
          '',
          'console.log(10+10)',
          '//or we can write it as',
          'var a=10',
          'var b=10',
          'console.log(a+b)',
          '',
          '',
          '',
          'console.log(10-5)',
          'console.log(10*5)',
          'console.log(10/5)//gives quotient of the division - 2 ',
          'console.log(10%3)//gives reminder of the division -1',
          'console.log(10**3)//gives power of the number - 1000',
          'console.log(10>5)//true',
          'console.log(10<5)//false',
          'console.log(10>=5)//true',
          'console.log(10<=5)//false',
          'console.log(10==10)//true',
          'console.log(10=="10")//true because it is type coercion means it converts the string to number ',
          '//then compares',
          'console.log(10==="10")//false because it is strict comparison means it does not convert the',
          '// string to number and compares the value and type of the variable',
          'console.log(10!=5)//true',
          'console.log(10!=5)//true',
          'console.log(10===5)//false',
          'console.log(10!==5)//true',
          '',
          '',
          '//Logical operators',
          'console.log(true && true)//true ',
          'console.log(true && false)//false',
          'console.log(false && true)//false',
          'console.log(false && false)//false',
          '',
          '',
          'console.log(!true)//false',
          'console.log(!false)//true       ',
          '',
          '',
          '//OR operators',
          'console.log(true || true)//true',
          'console.log(true || false)//true',
          'console.log(false || true)//true',
          'console.log(false || false)//false',
          '',
          'let isMarried=true',
          'let isEmployed=false',
          'console.log(isMarried && isEmployed)//false',
          'console.log(isMarried || isEmployed)//true',
          '',
          '',
          'var age=20',
          'var isAdult=age>=18?true:false',
          'console.log(isAdult)',
          '',
          '',
          'console.log(10+20+"js")//30js',
          'console.log("js"+10+20)//js1020',
          'console.log("js"+(10+20))//js30',
          'console.log(10+20+"1"+21)//30121',
          'console.log(10+20+(1+1))',
          '',
          '',
          '//BODMAS',
          'console.log(10+20*2)/2-1 // 10+40-1'
        ]) }
      ],
      conditions: [
        { title: '3_conditionalStatements.js', code: code([
          '//1 . if',
          '',
          'var age=20'
        ]) }
      ],
      loops: [
        { title: '4.1_Loops_for.js', code: code([
          '// for  repeated statements we use loops',
          '//sending email to everyone -> loops',
          '',
          '//1. for loop - number of iterations are fixed',
          'console.log("Start")',
          'for(let i=0;i<5;i++)',
          '{',
          '    console.log(i)',
          '}',
          'console.log("End")',
          '',
          'for(let i=0;i<=21;i++)',
          '{',
          '    console.log(i)',
          '}',
          '',
          '//fail - condition',
          '',
          '',
          '/* for(;;)',
          '{',
          '    console.log("PW")',
          '} */',
          ' ',
          '',
          '',
          '',
          'for(let i=10;i<=0;i++)',
          '{',
          '    console.log(i)',
          '}'
        ]) },
        { title: '4.2_Loops_While.js', code: code([
          '//while loop  - when iteration is not fixed',
          'console.log("Start while")',
          ' ',
          '',
          '/* while(true)',
          '{',
          '    console.log("Hi")',
          '}',
          '',
          ' */',
          '',
          'let i=0;',
          'while(i<=5)',
          '{',
          '    console.log("Value of i " +i)',
          '    i++',
          '    //i=i+1',
          '}'
        ]) },
        { title: '4.1_Loops_DoWhile.js', code: code([
          'console.log("Start do while")',
          '//Do is a block of code',
          'let i=1',
          'do',
          '{',
          '',
          '    console.log("the value of i is" +i)',
          '    i++',
          '    ',
          '}',
          'while(i<=6)'
        ]) },
        { title: '4.3_EvenOdd.js', code: code([
          'for(let i=1;i<=100;i++)',
          '{',
          '    //console.log(i)',
          '    if(i%2==0)',
          '    {',
          '        console.log("Even number " +i)',
          '    }',
          '',
          '    if(i==50)',
          '    {',
          '        break;',
          '    }',
          '}'
        ]) }
      ],
      arrays: [
        { title: '5.1_ArrayDemo.js', code: code([
          '//store multiple values in a single variable',
          '//t arr=[];',
          '//nsole.log(arr)',
          'let arr=["java","playwright","git","github"]',
          'console.log(arr)',
          'console.log(arr[2]);//git',
          'console.log(arr[5]);//undefined'
        ]) },
        { title: '5.2_ArrayCanHaveTypeAny.js', code: code([
          '//Array of different data types',
          'let arr1=[\'Wasim\',32,true,null,\'Noida\']',
          'console.log(arr1[2])',
          'console.log(arr1[3])'
        ]) },
        { title: '5.3_NestedArrayEx.js', code: code([
          'console.log("Hello World!");',
          '',
          '',
          'let subjects = [',
          '["Math",65,true],',
          '["eng",65,true],',
          '',
          ']',
          '',
          'console.log(subjects);'
        ]) }
      ],
      arrayMethods: [
        { title: '5.4_Array_Update.js', code: code([
          'let fruits=[\'Mango\',\'Orrange\',\'Apple\']',
          'console.log(fruits)',
          'fruits[1]=\'Banana\'',
          'console.log(fruits)',
          '',
          '//Adding Elements',
          '',
          '// push() -> Add at End',
          'fruits.push(\'Guava\')',
          'console.log(fruits)',
          '',
          '// unshift() -> Add at Beginning',
          'fruits.unshift(\'Pineapple\')',
          'console.log(fruits)',
          '',
          '',
          '//Removing Elements',
          '// pop() -> Remove Last',
          'fruits.pop()',
          'console.log(fruits)',
          '',
          '// shift() -> Remove First',
          'fruits.shift()',
          'console.log(fruits)',
          '',
          '',
          'console.log(fruits.length); // number of items in array'
        ]) },
        { title: '5.5_Array_Looping Through Arrays.js', code: code([
          'var country=[\'India\',\'UK\',\'USA\',\'Japan\']',
          'for(let i=0;i<country.length;i++) // 0 to 4',
          '{',
          '    console.log(country[i])',
          '}',
          '',
          '// for - of  -Array - iterable objects',
          '',
          '//type for - choose for of',
          '',
          '/* for (const element of object) {',
          '    ',
          '} */',
          '',
          '',
          '//keep on picking country(object)  and assign it to value (element) ',
          'for (let value of country) {',
          '    console.log(value)',
          '}',
          '',
          '//note - for customization required go for traditional for loop',
          '// for forward iteration - go with forof',
          '',
          '',
          'var players=[\'Virat\',\'Rohit\',\'Sachin\',\'Kallis\',\'Babar\',\'MSD\']',
          'for (let values of players) {',
          '    console.log(values)',
          '',
          '     if(values==\'Babar\')',
          '     {',
          '        break',
          '     }',
          '}'
        ]) }
      ]
    };

    var items = [
      ['JavaScript Introduction', 'Level 1 - JavaScript Foundations', 'None', 'JavaScript is the language used to write most Playwright tests. Learn how Node runs a test file, why console output helps debugging, and how small statements become automation steps.', 'Practice by running a simple JavaScript file before opening Playwright code.', examples.introduction],
      ['Variables, let, const and Data Types', 'Level 1 - JavaScript Foundations', 'JavaScript Introduction', 'Variables store values such as usernames, passwords, URLs, expected messages, and test data. Use const for values that should not change and let for values that change during a test.', 'Learn strings, numbers, booleans, null, undefined, arrays, objects, and functions because Playwright examples use all of them.', examples.variables],
      ['Naming Conventions', 'Level 1 - JavaScript Foundations', 'Variables, let, const and Data Types', 'Good names make automation code readable. Use camelCase for variables and functions, PascalCase for classes, and clear names for locators and test data.', 'Prefer names like loginButton, validUser, and expectedErrorMessage instead of short names like x or data1.', [{ title: 'Readable test names', code: 'const loginButton = page.getByRole("button", { name: "Login" });\nconst expectedErrorMessage = "Invalid credentials";' }]],
      ['Operators', 'Level 1 - JavaScript Foundations', 'Variables, let, const and Data Types', 'Operators compare values, combine strings, calculate numbers, and build conditions. Automation code commonly uses ===, !==, &&, ||, !, +, and ternary expressions.', 'Understand strict comparison because test assertions should not depend on type coercion.', examples.operators],
      ['Conditions (if, else, switch)', 'Level 1 - JavaScript Foundations', 'Operators', 'Conditions let tests decide what to do based on runtime state. Use them carefully for setup, optional cleanup, environment choices, and readable helper logic.', 'In Playwright tests, prefer assertions for expected behavior and conditions for control flow around setup or reusable utilities.', examples.conditions],
      ['Loops', 'Level 1 - JavaScript Foundations', 'Conditions (if, else, switch)', 'Loops repeat statements for lists of test data, menu items, rows, or API records. Start with for loops, then learn while and for...of for readable iteration.', 'Use loops when repeated checks are expected, not to hide unrelated tests inside one large test.', examples.loops],
      ['Functions', 'Level 1 - JavaScript Foundations', 'Loops', 'Functions group repeated actions such as login, createUser, fillAddress, or readApiResponse. A good function should do one clear job and return useful data when needed.', 'Playwright projects rely heavily on helper functions and page object methods.', [{ title: 'Reusable helper', code: 'function buildEmail(name) {\n  return name.toLowerCase() + "@test.com";\n}\n\nconsole.log(buildEmail("Wasim"));' }]],
      ['Scope', 'Level 1 - JavaScript Foundations', 'Functions', 'Scope controls where a variable can be used. let and const are block-scoped, which helps prevent test data from leaking between loops, functions, and test cases.', 'Understanding scope prevents common bugs in fixtures, hooks, and helper functions.', [{ title: 'Block scope', code: 'function printRole() {\n  const role = "admin";\n  console.log(role);\n}\n\nprintRole();\n// console.log(role); // role is not available here' }]],
      ['Hoisting', 'Level 1 - JavaScript Foundations', 'Scope', 'Hoisting explains why some declarations are available before the line where they appear. Function declarations are hoisted, while let and const remain unavailable before declaration.', 'For clean automation code, declare variables before using them and avoid relying on hoisting tricks.', examples.hoisting],
      ['Strings', 'Level 2 - Working with Data', 'Variables, Operators, and Functions', 'Strings represent URLs, locators, labels, messages, request bodies, and environment values. Learn length, includes, trim, toLowerCase, split, and replace.', 'String methods are useful when validating UI text, API messages, and generated test data.', [{ title: 'String checks', code: 'const errorMessage = " Invalid credentials ";\nconsole.log(errorMessage.trim());\nconsole.log(errorMessage.toLowerCase().includes("invalid"));' }]],
      ['Arrays', 'Level 2 - Working with Data', 'Loops and Data Types', 'Arrays store multiple values in one variable, such as users, roles, products, countries, or expected table rows. Access values by index and loop through them.', 'Arrays are the base for data-driven Playwright tests.', examples.arrays],
      ['Objects', 'Level 2 - Working with Data', 'Arrays', 'Objects group related data using named properties. They are better than arrays when values need meaning, such as username, password, role, and expectedMessage.', 'Playwright configs, API payloads, fixtures, and page objects all use object syntax.', [{ title: 'Object test data', code: 'const validUser = {\n  username: "standard_user",\n  password: "secret_sauce",\n  role: "buyer"\n};\n\nconsole.log(validUser.username);' }]],
      ['Array Methods', 'Level 2 - Working with Data', 'Arrays and Functions', 'Array methods help transform and inspect test data. Learn push, pop, shift, unshift, map, filter, find, includes, some, every, and forEach.', 'Use these methods to prepare expected values, find records, and validate groups of results.', examples.arrayMethods],
      ['Higher Order Functions', 'Level 2 - Working with Data', 'Functions and Array Methods', 'A higher order function accepts another function or returns a function. Methods like map, filter, and find are higher order functions you will use with test data.', 'They make data preparation cleaner than manual loops when the transformation is simple.', [{ title: 'Filter and map', code: 'const users = [\n  { name: "Asha", active: true },\n  { name: "Ravi", active: false }\n];\n\nconst activeNames = users.filter(user => user.active).map(user => user.name);\nconsole.log(activeNames);' }]],
      ['JSON Basics', 'Level 2 - Working with Data', 'Objects and Arrays', 'JSON is the common data format for APIs, fixtures, and test data files. Learn how JSON maps to JavaScript objects and arrays.', 'Playwright API tests often send JSON payloads and validate JSON responses.', [{ title: 'JSON parse and stringify', code: 'const payload = { username: "qa_user", active: true };\nconst jsonText = JSON.stringify(payload);\nconst parsed = JSON.parse(jsonText);\nconsole.log(parsed.username);' }]],
      ['Template Literals', 'Level 3 - Modern JavaScript (ES6+)', 'Strings and Variables', 'Template literals use backticks to build readable dynamic strings. They are useful for URLs, messages, locator text, and logs.', 'Use ${value} instead of long string concatenation when inserting variables.', [{ title: 'Dynamic URL', code: 'const userId = 42;\nconst apiUrl = `https://api.example.com/users/${userId}`;\nconsole.log(apiUrl);' }]],
      ['Arrow Functions', 'Level 3 - Modern JavaScript (ES6+)', 'Functions', 'Arrow functions are compact function expressions. You will see them in Playwright tests, array methods, callbacks, and async test blocks.', 'Learn the syntax first, then use it where it improves readability.', [{ title: 'Arrow function', code: 'const buildUsername = name => name.toLowerCase() + "_test";\nconsole.log(buildUsername("Admin"));\n\nconst testSteps = ["open", "login", "assert"];\ntestSteps.forEach(step => console.log(step));' }]],
      ['Destructuring', 'Level 3 - Modern JavaScript (ES6+)', 'Objects and Arrays', 'Destructuring pulls values out of objects and arrays into variables. It is common in Playwright fixtures and configuration code.', 'This topic prepares you for syntax like test("name", async ({ page }) => { ... }).', [{ title: 'Object destructuring', code: 'const user = { username: "standard_user", password: "secret_sauce" };\nconst { username, password } = user;\nconsole.log(username, password);\n\nasync function example({ page }) {\n  console.log(page);\n}' }]],
      ['Spread Operator', 'Level 3 - Modern JavaScript (ES6+)', 'Arrays and Objects', 'The spread operator copies or combines arrays and objects. It helps create test data variations without changing the original object.', 'Use it to override one or two fields in a base payload.', [{ title: 'Copy and override payload', code: 'const baseUser = { role: "buyer", active: true };\nconst adminUser = { ...baseUser, role: "admin" };\nconsole.log(adminUser);' }]],
      ['Rest Parameters', 'Level 3 - Modern JavaScript (ES6+)', 'Functions and Spread Operator', 'Rest parameters collect remaining function arguments into an array. They are useful for flexible helpers that accept any number of values.', 'Do not overuse them; typed objects are often clearer in TypeScript.', [{ title: 'Rest parameter helper', code: 'function logSteps(testName, ...steps) {\n  console.log(testName);\n  steps.forEach(step => console.log(step));\n}\n\nlogSteps("Login test", "open page", "enter user", "assert dashboard");' }]],
      ['Default Parameters', 'Level 3 - Modern JavaScript (ES6+)', 'Functions', 'Default parameters give a function fallback values. They make helpers easier to call when most tests use the same option.', 'They are useful for timeouts, roles, environments, and optional form values.', [{ title: 'Default role', code: 'function createUser(name, role = "viewer") {\n  return { name, role };\n}\n\nconsole.log(createUser("Asha"));\nconsole.log(createUser("Ravi", "admin"));' }]],
      ['Optional Chaining', 'Level 3 - Modern JavaScript (ES6+)', 'Objects', 'Optional chaining safely reads nested properties when a value may be missing. It prevents runtime errors while inspecting optional API response fields.', 'Use it for optional data, not to hide required missing values that should fail a test.', [{ title: 'Safe nested read', code: 'const response = { user: { profile: { city: "Noida" } } };\nconsole.log(response.user?.profile?.city);\nconsole.log(response.user?.address?.pinCode);' }]],
      ['Nullish Coalescing', 'Level 3 - Modern JavaScript (ES6+)', 'Optional Chaining', 'Nullish coalescing uses a fallback only when the value is null or undefined. It is safer than || when 0, false, or an empty string are valid values.', 'Use ?? for default values in test configuration and optional API fields.', [{ title: 'Safe fallback', code: 'const retryCount = 0;\nconst finalRetryCount = retryCount ?? 2;\nconsole.log(finalRetryCount); // 0' }]],
      ['DOM Basics', 'Level 4 - Browser Concepts', 'Objects and Functions', 'The DOM is the browser representation of a web page. Playwright interacts with DOM elements through locators, actions, and assertions.', 'You do not need frontend development depth, but you should know what elements, attributes, text, and hierarchy mean.', [{ title: 'DOM idea', code: '<button id="login">Login</button>\n<!-- Playwright locates and clicks this browser element. -->' }]],
      ['DOM Selectors', 'Level 4 - Browser Concepts', 'DOM Basics', 'Selectors identify elements on a page. Learn ids, classes, attributes, text, roles, and test ids so Playwright locators make sense.', 'Prefer user-facing locators like role, label, text, and test id over fragile CSS when possible.', [{ title: 'Selector examples', code: 'page.getByRole("button", { name: "Login" });\npage.getByLabel("Email");\npage.getByTestId("checkout-button");\npage.locator("#login");' }]],
      ['DOM Manipulation', 'Level 4 - Browser Concepts', 'DOM Selectors', 'DOM manipulation means changing elements, text, attributes, or values. Automation engineers mainly learn this to understand how applications update after actions.', 'In Playwright, prefer user actions and assertions instead of directly changing the DOM unless you are doing a special setup.', [{ title: 'Concept only', code: 'document.querySelector("#message").textContent = "Saved";\n// In Playwright, assert the user-visible result instead.' }]],
      ['Events', 'Level 4 - Browser Concepts', 'DOM Basics and Functions', 'Events happen when users click, type, submit, hover, upload, or navigate. Playwright actions trigger real browser events.', 'Understanding events helps when debugging why a click, fill, select, or keyboard action behaves differently than expected.', [{ title: 'Event idea', code: 'button.addEventListener("click", () => {\n  console.log("Login clicked");\n});' }]],
      ['Forms and Input Handling', 'Level 4 - Browser Concepts', 'DOM Selectors and Events', 'Forms contain inputs, labels, checkboxes, radio buttons, selects, buttons, validation messages, and submit behavior. These are daily automation targets.', 'Learn how values are entered and validated so Playwright form tests are clear.', [{ title: 'Playwright form actions', code: 'await page.getByLabel("Email").fill("qa@example.com");\nawait page.getByLabel("Password").fill("secret");\nawait page.getByRole("button", { name: "Login" }).click();' }]],
      ['Local Storage and Session Storage', 'Level 4 - Browser Concepts', 'Browser Concepts Basics', 'Browser storage keeps values such as tokens, preferences, carts, and feature flags. Local storage persists longer than session storage.', 'Playwright can inspect or set storage state, which is useful for authenticated tests and environment setup.', [{ title: 'Storage concept', code: 'localStorage.setItem("theme", "dark");\nconsole.log(localStorage.getItem("theme"));' }]],
      ['Callbacks', 'Level 5 - Asynchronous JavaScript', 'Functions and Events', 'A callback is a function passed to another function to run later. Callbacks explain older async patterns and event-based code.', 'You mainly need callbacks to understand how JavaScript evolved into Promises and async/await.', [{ title: 'Callback example', code: 'function runStep(stepName, done) {\n  console.log(stepName);\n  done();\n}\n\nrunStep("Open page", () => console.log("Step complete"));' }]],
      ['Promises', 'Level 5 - Asynchronous JavaScript', 'Callbacks', 'Promises represent work that finishes later. Browser actions, network calls, file reads, and Playwright commands are asynchronous.', 'Understand pending, fulfilled, rejected, then, catch, and why missing await causes flaky tests.', [{ title: 'Promise example', code: 'const loginResult = Promise.resolve("Login successful");\nloginResult.then(message => console.log(message));' }]],
      ['Async/Await', 'Level 5 - Asynchronous JavaScript', 'Promises', 'async/await is the main syntax for Playwright. await pauses your test until the browser action or assertion finishes.', 'This is one of the most important JavaScript topics for Playwright automation.', [{ title: 'Playwright-style async test', code: 'async function login(page) {\n  await page.goto("https://example.com/login");\n  await page.getByLabel("Email").fill("qa@example.com");\n  await page.getByRole("button", { name: "Login" }).click();\n}' }]],
      ['Fetch API', 'Level 5 - Asynchronous JavaScript', 'Async/Await and JSON Basics', 'fetch sends HTTP requests from JavaScript. It helps you understand request methods, headers, body, and response parsing before using Playwright APIRequestContext.', 'For Playwright projects, this knowledge transfers directly to API setup and validation.', [{ title: 'Fetch JSON response', code: 'const response = await fetch("https://api.example.com/users/1");\nconst body = await response.json();\nconsole.log(body);' }]],
      ['Error Handling', 'Level 5 - Asynchronous JavaScript', 'Async/Await', 'Error handling uses try, catch, finally, and thrown errors. It helps build reliable helpers and clearer failure messages.', 'In tests, let assertions fail naturally, but use error handling in setup, teardown, utilities, and reporting code.', [{ title: 'try catch', code: 'try {\n  await login(page);\n} catch (error) {\n  console.log("Login helper failed:", error.message);\n  throw error;\n}' }]],
      ['API Response Handling', 'Level 5 - Asynchronous JavaScript', 'Fetch API, JSON Basics, and Error Handling', 'API response handling means reading status codes, headers, JSON bodies, error payloads, and nested fields. It connects JavaScript data skills to API automation.', 'This prepares you for validating Playwright request responses and using API setup before UI tests.', [{ title: 'Validate response shape', code: 'const response = await request.get("/users/1");\nexpect(response.status()).toBe(200);\nconst body = await response.json();\nexpect(body.id).toBe(1);' }]],
      ['Why TypeScript', 'Level 6 - TypeScript Foundations', 'JavaScript Foundations through Async/Await', 'TypeScript adds types to JavaScript so mistakes are caught before tests run. It is especially helpful in Playwright frameworks with fixtures, page objects, and test data models.', 'Learn TypeScript after JavaScript basics so the types make sense instead of feeling like extra syntax.', [{ title: 'Why types help', code: 'function login(username: string, password: string) {\n  console.log(username, password);\n}\n\n// login(123, true); // TypeScript catches this' }]],
      ['TypeScript Setup', 'Level 6 - TypeScript Foundations', 'Why TypeScript', 'TypeScript setup means installing TypeScript, using tsconfig.json, and understanding how .ts files are checked or compiled. Playwright projects usually include this setup for you.', 'Know where types are configured so you can read framework errors confidently.', [{ title: 'Common setup commands', code: 'npm init playwright@latest\nnpx tsc --noEmit\n// Playwright can run .ts test files directly.' }]],
      ['Primitive Types', 'Level 6 - TypeScript Foundations', 'TypeScript Setup', 'Primitive types describe basic values: string, number, boolean, null, undefined, unknown, and void. They make function inputs and outputs clearer.', 'Start with simple annotations before learning object and union types.', [{ title: 'Primitive types', code: 'const username: string = "standard_user";\nconst retryCount: number = 2;\nconst isHeaded: boolean = false;' }]],
      ['Arrays and Objects in TypeScript', 'Level 6 - TypeScript Foundations', 'Primitive Types, Arrays, and Objects', 'TypeScript arrays and objects let you describe structured test data. This prevents missing fields and wrong value types in data-driven tests.', 'Use object types when a value has named fields and array types when you store lists.', [{ title: 'Typed test data', code: 'const roles: string[] = ["admin", "viewer"];\n\nconst user: { username: string; password: string; active: boolean } = {\n  username: "standard_user",\n  password: "secret_sauce",\n  active: true\n};' }]],
      ['Functions in TypeScript', 'Level 6 - TypeScript Foundations', 'Primitive Types and Functions', 'Typed functions define parameter and return types. This makes helpers, page object methods, and API utilities predictable.', 'A function should say what it needs and what it returns.', [{ title: 'Typed helper', code: 'function buildUserName(firstName: string, id: number): string {\n  return `${firstName.toLowerCase()}_${id}`;\n}' }]],
      ['Interfaces', 'Level 6 - TypeScript Foundations', 'Arrays and Objects in TypeScript', 'Interfaces describe object shapes. They are commonly used for test users, API payloads, page object constructor options, and fixture values.', 'Use interfaces when several functions share the same object structure.', [{ title: 'Interface for test data', code: 'interface LoginUser {\n  username: string;\n  password: string;\n  role: string;\n}\n\nconst validUser: LoginUser = {\n  username: "standard_user",\n  password: "secret_sauce",\n  role: "buyer"\n};' }]],
      ['Type Aliases', 'Level 6 - TypeScript Foundations', 'Interfaces', 'Type aliases give a name to a type. They are useful for unions, function shapes, and simple object models.', 'Use a type alias when it makes code easier to read or when you need union types.', [{ title: 'Type alias', code: 'type Environment = "local" | "qa" | "stage";\ntype LoginResult = { success: boolean; message: string };\n\nconst env: Environment = "qa";' }]],
      ['Union Types', 'Level 6 - TypeScript Foundations', 'Type Aliases and Primitive Types', 'Union types allow a value to be one of several valid types or values. They are great for fixed options like browser names, environments, roles, and statuses.', 'Use unions instead of loose strings when only specific values are allowed.', [{ title: 'Allowed browser names', code: 'type BrowserName = "chromium" | "firefox" | "webkit";\nconst browserName: BrowserName = "chromium";' }]],
      ['Optional Properties', 'Level 6 - TypeScript Foundations', 'Interfaces and Union Types', 'Optional properties mark fields that may not exist. They are common in API responses, config objects, and helper options.', 'Combine optional properties with optional chaining when reading values.', [{ title: 'Optional property', code: 'interface UserProfile {\n  name: string;\n  city?: string;\n}\n\nconst profile: UserProfile = { name: "Asha" };\nconsole.log(profile.city ?? "City not provided");' }]],
      ['Enums', 'Level 6 - TypeScript Foundations', 'Union Types', 'Enums group named constants. Some teams prefer string unions, but enums are still useful to recognize in existing frameworks.', 'Learn them so you can read projects that use enums for roles, statuses, or environments.', [{ title: 'Enum example', code: 'enum TestStatus {\n  Passed = "passed",\n  Failed = "failed",\n  Skipped = "skipped"\n}\n\nconst status: TestStatus = TestStatus.Passed;' }]],
      ['Classes', 'Level 7 - Advanced TypeScript', 'Functions in TypeScript and Objects', 'Classes are blueprints for objects. Playwright page object models often use classes to group locators and actions for a page.', 'Learn constructors, properties, and methods before adding inheritance or generics.', [{ title: 'Page object class', code: 'class LoginPage {\n  constructor(private page: Page) {}\n\n  async open() {\n    await this.page.goto("/login");\n  }\n}' }]],
      ['Access Modifiers', 'Level 7 - Advanced TypeScript', 'Classes', 'Access modifiers control where class properties and methods can be used. public is open, private is internal, and protected is available to child classes.', 'Use them to keep page object internals clean and expose only useful actions.', [{ title: 'Private page field', code: 'class DashboardPage {\n  constructor(private page: Page) {}\n\n  async titleText() {\n    return this.page.getByRole("heading").textContent();\n  }\n}' }]],
      ['Inheritance', 'Level 7 - Advanced TypeScript', 'Classes and Access Modifiers', 'Inheritance lets one class reuse behavior from another class. It can reduce duplication for shared page behavior, but too much inheritance can make frameworks hard to follow.', 'Use it only when pages truly share behavior; composition is often simpler.', [{ title: 'Base page idea', code: 'class BasePage {\n  constructor(protected page: Page) {}\n\n  async waitForLoad() {\n    await this.page.waitForLoadState("networkidle");\n  }\n}\n\nclass LoginPage extends BasePage {}' }]],
      ['Generics', 'Level 7 - Advanced TypeScript', 'Functions in TypeScript and Type Aliases', 'Generics let functions, classes, and types work with different data shapes while keeping type safety. They are useful for reusable API helpers and fixture utilities.', 'Start with simple generic functions before using advanced framework patterns.', [{ title: 'Typed API helper', code: 'async function parseJson<T>(response: APIResponse): Promise<T> {\n  return await response.json() as T;\n}' }]],
      ['Modules', 'Level 7 - Advanced TypeScript', 'Functions, Classes, and TypeScript Setup', 'Modules split code into separate files. A Playwright framework uses modules for tests, page objects, fixtures, utilities, and test data.', 'Learn how files share code without placing everything in one large test file.', [{ title: 'Module structure idea', code: 'tests/login.spec.ts\npages/LoginPage.ts\nutils/testData.ts\nfixtures/base.ts' }]],
      ['Import and Export', 'Level 7 - Advanced TypeScript', 'Modules', 'import and export move functions, classes, types, and data between files. This is essential for Playwright framework organization.', 'Know default exports and named exports, but prefer consistent named exports in team frameworks.', [{ title: 'Named export and import', code: '// pages/LoginPage.ts\nexport class LoginPage {}\n\n// tests/login.spec.ts\nimport { LoginPage } from "../pages/LoginPage";' }]],
      ['Utility Types', 'Level 7 - Advanced TypeScript', 'Interfaces, Type Aliases, and Generics', 'Utility types transform existing types. Learn Partial, Pick, Omit, Record, Readonly, and Awaited because they appear in test data builders and framework helpers.', 'Use utility types to avoid copying similar interfaces again and again.', [{ title: 'Partial test data', code: 'interface User {\n  username: string;\n  password: string;\n  role: string;\n}\n\ntype UserUpdate = Partial<User>;\ntype Credentials = Pick<User, "username" | "password">;' }]],
      ['Type Guards', 'Level 7 - Advanced TypeScript', 'Union Types and Error Handling', 'Type guards narrow a broad type into a specific type using checks like typeof, in, instanceof, or custom guard functions. They make helpers safe when responses may vary.', 'Use type guards when API responses, errors, or config values can have different shapes.', [{ title: 'Custom type guard', code: 'type ApiError = { error: string };\n\nfunction isApiError(value: unknown): value is ApiError {\n  return typeof value === "object" && value !== null && "error" in value;\n}' }]]
    ];

    return items.map(function(item) {
      return lesson(
        slugify('playwright-js-ts-' + item[1] + '-' + item[0]),
        item[0],
        [
          'Level: ' + item[1],
          'Prerequisite: ' + item[2],
          item[3],
          item[4]
        ],
        'Practice: Create a tiny Playwright-focused example for this topic, then explain where it would appear in a real test framework.',
        item[5] || []
      );
    });
  }

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

  function displayTopicTitle(topic) {
    return String(topic && topic.title ? topic.title : '').replace(/^\d+\.\s*/, '');
  }

  function renderTopicUi(topic) {
    if (!topic.ui || !topic.ui.length) return '';
    return topic.ui.map(function(block) {
      if (block.type === 'table') {
        return [
          '<section class="ai-ui-block">',
          '<h3>' + escapeHtml(block.title) + '</h3>',
          '<div class="ai-ui-table-wrap"><table class="ai-ui-table">',
          '<thead><tr>' + block.headers.map(function(header) { return '<th>' + escapeHtml(header) + '</th>'; }).join('') + '</tr></thead>',
          '<tbody>' + block.rows.map(function(row) {
            return '<tr>' + row.map(function(cell) { return '<td>' + escapeHtml(cell) + '</td>'; }).join('') + '</tr>';
          }).join('') + '</tbody>',
          '</table></div>',
          '</section>'
        ].join('');
      }
      if (block.type === 'flow') {
        return [
          '<section class="ai-ui-block">',
          '<h3>' + escapeHtml(block.title) + '</h3>',
          '<div class="ai-ui-flow">',
          block.steps.map(function(step, index) {
            return '<span>' + escapeHtml(step) + '</span>' + (index < block.steps.length - 1 ? '<i aria-hidden="true">&rarr;</i>' : '');
          }).join(''),
          '</div>',
          '</section>'
        ].join('');
      }
      if (block.type === 'callout') {
        var tone = block.tone === 'warning' ? 'warning' : 'info';
        return [
          '<aside class="ai-ui-callout ai-ui-callout--' + tone + '" role="note">',
          '<h3>' + escapeHtml(block.title) + '</h3>',
          '<p>' + escapeHtml(block.text) + '</p>',
          '</aside>'
        ].join('');
      }
      if (block.type === 'checklist') {
        return [
          '<section class="ai-ui-block">',
          '<h3>' + escapeHtml(block.title) + '</h3>',
          '<ul class="ai-ui-checklist">',
          block.items.map(function(item) { return '<li>' + escapeHtml(item) + '</li>'; }).join(''),
          '</ul>',
          '</section>'
        ].join('');
      }
      return '';
    }).join('');
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
    if (track.readOnly) return track.topics.slice();
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
    if (window.TestNovaArraysPlayground && topic.id === window.TestNovaArraysPlayground.topicId) {
      return [
        '<label class="ai-reader-complete">',
        '<input type="checkbox" data-reader-complete="' + topic.id + '"' + (progress[topic.id] ? ' checked' : '') + ' />',
        '<span>Mark this topic complete</span>',
        '</label>',
        window.TestNovaArraysPlayground.render()
      ].join('');
    }
    var contentKey = track.storageKey + ':content:' + topic.id;
    if (track.contentVersion) {
      contentKey = track.storageKey + ':content:v' + track.contentVersion + ':' + topic.id;
    }
    var savedContent = track.readOnly ? '' : localStorage.getItem(contentKey);
    if (savedContent) {
      savedContent = savedContent.replace(/<div class="ai-inline-save-panel"[\s\S]*?<\/div>/g, '');
    }
    var body = savedContent || [
      '<div class="ai-reader-topic-kicker">Topic ' + (index + 1) + '</div>',
      '<h2 data-topic-title>' + escapeHtml(displayTopicTitle(topic)) + '</h2>',
      topic.paragraphs.map(function (paragraph) { return '<p>' + escapeHtml(paragraph) + '</p>'; }).join(''),
      topic.examples && topic.examples.length ? topic.examples.map(function (example) {
        var languageClass = example.language ? ' class="language-' + escapeHtml(example.language) + '"' : '';
        return [
          '<div class="ai-code-example">',
          '<div class="ai-code-example-header"><h3>' + escapeHtml(example.title) + '</h3><span>' + escapeHtml(example.language || 'javascript') + '</span><button type="button" class="ai-code-copy" data-code-copy aria-label="Copy code">Copy</button></div>',
          '<pre><code' + languageClass + '>' + escapeHtml(example.code) + '</code></pre>',
          example.explanation ? '<p class="ai-code-explanation">' + escapeHtml(example.explanation) + '</p>' : '',
          '</div>'
        ].join('');
      }).join('') : '',
      renderTopicUi(topic),
      topic.resources && topic.resources.length ? [
        '<div class="ai-resource-row">',
        topic.resources.map(function (resource) {
          return '<a class="primary-btn" href="' + escapeHtml(resource.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(resource.label) + '</a>';
        }).join(''),
        '</div>'
      ].join('') : '',
      ''
    ].join('');

    if (track.readOnly) {
      return [
        '<label class="ai-reader-complete">',
        '<input type="checkbox" data-reader-complete="' + topic.id + '"' + (progress[topic.id] ? ' checked' : '') + ' />',
        '<span>Mark this topic complete</span>',
        '</label>',
        '<div class="ai-reader-edit-body" data-reader-body>' + body + '</div>'
      ].join('');
    }

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
      var contentKey = track.storageKey + ':content:' + editBody.getAttribute('data-topic-edit');
      if (track.contentVersion) {
        contentKey = track.storageKey + ':content:v' + track.contentVersion + ':' + editBody.getAttribute('data-topic-edit');
      }
      localStorage.setItem(contentKey, editBody.innerHTML);
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
      if (window.TestNovaArraysPlayground) window.TestNovaArraysPlayground.destroy();
      var topic = topics.find(function (item) { return item.id === id; }) || topics[0];
      currentTopic = topic.id;
      var index = topics.indexOf(topic);
      content.innerHTML = renderTopicHtml(track, topic, index, progress);
      content.querySelectorAll('[data-code-copy]').forEach(function (button) {
        button.addEventListener('click', function () {
          var code = button.closest('.ai-code-example').querySelector('code');
          var value = code ? code.textContent : '';
          navigator.clipboard.writeText(value).then(function () {
            button.textContent = 'Copied';
            button.setAttribute('aria-label', 'Code copied');
            setTimeout(function () {
              button.textContent = 'Copy';
              button.setAttribute('aria-label', 'Copy code');
            }, 1400);
          }).catch(function () {
            if (saveState) saveState.textContent = 'Copy failed. Select and copy the code manually.';
          });
        });
      });

      if (window.TestNovaArraysPlayground && topic.id === window.TestNovaArraysPlayground.topicId) {
        window.TestNovaArraysPlayground.mount(content.querySelector('[data-arrays-playground]'));
      }
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
            showTopicToast(displayTopicTitle(topic));
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
            '<button type="button" data-topic-link="' + topic.id + '">',
            '<span>' + (index + 1) + '</span>',
            '<strong>' + escapeHtml(displayTopicTitle(topic)) + '</strong>',
            '</button>'
          ].join('');
        }).join(''),
        track.readOnly ? '' : [
          '<button class="ai-add-topic-btn" type="button" data-add-topic>',
          '<span>+</span>',
          '<strong>Add topic</strong>',
          '</button>'
        ].join('')
      ].join('');

      nav.querySelectorAll('[data-topic-link]').forEach(function (link) {
        link.addEventListener('click', function (event) {
          event.preventDefault();
          event.stopPropagation();
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
        var editBody = content.querySelector('[data-reader-body], [data-topic-edit]');
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
