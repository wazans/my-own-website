(function () {
  'use strict';

  var TOPIC_ID = 'playwright-js-ts-level-2-working-with-data-arrays';
  var STORAGE_PREFIX = 'testnova-playground:' + TOPIC_ID + ':';
  var RUN_TIMEOUT_MS = 2500;
  var activeController = null;

  var EXAMPLES = [
    example('array-create', 'Creating an array', 'An array keeps several related values together in one variable.',
      'const browsers = ["Chromium", "Firefox", "WebKit"];\n\nconsole.log(browsers);',
      'const browsers: string[] = ["Chromium", "Firefox", "WebKit"];\n\nconsole.log(browsers);',
      ['An array named browsers is created with three browser names.', 'console.log() prints the complete array in the Output panel.']),
    example('array-index', 'Accessing array values using an index', 'Indexes identify array positions and start at 0.',
      'const browsers = ["Chromium", "Firefox", "WebKit"];\n\nconsole.log(browsers[0]);\nconsole.log(browsers[2]);',
      'const browsers: string[] = ["Chromium", "Firefox", "WebKit"];\n\nconsole.log(browsers[0]);\nconsole.log(browsers[2]);',
      ['The browsers array contains three values.', 'browsers[0] reads the first value and browsers[2] reads the third.', 'Both selected values are printed.']),
    example('array-update', 'Updating an array value', 'Assign a new value to an existing index to update that position.',
      'const testStatus = ["Passed", "Failed", "Skipped"];\n\ntestStatus[1] = "Retest";\n\nconsole.log(testStatus);',
      'const testStatus: string[] = ["Passed", "Failed", "Skipped"];\n\ntestStatus[1] = "Retest";\n\nconsole.log(testStatus);',
      ['testStatus starts with three status values.', 'Index 1 is the second value, so "Failed" is replaced with "Retest".', 'The updated array is printed.']),
    example('array-length', 'Finding the array length', 'The length property tells you how many values an array contains.',
      'const testCases = ["Login", "Search", "Checkout", "Logout"];\n\nconsole.log(`Total test cases: ${testCases.length}`);',
      'const testCases: string[] = ["Login", "Search", "Checkout", "Logout"];\n\nconsole.log(`Total test cases: ${testCases.length}`);',
      ['testCases is created with four names.', 'testCases.length returns 4.', 'A template literal includes that number in the printed message.']),
    example('array-push', 'Adding values using push()', 'push() adds one or more values to the end of an array.',
      'const browsers = ["Chromium", "Firefox"];\n\nbrowsers.push("WebKit");\n\nconsole.log(browsers);',
      'const browsers: string[] = ["Chromium", "Firefox"];\n\nbrowsers.push("WebKit");\n\nconsole.log(browsers);',
      ['browsers begins with two values.', 'push() adds "WebKit" to the end.', 'The array with all three browsers is printed.']),
    example('array-pop', 'Removing values using pop()', 'pop() removes and returns the final value in an array.',
      'const testCases = ["Login", "Search", "Checkout"];\n\nconst removedTest = testCases.pop();\n\nconsole.log(testCases);\nconsole.log(`Removed: ${removedTest}`);',
      'const testCases: string[] = ["Login", "Search", "Checkout"];\n\nconst removedTest: string | undefined = testCases.pop();\n\nconsole.log(testCases);\nconsole.log(`Removed: ${removedTest}`);',
      ['testCases begins with three values.', 'pop() removes "Checkout" and stores it in removedTest.', 'The remaining array and removed value are printed.']),
    example('array-foreach', 'Looping with forEach()', 'forEach() runs a callback once for every array value.',
      'const testCases = ["Login", "Search", "Checkout"];\n\ntestCases.forEach((testCase, index) => {\n  console.log(`${index + 1}. ${testCase}`);\n});',
      'const testCases: string[] = ["Login", "Search", "Checkout"];\n\ntestCases.forEach((testCase: string, index: number) => {\n  console.log(`${index + 1}. ${testCase}`);\n});',
      ['forEach() visits each test case in order.', 'The callback receives the current value and its numeric index.', 'Each test name is printed with a number starting at 1.']),
    example('array-map', 'Creating a new array with map()', 'map() transforms every value and returns a new array.',
      'const testNames = ["login", "search", "checkout"];\n\nconst formattedNames = testNames.map((name) => {\n  return name.toUpperCase();\n});\n\nconsole.log(formattedNames);',
      'const testNames: string[] = ["login", "search", "checkout"];\n\nconst formattedNames: string[] = testNames.map((name: string) => {\n  return name.toUpperCase();\n});\n\nconsole.log(formattedNames);',
      ['map() visits each lower-case test name.', 'The callback returns an upper-case version of each value.', 'map() stores those returned values in a new formattedNames array, which is printed.']),
    example('array-filter', 'Selecting values with filter()', 'filter() returns a new array containing only values that pass a condition.',
      'const executionTimes = [2, 8, 3, 12, 5];\n\nconst slowTests = executionTimes.filter((time) => {\n  return time > 5;\n});\n\nconsole.log(slowTests);',
      'const executionTimes: number[] = [2, 8, 3, 12, 5];\n\nconst slowTests: number[] = executionTimes.filter((time: number) => {\n  return time > 5;\n});\n\nconsole.log(slowTests);',
      ['executionTimes contains five durations.', 'filter() keeps only durations greater than 5.', 'The new slowTests array is printed.']),
    example('array-find', 'Finding one value with find()', 'find() returns the first value that passes a condition, or undefined.',
      'const statuses = ["Passed", "Passed", "Failed", "Skipped"];\n\nconst failedStatus = statuses.find((status) => {\n  return status === "Failed";\n});\n\nconsole.log(failedStatus);',
      'const statuses: string[] = ["Passed", "Passed", "Failed", "Skipped"];\n\nconst failedStatus: string | undefined = statuses.find((status: string) => {\n  return status === "Failed";\n});\n\nconsole.log(failedStatus);',
      ['find() checks the statuses in order.', 'The callback looks for a value equal to "Failed".', 'The first matching value is stored in failedStatus and printed.']),
    example('array-playwright-data', 'Practical Playwright test-data array example', 'An array of typed objects can supply several data sets to the same test.',
      'const loginTestData = [\n  {\n    username: "valid-user@testnova.in",\n    password: "Valid@123",\n    expectedResult: "Login successful"\n  },\n  {\n    username: "invalid-user@testnova.in",\n    password: "WrongPassword",\n    expectedResult: "Login failed"\n  }\n];\n\nloginTestData.forEach((data) => {\n  console.log(`Testing user: ${data.username}`);\n  console.log(`Expected: ${data.expectedResult}`);\n});',
      'type LoginTestData = {\n  username: string;\n  password: string;\n  expectedResult: string;\n};\n\nconst loginTestData: LoginTestData[] = [\n  {\n    username: "valid-user@testnova.in",\n    password: "Valid@123",\n    expectedResult: "Login successful"\n  },\n  {\n    username: "invalid-user@testnova.in",\n    password: "WrongPassword",\n    expectedResult: "Login failed"\n  }\n];\n\nloginTestData.forEach((data: LoginTestData) => {\n  console.log(`Testing user: ${data.username}`);\n  console.log(`Expected: ${data.expectedResult}`);\n});',
      ['LoginTestData describes the required shape of each TypeScript data object.', 'loginTestData stores two login scenarios.', 'forEach() visits both objects and prints the username and expected result.'],
      'In a real Playwright test, this array can be used to run the same test with multiple sets of login data. This editor demonstrates the test-data concept only; it does not launch a Playwright browser.')
  ];

  function example(id, title, description, javascript, typescript, explanation, note) {
    return { id: id, title: title, description: description, javascript: javascript, typescript: typescript, explanation: explanation, note: note || '' };
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function storageKey(exampleId, suffix) {
    return STORAGE_PREFIX + exampleId + ':' + suffix;
  }

  function readStored(key, fallback) {
    try {
      var value = localStorage.getItem(key);
      return value === null ? fallback : value;
    } catch (error) {
      return fallback;
    }
  }

  function writeStored(key, value) {
    try { localStorage.setItem(key, value); } catch (error) {}
  }

  function render() {
    return [
      '<div class="arrays-playground" data-arrays-playground contenteditable="false">',
      '<div class="ai-reader-topic-kicker">Interactive topic</div>',
      '<h2>Working with Data: Arrays</h2>',
      '<p class="arrays-playground-intro">An array stores multiple values inside one variable. In Playwright, arrays are commonly used for test data, dropdown options, table values and multiple test cases.</p>',
      EXAMPLES.map(renderCard).join(''),
      '</div>'
    ].join('');
  }

  function renderCard(item, index) {
    var language = readStored(storageKey(item.id, 'language'), 'javascript');
    if (language !== 'typescript') language = 'javascript';
    var code = readStored(storageKey(item.id, language), item[language]);
    return [
      '<section class="array-playground-card" data-array-example="' + item.id + '">',
      '<div class="array-card-heading"><span class="array-card-number">' + (index + 1) + '</span><div><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.description) + '</p></div></div>',
      '<div class="array-language-tabs" role="group" aria-label="Select language for ' + escapeHtml(item.title) + '">',
      '<button type="button" data-language="javascript" aria-pressed="' + (language === 'javascript') + '" class="' + (language === 'javascript' ? 'is-active' : '') + '">JavaScript</button>',
      '<button type="button" data-language="typescript" aria-pressed="' + (language === 'typescript') + '" class="' + (language === 'typescript' ? 'is-active' : '') + '">TypeScript</button>',
      '</div>',
      '<label class="array-code-label" for="array-editor-' + item.id + '">Code</label>',
      '<textarea id="array-editor-' + item.id + '" class="array-code-editor" data-code-editor spellcheck="false" wrap="off" aria-label="' + escapeHtml(item.title) + ' code editor">' + escapeHtml(code) + '</textarea>',
      '<div class="array-card-actions">',
      '<button type="button" class="primary-btn array-run-btn" data-run>Run ' + (language === 'typescript' ? 'TypeScript' : 'JavaScript') + '</button>',
      '<button type="button" class="secondary-btn" data-reset>Reset</button>',
      '<button type="button" class="secondary-btn" data-copy>Copy Code</button>',
      '<span class="array-action-status" data-action-status role="status" aria-live="polite"></span>',
      '</div>',
      '<div class="array-results" data-results hidden>',
      '<section class="array-result-panel array-output-panel" data-output-panel hidden><h4>Output</h4><pre data-output></pre></section>',
      '<section class="array-result-panel array-explanation-panel" data-explanation-panel hidden><h4>Code Explanation</h4><ol data-explanation></ol></section>',
      '<section class="array-result-panel array-error-panel" data-error-panel hidden role="alert"><h4>Error</h4><div data-error></div><details data-technical-wrap hidden><summary>Technical details</summary><pre data-technical></pre></details></section>',
      '</div>',
      item.note ? '<p class="array-playwright-note">' + escapeHtml(item.note) + '</p>' : '',
      '</section>'
    ].join('');
  }

  function mount(root) {
    destroy();
    activeController = createController(root);
    return activeController;
  }

  function createController(root) {
    var workers = [];
    var timers = [];
    var destroyed = false;

    root.querySelectorAll('[data-array-example]').forEach(function (card) {
      var item = EXAMPLES.find(function (candidate) { return candidate.id === card.getAttribute('data-array-example'); });
      var editor = card.querySelector('[data-code-editor]');
      var runButton = card.querySelector('[data-run]');
      var languageButtons = card.querySelectorAll('[data-language]');
      var language = card.querySelector('[data-language].is-active').getAttribute('data-language');
      var hasRun = false;

      function clearResults() {
        hasRun = false;
        card.classList.remove('has-error', 'has-success');
        card.querySelector('[data-results]').hidden = true;
        ['[data-output-panel]', '[data-explanation-panel]', '[data-error-panel]'].forEach(function (selector) {
          card.querySelector(selector).hidden = true;
        });
        card.querySelector('[data-output]').textContent = '';
        card.querySelector('[data-explanation]').innerHTML = '';
        card.querySelector('[data-error]').innerHTML = '';
        card.querySelector('[data-technical]').textContent = '';
        card.querySelector('[data-technical-wrap]').hidden = true;
      }

      editor.addEventListener('input', function () {
        writeStored(storageKey(item.id, language), editor.value);
      });

      editor.addEventListener('keydown', function (event) {
        if (event.key !== 'Tab') return;
        event.preventDefault();
        var start = editor.selectionStart;
        editor.setRangeText('  ', start, editor.selectionEnd, 'end');
        editor.dispatchEvent(new Event('input', { bubbles: true }));
      });

      languageButtons.forEach(function (button) {
        button.addEventListener('click', function () {
          var nextLanguage = button.getAttribute('data-language');
          if (nextLanguage === language) return;
          language = nextLanguage;
          writeStored(storageKey(item.id, 'language'), language);
          editor.value = readStored(storageKey(item.id, language), item[language]);
          languageButtons.forEach(function (tab) {
            var selected = tab.getAttribute('data-language') === language;
            tab.classList.toggle('is-active', selected);
            tab.setAttribute('aria-pressed', String(selected));
          });
          runButton.textContent = 'Run ' + (language === 'typescript' ? 'TypeScript' : 'JavaScript');
          clearResults();
        });
      });

      card.querySelector('[data-reset]').addEventListener('click', function () {
        if (editor.value !== item[language] && !window.confirm('Reset this example to its original code?')) return;
        editor.value = item[language];
        writeStored(storageKey(item.id, language), editor.value);
        clearResults();
        editor.focus();
      });

      card.querySelector('[data-copy]').addEventListener('click', function (event) {
        var button = event.currentTarget;
        var original = button.textContent;
        function show(message) {
          button.textContent = message;
          window.setTimeout(function () { button.textContent = original; }, 1400);
        }
        if (!navigator.clipboard || !navigator.clipboard.writeText) {
          editor.select();
          show('Select and copy');
          return;
        }
        navigator.clipboard.writeText(editor.value).then(function () { show('Copied!'); })
          .catch(function () { editor.select(); show('Select and copy'); });
      });

      runButton.addEventListener('click', function () {
        if (runButton.disabled) return;
        clearResults();
        hasRun = true;
        setRunning(true);
        var source = editor.value;
        var compiled = language === 'typescript' ? compileTypeScript(source) : { code: source, diagnostics: [] };
        if (compiled.diagnostics.length) {
          showFailure(card, compiled.diagnostics[0], '', generateExplanation(source, item, language));
          setRunning(false);
          return;
        }
        try {
          executeInWorker(compiled.code, source, item, language, card, function (worker, timer) {
            workers.push(worker);
            timers.push(timer);
          }, function () { setRunning(false); });
        } catch (error) {
          showFailure(card, {
            kind: 'Execution Error',
            message: 'The secure code runner could not be started.',
            suggestion: 'Refresh the page and try again.',
            technical: error && error.stack ? error.stack : String(error)
          }, '', generateExplanation(source, item, language));
          setRunning(false);
        }
      });

      function setRunning(running) {
        runButton.disabled = running;
        languageButtons.forEach(function (button) { button.disabled = running; });
        runButton.textContent = running ? 'Running...' : 'Run ' + (language === 'typescript' ? 'TypeScript' : 'JavaScript');
        card.setAttribute('aria-busy', String(running));
      }
    });

    return {
      destroy: function () {
        destroyed = true;
        workers.forEach(function (worker) { try { worker.terminate(); } catch (error) {} });
        timers.forEach(function (timer) { clearTimeout(timer); });
        workers = [];
        timers = [];
      },
      isDestroyed: function () { return destroyed; }
    };
  }

  function compileTypeScript(source) {
    if (!window.ts) {
      return { code: '', diagnostics: [{ kind: 'TypeScript Error', message: 'The TypeScript compiler could not be loaded. Check your connection and try again.', line: null, suggestion: 'JavaScript examples can still run while the compiler is unavailable.' }] };
    }
    var fileName = 'student-example.ts';
    var libName = 'playground-lib.d.ts';
    var lib = [
      'interface Object {}', 'interface Function {}', 'interface CallableFunction extends Function {}',
      'interface NewableFunction extends Function {}', 'interface IArguments {}', 'interface String { toUpperCase(): string; toLowerCase(): string; }',
      'interface Number {}', 'interface Boolean {}', 'interface RegExp {}',
      'interface Array<T> { length: number; [n: number]: T; push(...items: T[]): number; pop(): T | undefined;',
      'forEach(callback: (value: T, index: number, array: T[]) => void): void;',
      'map<U>(callback: (value: T, index: number, array: T[]) => U): U[];',
      'filter(callback: (value: T, index: number, array: T[]) => boolean): T[];',
      'find(callback: (value: T, index: number, array: T[]) => boolean): T | undefined; }',
      'interface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }',
      'declare const console: { log(...data: unknown[]): void; info(...data: unknown[]): void; warn(...data: unknown[]): void; error(...data: unknown[]): void; };'
    ].join('\n');
    var options = { target: window.ts.ScriptTarget.ES2020, module: window.ts.ModuleKind.None, strict: true, noLib: true, skipLibCheck: true };
    var files = {};
    files[fileName] = source;
    files[libName] = lib;
    var host = {
      getSourceFile: function (name, target) { return files[name] == null ? undefined : window.ts.createSourceFile(name, files[name], target, true); },
      getDefaultLibFileName: function () { return libName; },
      writeFile: function (name, text) { files[name] = text; },
      getCurrentDirectory: function () { return ''; },
      getDirectories: function () { return []; },
      fileExists: function (name) { return files[name] != null; },
      readFile: function (name) { return files[name]; },
      getCanonicalFileName: function (name) { return name; },
      useCaseSensitiveFileNames: function () { return true; },
      getNewLine: function () { return '\n'; }
    };
    var program = window.ts.createProgram([fileName, libName], options, host);
    var diagnostics = window.ts.getPreEmitDiagnostics(program).filter(function (diagnostic) {
      return diagnostic.file && diagnostic.file.fileName === fileName;
    });
    if (diagnostics.length) return { code: '', diagnostics: diagnostics.map(normaliseTsDiagnostic) };
    var emit = program.emit();
    return { code: files['student-example.js'] || files['student-example.ts.js'] || '', diagnostics: emit.emitSkipped ? [{ kind: 'TypeScript Error', message: 'TypeScript could not compile this code.', line: null }] : [] };
  }

  function normaliseTsDiagnostic(diagnostic) {
    var line = diagnostic.file && typeof diagnostic.start === 'number'
      ? diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start).line + 1 : null;
    var message = window.ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    return { kind: 'TypeScript Error', message: message, line: line, suggestion: suggestionFor(message, true), technical: 'TS' + diagnostic.code + ': ' + message };
  }

  function executeInWorker(code, originalSource, item, language, card, register, done) {
    var workerSource = [
      'function format(value, seen, nested) {',
      ' if (value === undefined) return "undefined"; if (value === null) return "null";',
      ' if (typeof value === "string") return nested ? JSON.stringify(value) : value; if (typeof value === "number" || typeof value === "boolean" || typeof value === "bigint") return String(value);',
      ' if (typeof value === "function") return "[Function " + (value.name || "anonymous") + "]";',
      ' try { seen = seen || new WeakSet(); if (seen.has(value)) return "\\"[Circular]\\""; seen.add(value);',
      '  if (Array.isArray(value)) return "[" + value.map(function(item) { return format(item, seen, true); }).join(", ") + "]";',
      '  return "{" + Object.keys(value).map(function(key) { return JSON.stringify(key) + ": " + format(value[key], seen, true); }).join(", ") + "}";',
      ' } catch (error) { return String(value); }',
      '}',
      'var output = []; ["log","info","warn","error"].forEach(function(level) { console[level] = function() {',
      ' var values = Array.prototype.slice.call(arguments).map(function(value) { return format(value); }); output.push({ level: level, text: values.join(" ") });',
      '}; });',
      'self.onmessage = function(event) { try {',
      ' var run = new Function(event.data.code + "\\n//# sourceURL=student-example.js"); run();',
      ' self.postMessage({ ok: true, output: output });',
      '} catch (error) { var match = String(error && error.stack || "").match(/student-example\\.js:(\\d+):(\\d+)/);',
      ' self.postMessage({ ok: false, output: output, error: { name: error && error.name || "Error", message: error && error.message || String(error), line: match ? Math.max(1, Number(match[1]) - 2) : null, technical: error && error.stack || String(error) } });',
      '} };'
    ].join('\n');
    var blobUrl = URL.createObjectURL(new Blob([workerSource], { type: 'text/javascript' }));
    var worker = new Worker(blobUrl);
    var finished = false;
    var timer = setTimeout(function () {
      if (finished) return;
      finished = true;
      worker.terminate();
      URL.revokeObjectURL(blobUrl);
      showFailure(card, {
        kind: 'Execution stopped: your code took too long to finish. Check for an infinite loop.',
        message: '',
        suggestion: '',
        technical: 'Worker terminated after ' + RUN_TIMEOUT_MS + 'ms.'
      }, '', generateExplanation(originalSource, item, language));
      done();
    }, RUN_TIMEOUT_MS);
    register(worker, timer);
    worker.onmessage = function (event) {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      worker.terminate();
      URL.revokeObjectURL(blobUrl);
      var result = event.data;
      var output = result.output.map(function (entry) {
        return (entry.level === 'log' ? '' : '[' + entry.level + '] ') + entry.text;
      }).join('\n');
      if (result.ok) {
        showSuccess(card, output, generateExplanation(originalSource, item, language));
      } else {
        showFailure(card, {
          kind: result.error.name === 'SyntaxError' ? 'SyntaxError' : 'Runtime Error',
          message: result.error.message,
          line: result.error.line,
          suggestion: suggestionFor(result.error.message, false),
          technical: result.error.technical
        }, output, generateExplanation(originalSource, item, language));
      }
      done();
    };
    worker.onerror = function (event) {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      worker.terminate();
      URL.revokeObjectURL(blobUrl);
      showFailure(card, {
        kind: 'SyntaxError',
        message: event.message || 'The code could not be parsed.',
        line: event.lineno || null,
        suggestion: 'Check whether all brackets, parentheses and quotation marks are correctly closed.',
        technical: event.message || ''
      }, '', generateExplanation(originalSource, item, language));
      done();
    };
    worker.postMessage({ code: code });
  }

  function showSuccess(card, output, explanation) {
    var results = card.querySelector('[data-results]');
    results.hidden = false;
    card.classList.add('has-success');
    var outputPanel = card.querySelector('[data-output-panel]');
    outputPanel.hidden = false;
    card.querySelector('[data-output]').textContent = output || 'Code executed successfully, but it did not produce any console output.';
    showExplanation(card, explanation);
    card.querySelector('[data-action-status]').textContent = 'Code executed successfully.';
  }

  function showFailure(card, error, output, explanation) {
    var results = card.querySelector('[data-results]');
    results.hidden = false;
    card.classList.add('has-error');
    if (output) {
      card.querySelector('[data-output-panel]').hidden = false;
      card.querySelector('[data-output]').textContent = output;
    }
    var panel = card.querySelector('[data-error-panel]');
    panel.hidden = false;
    var title = error.kind + (error.line ? ' on line ' + error.line : '');
    card.querySelector('[data-error]').innerHTML = '<strong>' + escapeHtml(title) + '</strong>' + (error.message ? '<p>' + escapeHtml(error.message) + '</p>' : '') +
      (error.suggestion ? '<p class="array-error-suggestion">' + escapeHtml(error.suggestion) + '</p>' : '');
    if (error.technical) {
      card.querySelector('[data-technical-wrap]').hidden = false;
      card.querySelector('[data-technical]').textContent = error.technical;
    }
    showExplanation(card, explanation);
    card.querySelector('[data-action-status]').textContent = title + ': ' + error.message;
  }

  function showExplanation(card, explanation) {
    var panel = card.querySelector('[data-explanation-panel]');
    panel.hidden = false;
    card.querySelector('[data-explanation]').innerHTML = explanation.map(function (step) { return '<li>' + escapeHtml(step) + '</li>'; }).join('');
  }

  function suggestionFor(message, isTypeScript) {
    var text = String(message || '').toLowerCase();
    if (isTypeScript && /not assignable|argument of type/.test(text)) return 'Check that each value matches the declared array type.';
    if (/map is not a function/.test(text)) return 'The map() method can only be used when the value is an array.';
    if (/cannot read properties of null|cannot read property.*null/.test(text)) return 'The value is null. Check it before reading a property such as length.';
    if (/is not defined/.test(text)) return 'Check the variable name and make sure it is declared before this line.';
    if (/unexpected|unterminated|missing|expected/.test(text)) return 'Check whether all brackets, parentheses and quotation marks are correctly closed.';
    return isTypeScript ? 'Review the declared types and the value used on this line.' : 'Review this line and compare its values with the error message.';
  }

  function generateExplanation(source, item, language) {
    if (source.trim() === item[language].trim()) return item.explanation.slice();
    var steps = [];
    String(source).split('\n').forEach(function (rawLine) {
      var line = rawLine.trim();
      if (!line || line.indexOf('//') === 0 || line === '});' || line === '}' || line === '];') return;
      var explanation = explainLine(line, language);
      if (explanation) steps.push(explanation);
    });
    if (!steps.length) steps.push('This code performs a custom JavaScript operation. Review its values and method calls together with the output.');
    return steps.slice(0, 12);
  }

  function explainLine(line, language) {
    if (/^type\s+\w+\s*=/.test(line)) return 'This TypeScript type describes the properties and value types expected in an object.';
    if (language === 'typescript' && /:\s*(string|number|boolean)(\[\])?/.test(line)) return 'This declaration uses a TypeScript type so incompatible values can be caught before execution.';
    if (/\b(const|let|var)\b/.test(line) && /\[[^\]]*\]/.test(line)) return 'This line declares a variable and gives it an array literal containing its starting values.';
    if (/\b(const|let|var)\b/.test(line)) return 'This line declares a variable and stores the result of the expression on its right.';
    if (/\.push\s*\(/.test(line)) return 'push() adds the supplied value to the end of the array.';
    if (/\.pop\s*\(/.test(line)) return 'pop() removes and returns the final value in the array.';
    if (/\.forEach\s*\(/.test(line)) return 'forEach() runs its callback once for every value in the array.';
    if (/\.map\s*\(/.test(line)) return 'map() runs a callback for each value and creates a new array from the returned results.';
    if (/\.filter\s*\(/.test(line)) return 'filter() creates a new array containing values whose callback condition is true.';
    if (/\.find\s*\(/.test(line)) return 'find() returns the first value whose callback condition is true.';
    if (/\.length\b/.test(line)) return 'length reads the number of values currently in the array.';
    if (/\w+\s*\[[^\]]+\]\s*=/.test(line)) return 'This assignment replaces the array value at the selected index.';
    if (/\w+\s*\[[^\]]+\]/.test(line)) return 'Square brackets access an array value by its zero-based index.';
    if (/=>/.test(line)) return 'This arrow function is a callback; its parameters receive values supplied by the array method.';
    if (/console\.(log|info|warn|error)\s*\(/.test(line)) return 'This console call prints its current value in the Output panel.';
    if (/`[^`]*\$\{/.test(line)) return 'This template literal inserts a value into a string using ${...}.';
    if (/^\w+[\w.]*\s*=/.test(line)) return 'This assignment updates the value on the left using the expression on the right.';
    if (/^(return|if|\{|\[)/.test(line)) return 'This line controls or supplies a value for the current array operation.';
    return 'This line performs a custom JavaScript operation. Review its values and method call together with the output.';
  }

  function destroy() {
    if (activeController) activeController.destroy();
    activeController = null;
  }

  window.TestNovaArraysPlayground = {
    topicId: TOPIC_ID,
    render: render,
    mount: mount,
    destroy: destroy
  };
})();
