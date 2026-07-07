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
          'TypeScript adds static types to JavaScript so issues can be caught earlier during development.',
          'Types make function contracts, object shapes, and expected values clearer.',
          'TypeScript compiles to JavaScript, so it works with normal browser and Node.js environments.'
        ], 'Add types to a function that receives a user object and returns a display label.'),
        lesson('interfaces-types', 'Interfaces, Types & Generics', [
          'Interfaces and type aliases describe object shapes and reusable contracts.',
          'Generics let functions and components work with different data types while keeping type safety.',
          'Use simple types first. Add advanced types only when they improve clarity.'
        ], 'Create a reusable API response type with data, status, and error fields.'),
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
      storageKey: 'testnova-reader-playwright',
      title: 'Playwright',
      topics: [
        lesson('playwright-introduction', 'Playwright Introduction', [
          'Playwright is a modern end-to-end testing framework for web applications.',
          'It can automate Chromium, Firefox, and WebKit, and supports reliable browser interactions, assertions, tracing, screenshots, and reports.',
          'A good Playwright test checks user-visible behavior instead of internal implementation details.'
        ], 'Create a test that opens a page, checks the title, and verifies a visible heading.'),
        lesson('setup-config', 'Setup & Configuration', [
          'A Playwright project usually includes a config file, test directory, browser projects, retries, reporter settings, and base URL.',
          'Configuration keeps tests consistent across local, CI, staging, and production environments.',
          'Use environment variables for URLs and secrets instead of hardcoding them.'
        ], 'Define a base URL and two browser projects in a Playwright config file.'),
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
        ], 'Design a folder structure for a Playwright framework with tests, pages, fixtures, data, and utilities.')
      ]
    }
  };

  function lesson(id, title, paragraphs, practice) {
    return { id: id, title: title, paragraphs: paragraphs, practice: practice };
  }

  function loadJson(key) {
    try { return JSON.parse(localStorage.getItem(key) || '{}') || {}; } catch (e) { return {}; }
  }

  function saveJson(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
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
      '<h2 data-topic-title>' + topic.title + '</h2>',
      topic.paragraphs.map(function (paragraph) { return '<p>' + paragraph + '</p>'; }).join(''),
      '<div class="ai-topic-practice"><strong>Try this:</strong><span>' + topic.practice + '</span></div>',
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
    var currentTopic = track.topics[0].id;
    var saveTimer = null;

    function updateProgress() {
      var done = track.topics.filter(function (topic) { return progress[topic.id]; }).length;
      var total = track.topics.length;
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

    function openTopic(id) {
      saveCurrentContent();
      var topic = track.topics.find(function (item) { return item.id === id; }) || track.topics[0];
      currentTopic = topic.id;
      var index = track.topics.indexOf(topic);
      content.innerHTML = renderTopicHtml(track, topic, index, progress);

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
    }

    nav.innerHTML = track.topics.map(function (topic, index) {
      return [
        '<button type="button" data-topic-link="' + topic.id + '">',
        '<span>' + (index + 1) + '</span>',
        '<strong>' + topic.title + '</strong>',
        '</button>'
      ].join('');
    }).join('');

    nav.querySelectorAll('[data-topic-link]').forEach(function (button) {
      button.addEventListener('click', function (event) {
        openTopic(button.getAttribute('data-topic-link'));
      });
    });

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
    updateProgress();
    openTopic(currentTopic);
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
