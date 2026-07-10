# JavaScript and TypeScript

## JavaScript introduction

Simple explanation:
JavaScript is a versatile programming language used for interactive web applications. It works with HTML and CSS in the browser, and it can also run on servers or local machines through Node.js.

Do this:
1. Create a file named `intro.js`.
2. Add `console.log("JavaScript is running outside the browser")`.
3. Open a terminal in the same folder.
4. Run `node intro.js`.

Observe this:
The message prints in the terminal. This proves JavaScript can run outside the browser through Node.js.

Practice this:
List five website features that need JavaScript, such as form validation, dynamic content, button events, API calls, or search filters.

Expected output:
You can explain where JavaScript runs and why it is useful for web applications.

## Dynamic typing

Simple explanation:
JavaScript is dynamically typed. The data type of a variable is decided at run time, so you do not explicitly declare the type before execution.

Do this:
1. Create variables with a number, string, boolean, undefined, null, object, array, and function.
2. Print each value with `typeof`.
3. Notice that arrays return `object` because of JavaScript history.

Observe this:
The JavaScript engine decides each type while the code runs.

Practice this:
Create one example for each common data type.

Expected output:
You can identify number, string, boolean, undefined, null, object, array, and function examples.

## JavaScript engines and Node.js

Simple explanation:
A JavaScript engine is the program inside the browser that reads, interprets, and executes JavaScript code. Chrome, Edge, Brave, Opera, and Samsung Internet use V8 through Chromium. Firefox uses SpiderMonkey. Safari uses JavaScriptCore, also called Nitro.

Do this:
1. Open Chrome DevTools.
2. Run `console.log("Hello from V8")`.
3. Install Node.js.
4. Run `node -v` and `npm -v`.

Observe this:
The browser runs JavaScript through its engine, and Node.js runs JavaScript on your local machine.

Practice this:
Write one sentence explaining the difference between browser JavaScript and Node.js.

Expected output:
You understand that Node.js is a free, open-source runtime powered by V8 and supported by the npm ecosystem.

## var, let, and const

Simple explanation:
JavaScript has three common declaration keywords. `var` is the old function-scoped way. `let` is modern and block scoped. `const` is block scoped and cannot be reassigned.

Do this:
1. Run a `var` redeclaration example.
2. Run a `let` update example.
3. Try redeclaring a `let` variable in the same block.
4. Try reassigning a `const` variable.

Observe this:
`var` allows redeclaration. `let` allows updating but not redeclaration in the same block. `const` does not allow reassignment.

Practice this:
Use this example:

```js
var name = "Wasim"
var name = "Ansari"
console.log(name) // Ansari

let age = 30
age = 31
// let age = 32 // SyntaxError

const role = "QA"
// role = "Dev" // TypeError
```

Expected output:
You can choose `let` for changing values and `const` for values that should not be reassigned.

## Hoisting

Simple explanation:
Hoisting is JavaScript behavior where declarations are processed before code runs. `var` is hoisted and initialized as `undefined`. Function declarations are fully hoisted. `let` and `const` are hoisted but uninitialized, so reading them early gives a ReferenceError.

Do this:
1. Read a `var` variable before its assignment.
2. Call a function declaration before its definition.
3. Try reading a `let` or `const` variable before its declaration.

Observe this:
`var` gives `undefined`, function declarations work, and `let` or `const` gives a ReferenceError.

Practice this:

```js
console.log(name) // undefined
var name = "Wasim"

function sayHello() {
  console.log("Hello Wasim")
}

sayHello()
```

Expected output:
You can explain why `var` behaves differently from `let` and `const` during hoisting.
